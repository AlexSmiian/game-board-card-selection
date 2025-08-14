import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import cashImg from '../../assets/cash.png';
import x2Img from '../../assets/x2.png';
import zeroImg from '../../assets/zero.png';
import bombImg from '../../assets/bomb.png';
import stopImg from '../../assets/stop.png';
import CounterUp from "../CounterUp";

interface ClaimModalProps {
    isOpen: boolean;
    onClose: () => void;
    onClaim: () => void;
}

export default function ClaimModal({ isOpen, onClose, onClaim }: ClaimModalProps) {
    const { counter, inventory } = useGameStore();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[2000] flex items-center justify-center p-2 sm:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md w-full border border-gray-700 shadow-2xl relative overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    {/* Анімований фон */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl"
                        animate={{ 
                            background: [
                                "linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
                                "linear-gradient(45deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)"
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    />

                    <div className="text-center mb-4 sm:mb-6 relative z-10">
                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            🎉 Your Collection! 🎉
                        </motion.h2>
                        <motion.p
                            className="text-gray-300 text-base sm:text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Here's what you've discovered:
                        </motion.p>
                    </div>

                    {/* Загальна сума */}
                    <motion.div
                        className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 relative z-10 border border-green-500/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 text-center">
                            Total Earnings:
                        </h3>
                        <div className="flex items-center justify-center gap-3">
                            <img src={cashImg} alt="Cash" className="w-8 h-8 sm:w-10 sm:h-10" />
                            <CounterUp
                                value={counter}
                                className="text-2xl sm:text-3xl font-bold text-green-400"
                            />
                        </div>
                    </motion.div>

                    {/* Детальний інвентар */}
                    <motion.div
                        className="bg-gray-800/50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-4 text-center">
                            Your Collection:
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                            {/* Cash */}
                            <motion.div 
                                className="flex flex-col items-center gap-2 p-3 bg-green-500/20 rounded-xl border border-green-500/30"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 1.0, type: "spring" }}
                            >
                                <img src={cashImg} alt="Cash" className="w-6 h-6 sm:w-8 sm:h-8" />
                                <span className="text-white font-bold text-sm sm:text-base">{inventory.cash}</span>
                                <span className="text-green-400 text-xs">Cash</span>
                            </motion.div>

                            {/* X2 */}
                            <motion.div 
                                className="flex flex-col items-center gap-2 p-3 bg-blue-500/20 rounded-xl border border-blue-500/30"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 1.1, type: "spring" }}
                            >
                                <img src={x2Img} alt="X2" className="w-6 h-6 sm:w-8 sm:h-8" />
                                <span className="text-white font-bold text-sm sm:text-base">{inventory.x2}</span>
                                <span className="text-blue-400 text-xs">Multiplier</span>
                            </motion.div>

                            {/* Zero */}
                            <motion.div 
                                className="flex flex-col items-center gap-2 p-3 bg-yellow-500/20 rounded-xl border border-yellow-500/30"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 1.2, type: "spring" }}
                            >
                                <img src={zeroImg} alt="Zero" className="w-6 h-6 sm:w-8 sm:h-8" />
                                <span className="text-yellow-400 text-xs">Zero</span>
                                <span className="text-white font-bold text-sm sm:text-base">{inventory.zero}</span>
                            </motion.div>

                            {/* Bomb */}
                            <motion.div 
                                className="flex flex-col items-center gap-2 p-3 bg-red-500/20 rounded-xl border border-red-500/30"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 1.3, type: "spring" }}
                            >
                                <img src={bombImg} alt="Bomb" className="w-6 h-6 sm:w-8 sm:h-8" />
                                <span className="text-red-400 text-xs">Bomb</span>
                                <span className="text-white font-bold text-sm sm:text-base">{inventory.bomb}</span>
                            </motion.div>

                            {/* Stop */}
                            <motion.div 
                                className="flex flex-col items-center gap-2 p-3 bg-orange-500/20 rounded-xl border border-orange-500/30"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 1.4, type: "spring" }}
                            >
                                <img src={stopImg} alt="Stop" className="w-6 h-6 sm:w-8 sm:h-8" />
                                <span className="text-orange-400 text-xs">Stop</span>
                                <span className="text-white font-bold text-sm sm:text-base">{inventory.stop}</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Кнопки */}
                    <div className="flex flex-col gap-3 relative z-10">
                        <motion.button
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl text-lg sm:text-xl shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
                            onClick={onClaim}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🎯 Claim Rewards
                        </motion.button>

                        <motion.button
                            className="w-full bg-gray-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl text-base sm:text-lg shadow-lg hover:bg-gray-700 transition-all duration-200"
                            onClick={onClose}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Close
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
} 