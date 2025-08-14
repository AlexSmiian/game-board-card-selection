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
        showBombModalAction,
        allCardsRevealed
    } = useGameStore();

    // Автоматично відкриваємо картку, якщо всі картки повинні бути відкриті
    useEffect(() => {
        if (allCardsRevealed && !flipped) {
            setFlipped(true);
            // При автоматичному відкритті не запускаємо ефекти карток
            // processCardEffect(cardData);
            // onFlip?.(cardData);
        }
    }, [allCardsRevealed, flipped, cardData, onFlip]);

    // Зберігаємо стан відкриття картки при зміні allCardsRevealed
    useEffect(() => {
        if (!allCardsRevealed && flipped) {
            // Якщо allCardsRevealed стало false, але картка була відкрита,
            // то залишаємо її відкритою (не скидаємо flipped)
        }
    }, [allCardsRevealed, flipped]);

    const processCardEffect = (card: CardData) => {
        if (card.cash && card.cash !== 0) {
            const finalValue = card.cash * multiplier;
            // Додаємо затримку для оновлення лічильника, щоб анімація завершилася спочатку
            setTimeout(() => {
                addToCounter(finalValue);
            }, 800); // Затримка відповідає тривалості анімації
        } else if (card.x2) {
            triggerX2Effect();
            setTimeout(() => {
                if (counter > 0) multiplyCounter(2);
                else setMultiplier(multiplier * 2);
            }, 1500);
        } else if (card.stop) {
            setTimeout(() => {
                setGameStopped(true); // Встановлюємо стан зупинки гри
                showStopModalAction();
            }, 1000);
        } else if (card.bomb) {
            // Запускаємо ефект вибуху на всьому полі
            triggerBombFieldEffect();
            setTimeout(() => {
                // Показуємо модалку збереження ресурсів одразу
                useGameStore.setState({
                    showBombSaveModal: true
                });
            }, 1000);
        }
    };

    const handleClick = () => {
        if (!flipped && !isGameOver && !isGameStopped) {
            setFlipped(true);
            
            // Запускаємо анімацію тільки для карток з грошима
            if (cardData.cash && cardData.cash !== 0 && cardRef.current && cashCounterRef.current) {
                const startRect = cardRef.current.getBoundingClientRect();
                const endRect = cashCounterRef.current.getBoundingClientRect();

                // Використовуємо фіксовані координати для тестування
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
            className="relative w-[110px] h-[110px] overflow-hidden rounded-[12px] cursor-pointer"
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
                        className="text-[2.5rem] font-extrabold leading-[2.5rem] text-white/50"
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
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[16px] font-bold text-white/90"
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
