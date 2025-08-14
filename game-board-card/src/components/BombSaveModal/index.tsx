import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import cashImg from '../../assets/cash.png';
import CounterUp from "../CounterUp";

interface BombSaveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveResources: () => void;
    onLoseResources: () => void;
    saveCost: number;
}

export default function BombSaveModal({ 
    isOpen, 
    onClose, 
    onSaveResources, 
    onLoseResources, 
    saveCost 
}: BombSaveModalProps) {
    const counter = useGameStore((state) => state.counter);

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full border border-gray-700 shadow-2xl relative overflow-hidden"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                {/* Фоновий ефект */}
                <motion.div
                    className="absolute inset-0 bg-red-500/10 rounded-3xl"
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Заголовок */}
                <div className="text-center mb-6 relative z-10">
                    <motion.h2
                        className="text-4xl font-bold text-red-400 mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                    >
                        💥 BOOM! 💥
                    </motion.h2>
                    <motion.p
                        className="text-gray-300 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        The bomb exploded! All cards are revealed...
                    </motion.p>
                </div>

                {/* Показ ресурсів */}
                <motion.div
                    className="bg-gray-800/50 rounded-2xl p-6 mb-6 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="text-xl font-bold text-white mb-4 text-center">
                        Your Resources:
                    </h3>
                    <div className="flex items-center justify-center gap-3">
                        <img src={cashImg} alt="Cash" className="w-10 h-10" />
                        <CounterUp 
                            value={counter} 
                            className="text-2xl font-bold text-white"
                        />
                    </div>
                </motion.div>

                {/* Повідомлення */}
                <motion.p
                    className="text-center text-gray-300 mb-8 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Save your resources and continue playing, or lose them all!
                </motion.p>

                {/* Кнопки */}
                <div className="flex flex-col gap-4 relative z-10">
                    <motion.button
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2"
                        onClick={onSaveResources}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-xl">💎</span>
                        Save & Continue ({saveCost} gems)
                    </motion.button>
                    
                    <motion.button
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center gap-2"
                        onClick={onLoseResources}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-xl">🔥</span>
                        Lose Resources
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
} 