import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface X2EffectProps {
    isActive: boolean;
    onComplete: () => void;
}

export default function X2Effect({ isActive, onComplete }: X2EffectProps) {
    const [showEffect, setShowEffect] = useState(false);

    useEffect(() => {
        if (isActive) {
            setShowEffect(true);
            const timer = setTimeout(() => {
                setShowEffect(false);
                onComplete();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isActive, onComplete]);

    if (!showEffect) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[1000] flex items-center justify-center">
            {/* Фоновий ефект */}
            <motion.div
                className="absolute inset-0 bg-blue-500/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5 }}
            />
            
            {/* Центральний символ X2 */}
            <motion.div
                className="relative"
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ 
                    scale: [0, 2, 1],
                    opacity: [0, 1, 0],
                    rotate: [-180, 0, 360]
                }}
                transition={{ 
                    duration: 1.5,
                    ease: "easeOut"
                }}
            >
                <div className="w-40 h-40 bg-gradient-to-r from-blue-400 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-8xl font-bold text-white">×2</span>
                </div>
            </motion.div>

            {/* Летючі символи множення */}
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-4xl font-bold text-blue-400"
                    initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1
                    }}
                    animate={{
                        x: Math.cos((i * 60) * Math.PI / 180) * 150,
                        y: Math.sin((i * 60) * Math.PI / 180) * 150,
                        opacity: [1, 0],
                        scale: [1, 0.5]
                    }}
                    transition={{
                        duration: 1.2,
                        delay: 0.1 * i,
                        ease: "easeOut"
                    }}
                >
                    ×2
                </motion.div>
            ))}

            {/* Пульсуючі кільця */}
            {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                    key={`ring-${i}`}
                    className="absolute w-40 h-40 border-4 border-blue-400 rounded-full"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ 
                        scale: [0, 3],
                        opacity: [1, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        ease: "easeOut"
                    }}
                />
            ))}

            {/* Текст "МНОЖЕННЯ!" */}
            <motion.div
                className="absolute bottom-20 text-4xl font-bold text-blue-400"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                    scale: [0, 1.2, 1],
                    opacity: [0, 1, 0]
                }}
                transition={{ 
                    duration: 1.5,
                    delay: 0.5
                }}
            >
                МНОЖЕННЯ!
            </motion.div>
        </div>
    );
} 