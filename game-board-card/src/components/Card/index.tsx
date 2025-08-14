import React, { useRef, useState, useEffect } from "react";
import type { CardData } from "../../types/type.ts";
import { useGameStore, useCashAnimationStore, useSpecialEffectsStore } from "../../store/gameStore.ts";
import { formatCash } from "../../utils/gameUtils.ts";
import { motion } from "framer-motion";

interface CardProps {
    cardData: CardData;
    onFlip?: (cardData: CardData) => void;
    cashCounterRef: React.RefObject<HTMLDivElement | null>;
}

export default function Card({ cardData, onFlip, cashCounterRef }: CardProps) {
    const [flipped, setFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);

    const { addAnimation } = useCashAnimationStore();
    const { triggerX2Effect, triggerBombFieldEffect } = useSpecialEffectsStore();
    const { 
        counter, 
        multiplier, 
        addToCounter, 
        setMultiplier, 
        multiplyCounter, 
        isGameOver, 
        isGameStopped, 
        setGameStopped,
        showStopModalAction,
        allCardsRevealed,
        addFlippedCard,
        updateInventory
    } = useGameStore();

    // Automatically open card if all cards should be revealed
    useEffect(() => {
        if (allCardsRevealed && !flipped) {
            setFlipped(true);
            addFlippedCard(cardData.id);
            updateInventory();
            // Don't trigger card effects when automatically opening
            // processCardEffect(cardData);
            // onFlip?.(cardData);
        }
    }, [allCardsRevealed, flipped, cardData, onFlip, addFlippedCard, updateInventory]);

    // Preserve card flip state when allCardsRevealed changes
    useEffect(() => {
        if (!allCardsRevealed && flipped) {
            // If allCardsRevealed became false, but the card was open,
            // then leave it open (don't reset flipped)
        }
    }, [allCardsRevealed, flipped]);

    const processCardEffect = (card: CardData) => {
        if (card.cash && card.cash !== 0) {
            const finalValue = card.cash * multiplier;
            // Add delay for counter update so animation completes first
            setTimeout(() => {
                addToCounter(finalValue);
            }, 800); // Delay matches animation duration
        } else if (card.x2) {
            triggerX2Effect();
            setTimeout(() => {
                if (counter > 0) multiplyCounter(2);
                else setMultiplier(multiplier * 2);
            }, 1500);
        } else if (card.stop) {
            setTimeout(() => {
                setGameStopped(true); // Set game stopped state
                showStopModalAction();
            }, 1000);
        } else if (card.bomb) {
            // Trigger field explosion effect
            triggerBombFieldEffect();
            setTimeout(() => {
                // Show save resources modal immediately
                useGameStore.setState({
                    showBombSaveModal: true
                });
            }, 1000);
        }
    };

    const handleClick = () => {
        if (!flipped && !isGameOver && !isGameStopped) {
            setFlipped(true);
            addFlippedCard(cardData.id);
            updateInventory();
            
            // Start animation only for cash cards
            if (cardData.cash && cardData.cash !== 0 && cardRef.current && cashCounterRef.current) {
                const startRect = cardRef.current.getBoundingClientRect();
                const endRect = cashCounterRef.current.getBoundingClientRect();

                // Use fixed coordinates for testing
                const startPos = { 
                    x: startRect.left + startRect.width / 2, 
                    y: startRect.top + startRect.height / 2 
                };
                const endPos = { 
                    x: endRect.left + endRect.width / 2, 
                    y: endRect.top + endRect.height / 2 
                };

                addAnimation(startPos, endPos, cardData.src);
            }
            
            processCardEffect(cardData);
            onFlip?.(cardData);
        }
    };

    return (
        <motion.div
            ref={cardRef}
            className="relative w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] overflow-hidden rounded-[12px] cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={handleClick}
            whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div
                className="relative w-full h-full transition-transform duration-700 ease-in-out"
                style={{
                    transformStyle: "preserve-3d",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 flex items-center justify-center rounded-[12px]"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                        boxShadow:
                            "0 1px 0 0 rgba(255,255,255,0.25) inset, 0 4px 8px 0 rgba(24,26,32,0.40)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    <span
                        className="text-[2rem] sm:text-[2.5rem] font-extrabold leading-[2rem] sm:leading-[2.5rem] text-white/50"
                        style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
                    >
                        $
                    </span>
                </div>
                
                {/* Back */}
                <div 
                    className="absolute inset-0 flex items-center justify-center rounded-[12px]"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                        boxShadow:
                            "0 1px 0 0 rgba(255,255,255,0.25) inset, 0 4px 8px 0 rgba(24,26,32,0.40)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    {cardData.cash ? (
                        <div className="flex flex-col items-center justify-center gap-1 relative">
                            <img src={cardData.src} alt="Cash" className="w-full h-full object-none" />
                            <span
                                className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-[12px] sm:text-[16px] font-bold text-white/90"
                            >
                                {formatCash(cardData.cash)}
                            </span>
                        </div>
                    ) : (
                        <img 
                            src={cardData.src} 
                            alt={cardData.x2 ? "X2" : cardData.stop ? "Stop" : cardData.bomb ? "Bomb" : "Special"}
                            className="w-full h-full object-none"
                        />
                    )}
                </div>
            </div>
        </motion.div>
    );
}
