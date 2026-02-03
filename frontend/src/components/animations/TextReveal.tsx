"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  width?: "fit-content" | "100%";
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  width = "fit-content",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const variants: Variants = {
    hidden: {
      clipPath: "inset(0 100% 0 0)",
      opacity: 0,
    },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ width }}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
