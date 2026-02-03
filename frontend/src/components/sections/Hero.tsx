"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BlurText, FadeIn } from "@/components/animations";

export function Hero() {
  return (
    <section className="relative bg-[#001a2b] pt-32 lg:pt-40 pb-8 lg:pb-12 overflow-hidden">
      {/* Decorative starburst element */}
      <motion.div
        className="absolute top-24 right-8 lg:top-32 lg:right-16 xl:right-24 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#f3b44a]">
          <g fill="currentColor">
            {/* Center circle */}
            <circle cx="50" cy="50" r="4" />
            {/* Main 4 rays */}
            <path d="M50 5 L52 42 L50 46 L48 42 Z" />
            <path d="M50 95 L48 58 L50 54 L52 58 Z" />
            <path d="M5 50 L42 48 L46 50 L42 52 Z" />
            <path d="M95 50 L58 52 L54 50 L58 48 Z" />
            {/* Diagonal rays */}
            <path d="M18.2 18.2 L40 40 L43 43 L40 40 Z" transform="rotate(0 50 50)" />
            <path d="M81.8 18.2 L60 40 L57 43 L60 40 Z" transform="rotate(0 50 50)" />
            <path d="M18.2 81.8 L40 60 L43 57 L40 60 Z" transform="rotate(0 50 50)" />
            <path d="M81.8 81.8 L60 60 L57 57 L60 60 Z" transform="rotate(0 50 50)" />
          </g>
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <BlurText
              text="Modern computing for real-world operations."
              delay={0.04}
              animateBy="words"
            />
          </h1>
          <FadeIn delay={0.4} duration={0.6}>
            <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ten Sparrows helps organizations running critical, real-world systems use modern technology without putting everything at risk or relying solely on distant cloud infrastructure.
            </p>
          </FadeIn>
          <FadeIn delay={0.6} duration={0.5}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#e57368] to-[#f3b44a] hover:from-[#d66358] hover:to-[#e3a43a] text-white rounded-full px-8 h-12 text-base font-medium shadow-lg hover:scale-105 transition-transform"
            >
              <Link href="/contact">
                Start the Conversation
              </Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
