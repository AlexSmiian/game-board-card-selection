import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BombEffectProps {
    isActive: boolean;
    onComplete: () => void;
}

export default function BombEffect({ isActive, onComplete }: BombEffectProps) {
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
            {/* Explosive effect */}
            <motion.div
                className="absolute inset-0 bg-red-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2 }}
            />
            
            {/* Central explosion */}
            <motion.div
                className="relative"
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
                <div className="w-32 h-32 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-6xl">💥</span>
                </div>
            </motion.div>

            {/* Explosion particles */}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-yellow-400 rounded-full"
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
                        scale: [1, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        delay: 0.2,
                        ease: "easeOut"
                    }}
                />
            ))}

            <motion.div
                className="absolute text-8xl font-bold text-red-500"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                    scale: [0, 1.5, 1],
                    opacity: [0, 1, 0]
                }}
                transition={{ 
                    duration: 2,
                    delay: 0.3
                }}
            >
                BOOM!
            </motion.div>
        </div>
    );
} 