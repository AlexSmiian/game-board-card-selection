import { motion } from "framer-motion";
import logoImg from "../../assets/logo.svg";

export default function Logo() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 sm:mb-8 md:mb-10"
        >
            <img 
                src={logoImg} 
                alt="Logo" 
                className="w-[80px] h-[40px] sm:w-[100px] sm:h-[50px]"
            />
        </motion.div>
    );
}