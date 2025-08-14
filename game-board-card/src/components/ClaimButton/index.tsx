import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import CounterUp from "../CounterUp";

interface ClaimButtonProps {
    onClaim: () => void;
    disabled?: boolean;
}

export default function ClaimButton({ onClaim, disabled = false }: ClaimButtonProps) {
    const counter = useGameStore((state) => state.counter);

    return (
        <motion.button
            className={`w-full max-w-md mx-auto bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-8 rounded-2xl text-2xl shadow-lg transition-all duration-200 transform ${
                disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:from-green-600 hover:to-green-700 hover:scale-105'
            }`}
            onClick={onClaim}
            disabled={disabled}
            whileHover={disabled ? {} : { scale: 1.05 }}
            whileTap={disabled ? {} : { scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <motion.span
                animate={counter > 0 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
            >
                Claim {counter > 0 && (
                    <span className="ml-2">
                        (<CounterUp value={counter} className="inline" />)
                    </span>
                )}
            </motion.span>
        </motion.button>
    );
} 