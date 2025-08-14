import { motion } from "framer-motion";

export default function H1() {
    return (
        <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center text-white font-bold text-[18px] sm:text-[20px] md:text-[24px] mb-4 sm:mb-6 md:mb-8"
        >
            <span className="w-[60px] sm:w-[80px] md:w-[100px] h-px bg-white/50"></span>
            <span className="px-2 sm:px-3">Roll Craft</span>
            <span className="w-[60px] sm:w-[80px] md:w-[100px] h-px bg-white/50"></span>
        </motion.h1>
    );
}

