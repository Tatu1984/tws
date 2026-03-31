"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      className="relative bg-[#001a2b] bg-cover bg-center pt-32 lg:pt-40 pb-40 lg:pb-52"
      style={{ backgroundImage: "url('/images/Hero.jpg')" }}
    >
      {/* Subtle dark overlay for text legibility */}
      <div className="absolute inset-0 bg-[#001a2b]/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <h1 className={`text-white fade-up${inView ? " in-view" : ""}`}>
            Modern computing for real-world operations.
          </h1>
          <p
            className={`text-lg text-white/80 leading-relaxed mb-10 mt-6 fade-up${inView ? " in-view" : ""}`}
            style={{ transitionDelay: "120ms" }}
          >
            Ten Sparrows helps organizations running critical, real-world systems
            use modern technology without putting everything at risk or relying
            solely on distant cloud infrastructure.
          </p>
          <div
            className={`flex justify-center fade-up${inView ? " in-view" : ""}`}
            style={{ transitionDelay: "240ms" }}
          >
            <Link href="/contact" className="button-gradient text-lg">
              Start the Conversation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
