import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { formatCash } from "../../utils/gameUtils";

interface CounterUpProps {
    value: number;
    className?: string;
    duration?: number;
}

export default function CounterUp({ value, className = "", duration = 1.5 }: CounterUpProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, value, {
            duration: duration,
            ease: [0.25, 0.46, 0.45, 0.94], // Крива Безьє для плавності
            onUpdate: (latest) => {
                setDisplayValue(Math.round(latest));
            },
        });

        return controls.stop;
    }, [value, count, duration]);

    return (
        <motion.span
            className={className}
            key={value}
            initial={{ scale: 1, color: "#ffffff" }}
            animate={{ 
                scale: [1, 1.1, 1],
                color: ["#ffffff", "#22c55e", "#ffffff"]
            }}
            transition={{ 
                duration: 0.5,
                ease: "easeInOut"
            }}
        >
            {formatCash(displayValue)}
        </motion.span>
    );
} 