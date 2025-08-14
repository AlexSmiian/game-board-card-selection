import {useCashAnimationStore} from "../../store/gameStore.ts";
import { motion } from "framer-motion";

export default function CashAnimationLayer() {
    const { animations, removeAnimation } = useCashAnimationStore();

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999] bg-transparent">
            {animations.map((anim) => (
                <div key={anim.id}>
                    {/* Основна анімація */}
                    <motion.img
                        src={anim.src}
                        alt="Cash"
                        className="absolute w-8 h-8"
                        initial={{
                            x: anim.start.x - 16,
                            y: anim.start.y - 16,
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                        }}
                        animate={{
                            x: anim.end.x - 16,
                            y: anim.end.y - 16,
                            opacity: [1, 1, 0],
                            scale: [1, 1.2, 0.8],
                            // rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            opacity: {
                                duration: 0.8,
                                times: [0, 0.7, 1]
                            },
                            scale: {
                                duration: 0.8,
                                times: [0, 0.4, 1]
                            },
                            rotate: {
                                duration: 0.8,
                                ease: "linear"
                            }
                        }}
                        onAnimationComplete={() => removeAnimation(anim.id)}
                    />
                    
                    {/* Друга копія з затримкою */}
                    <motion.img
                        src={anim.src}
                        alt="Cash"
                        className="absolute w-8 h-8"
                        initial={{
                            x: anim.start.x - 16,
                            y: anim.start.y - 16,
                            opacity: 0.7,
                            scale: 0.8,
                            rotate: 0,
                        }}
                        animate={{
                            x: anim.end.x - 16,
                            y: anim.end.y - 16,
                            opacity: [1, 0.7, 0],
                            scale: [0.8, 1, 0.6],
                            // rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.1,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            opacity: {
                                duration: 0.8,
                                delay: 0.1,
                                times: [0, 0.6, 1]
                            },
                            scale: {
                                duration: 0.8,
                                delay: 0.1,
                                times: [0, 0.3, 1]
                            },
                            rotate: {
                                duration: 0.8,
                                delay: 0.1,
                                ease: "linear"
                            }
                        }}
                    />
                    
                    {/* Третя копія з більшою затримкою */}
                    <motion.img
                        src={anim.src}
                        alt="Cash"
                        className="absolute w-8 h-8"
                        initial={{
                            x: anim.start.x - 16,
                            y: anim.start.y - 16,
                            opacity: 0.5,
                            scale: 0.6,
                            rotate: 0,
                        }}
                        animate={{
                            x: anim.end.x - 16,
                            y: anim.end.y - 16,
                            opacity: [1, 0.7, 0],
                            scale: [0.6, 0.8, 0.4],
                            // rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            opacity: {
                                duration: 0.8,
                                delay: 0.2,
                                times: [0, 0.5, 1]
                            },
                            scale: {
                                duration: 0.8,
                                delay: 0.2,
                                times: [0, 0.2, 1]
                            },
                            rotate: {
                                duration: 0.8,
                                delay: 0.2,
                                ease: "linear"
                            }
                        }}
                    />
                </div>
            ))}
        </div>
    );
}
