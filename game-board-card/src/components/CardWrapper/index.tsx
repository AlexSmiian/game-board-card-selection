import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { CardData } from "../../types/type.ts";
import { cardData } from "../../store/data-card.ts";
import { shuffleArray } from "../../utils/shuffleArray.ts";
import Card from "../Card";
import { useGameStore } from "../../store/gameStore";
import { cashCounterRef } from "../CashCounter";

export default function CardWrapper() {
    const [shuffledCards, setShuffledCards] = useState<CardData[]>([]);
    const { newGame, allCardsRevealed } = useGameStore();

    useEffect(() => {
        const shuffled = shuffleArray(cardData);
        setShuffledCards(shuffled);
    }, []);

    const handleCardFlip = () => {
        // setFlippedCards(prev => new Set(prev).add(cardData.id)); // This line is removed
    };

    const handleNewGame = () => {
        const shuffled = shuffleArray(cardData);
        setShuffledCards(shuffled);
        // setFlippedCards(new Set()); // This line is removed
        newGame();
    };

    return (
        <div className="flex flex-col items-center">
            <motion.div 
                className="grid grid-cols-3 grid-rows-3 gap-2 sm:gap-4 w-full mt-6 sm:mt-10 max-w-[280px] sm:max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {shuffledCards.map((card, index) => (
                    <Card
                        key={`${card.id}-${index}`}
                        cardData={card}
                        onFlip={handleCardFlip}
                        cashCounterRef={cashCounterRef}
                    />
                ))}
            </motion.div>
            
            {allCardsRevealed && (
                <motion.button
                    onClick={handleNewGame}
                    className="mt-4 sm:mt-6 md:mt-8 px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    New Game
                </motion.button>
            )}
        </div>
    );
}
