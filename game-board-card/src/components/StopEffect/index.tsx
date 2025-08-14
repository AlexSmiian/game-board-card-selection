import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StopEffectProps {
    isActive: boolean;
    onComplete: () => void;
}

export default function StopEffect({ isActive, onComplete }: StopEffectProps) {
    const [showEffect, setShowEffect] = useState(false);

    useEffect(() => {
        if (isActive) {
            setShowEffect(true);
            const timer = setTimeout(() => {
                setShowEffect(false);
                onComplete();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isActive, onComplete]);

    if (!showEffect) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[1000] flex items-center justify-center">
            {/* Фоновий ефект */}
            <motion.div
                className="absolute inset-0 bg-red-500/15"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2 }}
            />
            
            {/* Центральний символ STOP */}
            <motion.div
                className="relative"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                    scale: [0, 1.5, 1],
                    opacity: [0, 1, 0]
                }}
                transition={{ 
                    duration: 2,
                    ease: "easeOut"
                }}
            >
                <div className="w-48 h-48 bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center shadow-2xl border-8 border-white">
                    <span className="text-6xl font-bold text-white">STOP</span>
                </div>
            </motion.div>

            {/* Пульсуючі кільця */}
            {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                    key={`ring-${i}`}
                    className="absolute w-48 h-48 border-4 border-red-400 rounded-full"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ 
                        scale: [0, 2.5],
                        opacity: [1, 0]
                    }}
                    transition={{
                        duration: 2,
                        delay: i * 0.3,
                        ease: "easeOut"
                    }}
                />
            ))}

            {/* Летючі символи STOP */}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-2xl font-bold text-red-400"
                    initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1
                    }}
                    animate={{
                        x: Math.cos((i * 45) * Math.PI / 180) * 200,
                        y: Math.sin((i * 45) * Math.PI / 180) * 200,
                        opacity: [1, 0],
                        scale: [1, 0.3]
                    }}
                    transition={{
                        duration: 1.8,
                        delay: 0.1 * i,
                        ease: "easeOut"
                    }}
                >
                    STOP
                </motion.div>
            ))}

            {/* Текст "ГРА ЗУПИНЕНА!" */}
            <motion.div
                className="absolute bottom-20 text-5xl font-bold text-red-400"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                    scale: [0, 1.3, 1],
                    opacity: [0, 1, 0]
                }}
                transition={{ 
                    duration: 2,
                    delay: 0.8
                }}
            >
                STOP GAME!
            </motion.div>

            {/* Додаткові ефекти зупинки */}
            <motion.div
                className="absolute top-10 left-10 text-3xl"
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ 
                    opacity: [0, 1, 0],
                    rotate: [-10, 0, 10]
                }}
                transition={{ 
                    duration: 2,
                    delay: 0.5
                }}
            >
                ⛔
            </motion.div>

            <motion.div
                className="absolute top-10 right-10 text-3xl"
                initial={{ opacity: 0, rotate: 10 }}
                animate={{ 
                    opacity: [0, 1, 0],
                    rotate: [10, 0, -10]
                }}
                transition={{ 
                    duration: 2,
                    delay: 0.7
                }}
            >
                🚫
            </motion.div>
        </div>
    );
} 