import { useState, useEffect } from "react";
import type { CardData } from "../../types/type.ts";
import { cardData } from "../../store/data-card.ts";
import { shuffleArray } from "../../utils/shuffleArray.ts";
import Card from "../Card";
import { cashCounterRef } from "../CashCounter";

export default function CardWrapper() {
    const [shuffledCards, setShuffledCards] = useState<CardData[]>([]);
    const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

    useEffect(() => {
        const shuffled = shuffleArray(cardData);
        setShuffledCards(shuffled);
    }, []);

    const handleCardFlip = (cardData: CardData) => {
        setFlippedCards(prev => new Set(prev).add(cardData.id));
    };

    const resetGame = () => {
        const shuffled = shuffleArray(cardData);
        setShuffledCards(shuffled);
        setFlippedCards(new Set());
    };

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full mt-10 max-w-md">
                {shuffledCards.map((card, index) => (
                    <Card
                        key={`${card.id}-${index}`}
                        cardData={card}
                        onFlip={handleCardFlip}
                        cashCounterRef={cashCounterRef}
                    />
                ))}
            </div>
            <button
                onClick={resetGame}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                New Game
            </button>

            <div className="mt-4 text-sm text-white/60">
                Cards flipped: {flippedCards.size}/9
            </div>
        </div>
    );
}
