"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function BlurText({
  text,
  className = "",
  delay = 0.05,
  animateBy = "words",
  direction = "bottom",
  as: Component = "span",
}: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: direction === "top" ? -20 : 20,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <Component ref={ref as any} className={className}>
      <motion.span
        className="inline-flex flex-wrap justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
      >
        {elements.map((element, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block"
            style={{ marginRight: animateBy === "words" ? "0.3em" : undefined }}
          >
            {element}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
