import { formatCash } from "../../utils/gameUtils.ts";
import { useGameStore } from "../../store/gameStore.ts";
import { useEffect, forwardRef, useState, useRef } from "react";
import { motion } from "framer-motion";

export const cashCounterRef = { current: null as HTMLDivElement | null };

const CashCounter = forwardRef<HTMLDivElement>((_, ref) => {
    const counter = useGameStore((state) => state.counter);
    const [isAnimating, setIsAnimating] = useState(false);
    const internalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Встановлюємо глобальний ref
        cashCounterRef.current = internalRef.current;
    }, []);

    // Анімація при зміні лічильника
    useEffect(() => {
        if (counter > 0) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [counter]);

    return (
        <motion.div
            ref={internalRef}
            className="flex flex-row items-center justify-center gap-1 text-[32px] text-white font-bold mt-8"
            animate={isAnimating ? {
                scale: [1, 1.1, 1],
                transition: {
                    duration: 0.3,
                    ease: "easeInOut"
                }
            } : {}}
        >
            <img src="/cash.png" width={40} height={40} alt="Cash" />
            <span>{formatCash(counter)}</span>
        </motion.div>
    );
});

export default CashCounter;
