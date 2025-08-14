import { motion } from "framer-motion";
import { formatCash } from "../../utils/gameUtils";
import { useGameStore } from "../../store/gameStore";
import cashImg from '../../assets/cash.png';
import CounterUp from "../CounterUp";

interface StopModalProps {
    isOpen: boolean;
    onClose: () => void;
    onClaim: () => void;
}

export default function StopModal({ isOpen, onClose, onClaim }: StopModalProps) {
    const counter = useGameStore((state) => state.counter);

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full border border-gray-700 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                {/* Заголовок */}
                <div className="text-center mb-6">
                    <motion.h2
                        className="text-4xl font-bold text-white mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                    >
                        Game over!
                    </motion.h2>
                    <motion.p
                        className="text-gray-300 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        You've reached the end of this run...
                    </motion.p>
                </div>

                {/* STOP знак */}
                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, type: "spring" }}
                >
                    <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                        <span className="text-4xl font-bold text-white">STOP</span>
                    </div>
                </motion.div>

                {/* Винагорода */}
                <motion.div
                    className="flex items-center justify-center gap-3 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <img src={cashImg} alt="Cash" className="w-12 h-12" />
                    <CounterUp 
                        value={counter} 
                        className="text-3xl font-bold text-white"
                    />
                </motion.div>

                {/* Інструкція */}
                <motion.p
                    className="text-center text-gray-400 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    ...claim and return to the main board
                </motion.p>

                {/* Кнопка Claim */}
                <motion.button
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-2xl text-xl shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
                    onClick={onClaim}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Claim
                </motion.button>
            </motion.div>
        </motion.div>
    );
} 