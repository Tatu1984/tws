"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: "primary" | "secondary" | "rainbow" | "custom";
  customGradient?: string;
  animate?: boolean;
}

const gradients = {
  primary: "from-primary via-primary/70 to-secondary",
  secondary: "from-secondary via-secondary/70 to-primary",
  rainbow: "from-red-500 via-yellow-500 to-blue-500",
  custom: "",
};

export function GradientText({
  children,
  className,
  gradient = "primary",
  customGradient,
  animate = false,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradient !== "custom" && gradients[gradient],
        animate && "animate-gradient bg-[length:200%_auto]",
        className
      )}
      style={customGradient ? { backgroundImage: customGradient } : undefined}
    >
      {children}
    </span>
  );
}
