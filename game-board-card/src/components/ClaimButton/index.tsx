import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import cashImg from "../../assets/cash.png";

interface ClaimButtonProps {
    disabled?: boolean;
    onOpenModal: () => void;
}

export default function ClaimButton({ disabled = false, onOpenModal }: ClaimButtonProps) {
    const counter = useGameStore((state) => state.counter);

    const formatCash = (value: number) => {
        return value.toLocaleString();
    };

    return (
        <motion.div
            className="mt-4 sm:mt-6 md:mt-8 w-full max-w-md mx-auto px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <motion.button
                onClick={onOpenModal}
                disabled={disabled}
                className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-2xl text-lg sm:text-xl font-bold shadow-lg transition-all duration-200 transform ${
                    disabled
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105'
                }`}
                whileHover={!disabled ? { scale: 1.05 } : {}}
                whileTap={!disabled ? { scale: 0.95 } : {}}
            >
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <img src={cashImg} alt="Cash" className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Claim</span>
                    <span className="text-sm sm:text-base">
                        ({formatCash(counter)})
                    </span>
                </div>
            </motion.button>
        </motion.div>
    );
} 