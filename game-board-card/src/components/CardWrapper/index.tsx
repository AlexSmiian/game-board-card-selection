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
        </div>
    );
}
