"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface WavesProps {
  className?: string;
  colors?: string[];
  speed?: number;
  waveWidth?: number;
  blur?: number;
  opacity?: number;
}

export function Waves({
  className,
  colors = ["#6366f1", "#8b5cf6", "#0ea5e9"],
  speed = 0.5,
  waveWidth = 100,
  blur = 100,
  opacity = 0.5,
}: WavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.offsetWidth;
    let height = container.offsetHeight;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();

    let time = 0;

    const drawWave = (
      yOffset: number,
      amplitude: number,
      frequency: number,
      phaseShift: number,
      color: string
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += 5) {
        const y =
          yOffset +
          Math.sin((x / waveWidth) * frequency + time * speed + phaseShift) * amplitude +
          Math.sin((x / waveWidth) * frequency * 0.5 + time * speed * 0.7 + phaseShift) *
            (amplitude * 0.5);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, yOffset - amplitude, 0, height);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.globalAlpha = opacity;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      colors.forEach((color, i) => {
        const yOffset = height * 0.5 + i * 50;
        const amplitude = 40 + i * 15;
        const frequency = 1 + i * 0.2;
        const phaseShift = i * 1.5;
        drawWave(yOffset, amplitude, frequency, phaseShift, color);
      });

      time += 0.02;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [colors, speed, waveWidth, blur, opacity]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0", className)}>
      <canvas
        ref={canvasRef}
        className="block"
        style={{ filter: `blur(${blur}px)` }}
      />
    </div>
  );
}
