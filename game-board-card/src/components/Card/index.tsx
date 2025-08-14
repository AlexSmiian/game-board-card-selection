import React, { useRef, useState } from "react";
import type { CardData } from "../../types/type.ts";
import { useGameStore, useCashAnimationStore } from "../../store/gameStore.ts";
import { formatCash } from "../../utils/gameUtils.ts";

interface CardProps {
    cardData: CardData;
    onFlip?: (cardData: CardData) => void;
    cashCounterRef: React.RefObject<HTMLDivElement | null>;
}

export default function Card({ cardData, onFlip, cashCounterRef }: CardProps) {
    const [flipped, setFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);

    const { addAnimation } = useCashAnimationStore();
    const { counter, multiplier, addToCounter, setMultiplier, multiplyCounter, isGameOver, isGameStopped, setGameStopped } = useGameStore();

    const processCardEffect = (card: CardData) => {
        if (card.cash && card.cash !== 0) {
            const finalValue = card.cash * multiplier;
            // Додаємо затримку для оновлення лічильника, щоб анімація завершилася спочатку
            setTimeout(() => {
                addToCounter(finalValue);
            }, 800); // Затримка відповідає тривалості анімації
        } else if (card.x2) {
            if (counter > 0) multiplyCounter(2);
            else setMultiplier(multiplier * 2);
        } else if (card.stop) {
            setGameStopped(true);
        }
        // else if (card.bomb) { setGameOver(true); }
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
        <div
            ref={cardRef}
            className="relative w-[110px] h-[110px] overflow-hidden rounded-[12px]"
            style={{ perspective: "1000px" }}
            onClick={handleClick}
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
                            "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)",
                        boxShadow:
                            "0 1px 0 0 rgba(255,255,255,0.20) inset, 0 4px 8px 0 rgba(24,26,32,0.30)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <span
                        className="text-[2.5rem] font-extrabold leading-[2.5rem] text-white/40"
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
                            "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)",
                        boxShadow:
                            "0 1px 0 0 rgba(255,255,255,0.20) inset, 0 4px 8px 0 rgba(24,26,32,0.30)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    {cardData.cash ? (
                        <div className="flex flex-col items-center justify-center gap-1 relative">
                            <img src={cardData.src} alt="Cash" className="w-full h-full object-none" />
                            <span
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[16px] font-bold text-white/80"
                            >
                                {formatCash(cardData.cash)}
                            </span>
                        </div>
                    ) : (
                        <img
                            src={cardData.src}
                            alt={cardData.x2 ? "X2" : cardData.stop ? "Stop" : "Special"}
                            className="w-full h-full object-none"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
