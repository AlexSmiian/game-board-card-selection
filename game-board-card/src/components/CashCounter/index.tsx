import { formatCash } from "../../utils/gameUtils.ts";
import { useGameStore } from "../../store/gameStore.ts";
import { useEffect,useState, useRef } from "react";
import { motion } from "framer-motion";
import cashImg from '../../assets/cash.png';
export const cashCounterRef = { current: null as HTMLDivElement | null };

const CashCounter = () => {
    const counter = useGameStore((state) => state.counter);
    const [isAnimating, setIsAnimating] = useState(false);
    const internalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        cashCounterRef.current = internalRef.current;
    }, []);

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
                transition: { duration: 0.3, ease: "easeInOut" }
            } : {}}
        >
            <img src={cashImg} width={40} height={40} alt="Cash" />
            <span>{formatCash(counter)}</span>
        </motion.div>
    );
};

export default CashCounter;
