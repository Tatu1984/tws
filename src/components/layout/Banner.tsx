"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Marquee } from "@/components/reactbits";
import { cn } from "@/lib/utils";

interface BannerProps {
  items?: string[];
  closable?: boolean;
  className?: string;
}

const defaultItems = [
  "Edge Computing Solutions",
  "AI-Powered Monitoring",
  "Micro Data Centers",
  "Zero Trust Security",
  "Real-time Processing",
  "Local-first Architecture",
];

export function Banner({
  items = defaultItems,
  closable = true,
  className,
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "bg-secondary text-secondary-foreground overflow-hidden",
            className
          )}
        >
          <div className="relative py-2">
            <Marquee speed={30} pauseOnHover>
              {items.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-6 px-6 text-sm font-medium"
                >
                  <span className="whitespace-nowrap">{item}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                </span>
              ))}
            </Marquee>

            {closable && (
              <button
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors z-10"
                aria-label="Close banner"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
