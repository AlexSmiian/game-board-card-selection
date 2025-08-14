import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BombFieldEffectProps {
    isActive: boolean;
    onComplete: () => void;
}

export default function BombFieldEffect({ isActive, onComplete }: BombFieldEffectProps) {
    const [showEffect, setShowEffect] = useState(false);

    useEffect(() => {
        if (isActive) {
            setShowEffect(true);
            const timer = setTimeout(() => {
                setShowEffect(false);
                onComplete();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isActive, onComplete]);

    if (!showEffect) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[1500]">
            {/* Фоновий ефект вибуху */}
            <motion.div
                className="absolute inset-0 bg-red-500/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3 }}
            />

            {/* Хвилі вибуху */}
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={`wave-${i}`}
                    className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full"
                    style={{
                        transform: 'translate(-50%, -50%)'
                    }}
                    initial={{
                        scale: 0,
                        opacity: 1
                    }}
                    animate={{
                        scale: [0, 50],
                        opacity: [1, 0]
                    }}
                    transition={{
                        duration: 2,
                        delay: i * 0.3,
                        ease: "easeOut"
                    }}
                />
            ))}

            {/* Частинки вибуху по всьому полю */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    initial={{
                        x: '50vw',
                        y: '50vh',
                        opacity: 1,
                        scale: 1
                    }}
                    animate={{
                        x: `${Math.random() * 100}vw`,
                        y: `${Math.random() * 100}vh`,
                        opacity: [1, 0],
                        scale: [1, 0]
                    }}
                    transition={{
                        duration: 2.5,
                        delay: Math.random() * 0.5,
                        ease: "easeOut"
                    }}
                />
            ))}

            {/* Центральний вибух */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-32 h-32"
                style={{
                    transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                    scale: [0, 3, 0],
                    opacity: [0, 1, 0]
                }}
                transition={{ 
                    duration: 2,
                    ease: "easeOut"
                }}
            >
                <div className="w-full h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-6xl">💥</span>
                </div>
            </motion.div>

            {/* Текст "BOOM!" */}
            <motion.div
                className="absolute top-1/2 left-1/2 text-8xl font-bold text-red-500"
                style={{
                    transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                    scale: [0, 1.5, 1],
                    opacity: [0, 1, 0]
                }}
                transition={{ 
                    duration: 2.5,
                    delay: 0.5
                }}
            >
                BOOM!
            </motion.div>

            {/* Додаткові ефекти */}
            <motion.div
                className="absolute top-10 left-10 text-4xl"
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ 
                    opacity: [0, 1, 0],
                    rotate: [-10, 0, 10]
                }}
                transition={{ 
                    duration: 2,
                    delay: 1
                }}
            >
                💥
            </motion.div>

            <motion.div
                className="absolute top-10 right-10 text-4xl"
                initial={{ opacity: 0, rotate: 10 }}
                animate={{ 
                    opacity: [0, 1, 0],
                    rotate: [10, 0, -10]
                }}
                transition={{ 
                    duration: 2,
                    delay: 1.2
                }}
            >
                💥
            </motion.div>

            <motion.div
                className="absolute bottom-10 left-10 text-4xl"
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ 
                    opacity: [0, 1, 0],
                    rotate: [-10, 0, 10]
                }}
                transition={{ 
                    duration: 2,
                    delay: 1.4
                }}
            >
                💥
            </motion.div>

            <motion.div
                className="absolute bottom-10 right-10 text-4xl"
                initial={{ opacity: 0, rotate: 10 }}
                animate={{ 
                    opacity: [0, 1, 0],
                    rotate: [10, 0, -10]
                }}
                transition={{ 
                    duration: 2,
                    delay: 1.6
                }}
            >
                💥
            </motion.div>
        </div>
    );
} 