"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  color?: string;
  particleSize?: number;
  vx?: number;
  vy?: number;
}

export function Particles({
  className,
  quantity = 100,
  staticity = 50,
  ease = 50,
  color = "#ffffff",
  particleSize = 1,
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (!canvasRef.current) return;
    context.current = canvasRef.current.getContext("2d");

    const initCanvas = () => {
      resizeCanvas();
      createParticles();
    };

    const resizeCanvas = () => {
      if (!canvasContainerRef.current || !canvasRef.current || !context.current) return;

      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;

      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    };

    const createParticles = () => {
      particles.current = [];
      for (let i = 0; i < quantity; i++) {
        particles.current.push({
          x: Math.random() * canvasSize.current.w,
          y: Math.random() * canvasSize.current.h,
          vx: (Math.random() - 0.5) * 0.5 + vx,
          vy: (Math.random() - 0.5) * 0.5 + vy,
          size: Math.random() * particleSize + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const drawParticle = (particle: Particle) => {
      if (!context.current) return;
      context.current.beginPath();
      context.current.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.current.fillStyle = color;
      context.current.globalAlpha = particle.opacity;
      context.current.fill();
    };

    const drawConnections = () => {
      if (!context.current) return;
      const maxDistance = 120;

      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            context.current.beginPath();
            context.current.moveTo(particles.current[i].x, particles.current[i].y);
            context.current.lineTo(particles.current[j].x, particles.current[j].y);
            context.current.strokeStyle = color;
            context.current.globalAlpha = (1 - distance / maxDistance) * 0.15;
            context.current.lineWidth = 0.5;
            context.current.stroke();
          }
        }
      }
    };

    const updateParticle = (particle: Particle) => {
      // Mouse interaction
      const dx = mouse.current.x - particle.x;
      const dy = mouse.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        particle.vx -= (dx / distance) * force * 0.02;
        particle.vy -= (dy / distance) * force * 0.02;
      }

      // Apply velocity with friction
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Add slight random movement
      particle.vx += (Math.random() - 0.5) * 0.01;
      particle.vy += (Math.random() - 0.5) * 0.01;

      // Wrap around edges
      if (particle.x < 0) particle.x = canvasSize.current.w;
      if (particle.x > canvasSize.current.w) particle.x = 0;
      if (particle.y < 0) particle.y = canvasSize.current.h;
      if (particle.y > canvasSize.current.h) particle.y = 0;
    };

    const animate = () => {
      if (!context.current) return;

      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);

      particles.current.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle);
      });

      drawConnections();

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasContainerRef.current) return;
      const rect = canvasContainerRef.current.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    initCanvas();
    animate();

    window.addEventListener("resize", initCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", initCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [color, quantity, particleSize, vx, vy, dpr]);

  return (
    <div ref={canvasContainerRef} className={cn("absolute inset-0", className)}>
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
