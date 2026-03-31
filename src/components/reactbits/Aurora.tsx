"use client";

import { cn } from "@/lib/utils";

interface AuroraProps {
  children?: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function Aurora({
  children,
  className,
  intensity = "medium",
}: AuroraProps) {
  const intensityClasses = {
    low: "opacity-20",
    medium: "opacity-40",
    high: "opacity-60",
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Aurora gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute -inset-[10px] animate-aurora",
            intensityClasses[intensity]
          )}
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-float" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary/40 rounded-full blur-[80px] animate-float-delayed" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/20 rounded-full blur-[90px] animate-float-slow" />
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
