import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import cashImg from '../../assets/cash.png';
import x2Img from '../../assets/x2.png';
import zeroImg from '../../assets/zero.png';
import bombImg from '../../assets/bomb.png';
import stopImg from '../../assets/stop.png';

export default function Inventory() {
    const { inventory } = useGameStore();

    return (
        <motion.div 
            className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 my-4 sm:my-6 p-3 sm:p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50 w-full max-w-4xl mx-2 sm:mx-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            {/* Cash */}
            <motion.div 
                className="flex items-center gap-1 sm:gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
            >
                <img src={cashImg} alt="Cash" className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-white font-bold text-sm sm:text-base md:text-lg">{inventory.cash}</span>
            </motion.div>

            {/* X2 */}
            <motion.div 
                className="flex items-center gap-1 sm:gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
            >
                <img src={x2Img} alt="X2" className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-white font-bold text-sm sm:text-base md:text-lg">{inventory.x2}</span>
            </motion.div>

            {/* Zero */}
            <motion.div 
                className="flex items-center gap-1 sm:gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
            >
                <img src={zeroImg} alt="Zero" className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-white font-bold text-sm sm:text-base md:text-lg">{inventory.zero}</span>
            </motion.div>

            {/* Bomb */}
            <motion.div 
                className="flex items-center gap-1 sm:gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
            >
                <img src={bombImg} alt="Bomb" className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-white font-bold text-sm sm:text-base md:text-lg">{inventory.bomb}</span>
            </motion.div>

            {/* Stop */}
            <motion.div 
                className="flex items-center gap-1 sm:gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
            >
                <img src={stopImg} alt="Stop" className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-white font-bold text-sm sm:text-base md:text-lg">{inventory.stop}</span>
            </motion.div>
        </motion.div>
    );
} 