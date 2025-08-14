import {motion} from "framer-motion";
import type {CardData} from "../../types/type.ts";

export default function CashMotion ({
    flipped,
    cardData
}: {
    flipped:boolean
    cardData: CardData
}) {
    const bills = Array.from({ length: 5 });
    return (
        <>
            {flipped &&
                bills.map((_, i) => (
                    <motion.img
                        key={i}
                        src={cardData.src}
                        alt="Cash"
                        className="absolute w-8 h-8"
                        initial={{ x: -80, y: 40, opacity: 0, rotate: -20 }}
                        animate={{ x: 0, y: -30, opacity: 1, rotate: 0 }}
                        transition={{
                            delay: i * 0.15,
                            duration: 0.6,
                            type: "spring",
                            stiffness: 200,
                        }}
                    />
                ))}
        </>
    )
}