"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "rgba(255, 255, 255, 0.3)",
  onClick,
  disabled = false,
}: ShimmerButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative overflow-hidden rounded-lg px-6 py-3 font-medium",
        "bg-primary text-primary-foreground",
        "transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/25",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
        }}
        animate={{
          translateX: ["−100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
}
