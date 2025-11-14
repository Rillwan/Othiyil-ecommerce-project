import React, { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

const Counter = ({ from = 0, to = 100, duration = 2, suffix = "", prefix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" }); // triggers once when visible

    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.floor(latest));

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, to, { duration, ease: "easeOut" });
            return controls.stop; // cleanup
        }
    }, [isInView, count, to, duration]);

    return (
        <motion.div
            ref={ref}
        >
            {prefix}
            <motion.span>{rounded}</motion.span>
            {suffix}
        </motion.div>
    );
}

export default Counter;