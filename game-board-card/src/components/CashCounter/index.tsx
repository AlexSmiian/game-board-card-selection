import { useGameStore } from "../../store/gameStore.ts";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import CounterUp from "../CounterUp";
import cashImg from '../../assets/cash.png';

export const cashCounterRef = { current: null as HTMLDivElement | null };

const CashCounter = () => {
    const counter = useGameStore((state) => state.counter);
    const [isAnimating, setIsAnimating] = useState(false);
    const [prevCounter, setPrevCounter] = useState(0);
    const internalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Set global ref
        cashCounterRef.current = internalRef.current;
    }, []);

    // Animation when counter changes
    useEffect(() => {
        if (counter > prevCounter) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
        setPrevCounter(counter);
    }, [counter, prevCounter]);

    return (
        <motion.div
            ref={internalRef}
            className="flex flex-row items-center justify-center gap-1 text-[24px] sm:text-[28px] md:text-[32px] text-white font-bold mt-6 sm:mt-8"
            animate={isAnimating ? {
                scale: [1, 1.1, 1],
                transition: {
                    duration: 0.3,
                    ease: "easeInOut"
                }
            } : {}}
        >
            <img src={cashImg} className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px]" alt="Cash" />
            <CounterUp 
                value={counter} 
                className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-white"
            />
        </motion.div>
    );
};

export default CashCounter;
