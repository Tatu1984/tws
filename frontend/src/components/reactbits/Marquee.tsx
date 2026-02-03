"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  repeat?: number;
}

export function Marquee({
  children,
  className,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  repeat = 4,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--duration:30s] [--gap:1rem]",
        className
      )}
      style={{
        ["--duration" as string]: `${speed}s`,
      }}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around gap-[--gap] animate-marquee",
            direction === "right" && "animate-marquee-reverse",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

interface MarqueeBannerProps {
  items: string[];
  className?: string;
  speed?: number;
  separator?: React.ReactNode;
}

export function MarqueeBanner({
  items,
  className,
  speed = 25,
  separator = "•",
}: MarqueeBannerProps) {
  return (
    <div className={cn("bg-primary text-primary-foreground py-2", className)}>
      <Marquee speed={speed} pauseOnHover>
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-4 px-4">
            <span className="text-sm font-medium whitespace-nowrap">{item}</span>
            <span className="text-primary-foreground/50">{separator}</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
