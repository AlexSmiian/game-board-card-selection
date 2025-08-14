import { motion } from "framer-motion";
import { formatCash } from "../../utils/gameUtils";
import { useGameStore } from "../../store/gameStore";
import cashImg from '../../assets/cash.png';
import bombImg from '../../assets/bomb.png';
import CounterUp from "../CounterUp";

interface BombModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTakeHit: () => void;
    onDefuse: () => void;
    defuseCost: number;
}

export default function BombModal({ isOpen, onClose, onTakeHit, onDefuse, defuseCost }: BombModalProps) {
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
                className="bg-gradient-to-b from-purple-900 to-purple-800 rounded-3xl p-8 max-w-md w-full border border-purple-700 shadow-2xl relative overflow-hidden"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                {/* Червоний фоновий ефект */}
                <motion.div
                    className="absolute inset-0 bg-red-500/20 rounded-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                />

                {/* Заголовок */}
                <div className="text-center mb-6 relative z-10">
                    <motion.h2
                        className="text-4xl font-bold text-pink-400 mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                    >
                        Danger ahead!
                    </motion.h2>
                    <motion.p
                        className="text-green-300 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        You're on a Bomb Square! You hit a bomb and lose all rewards from this field...
                    </motion.p>
                </div>

                {/* Бомба */}
                <motion.div
                    className="flex justify-center mb-6 relative z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, type: "spring" }}
                >
                    <div className="relative">
                        <motion.div
                            className="absolute inset-0 bg-red-500 rounded-full blur-xl"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <img src={bombImg} alt="Bomb" className="w-24 h-24 relative z-10" />
                    </div>
                </motion.div>

                {/* Втрата грошей */}
                <motion.div
                    className="flex items-center justify-center gap-3 mb-6 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <img src={cashImg} alt="Cash" className="w-10 h-10" />
                    <CounterUp 
                        value={counter} 
                        className="text-2xl font-bold text-white"
                    />
                </motion.div>

                {/* Інструкція */}
                <motion.p
                    className="text-center text-gray-300 mb-8 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    ...or defuse it and save your run!
                </motion.p>

                {/* Кнопки */}
                <div className="flex gap-4 relative z-10">
                    <motion.button
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center gap-2"
                        onClick={onTakeHit}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-xl">💣</span>
                        Take a hit
                    </motion.button>
                    
                    <motion.button
                        className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
                        onClick={onDefuse}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Defuse for {defuseCost}
                        <span className="text-xl">💎</span>
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
} 