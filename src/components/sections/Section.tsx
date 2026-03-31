"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "muted" | "accent" | "dark";
  containerSize?: "default" | "narrow" | "wide" | "full";
  padding?: "default" | "small" | "large" | "none";
}

const backgroundStyles = {
  default: "bg-background",
  muted: "bg-muted/50",
  accent: "bg-accent/30",
  dark: "bg-secondary text-secondary-foreground",
};

const containerStyles = {
  default: "max-w-6xl",
  narrow: "max-w-4xl",
  wide: "max-w-7xl",
  full: "max-w-full",
};

const paddingStyles = {
  default: "py-16 md:py-24",
  small: "py-8 md:py-12",
  large: "py-24 md:py-32",
  none: "py-0",
};

export function Section({
  children,
  className,
  id,
  background = "default",
  containerSize = "default",
  padding = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(backgroundStyles[background], paddingStyles[padding], className)}
    >
      <div
        className={cn(
          "container mx-auto px-4 sm:px-6 lg:px-8",
          containerStyles[containerSize]
        )}
      >
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cn("max-w-3xl mb-12", alignStyles[align], className)}
    >
      {subtitle && (
        <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
}
