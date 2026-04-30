"use client";

import { useInView } from "@/hooks/useInView";

export function PricingHero() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      className="relative bg-[#001a2b] bg-cover bg-center pt-32 lg:pt-40 pb-16 lg:pb-24"
      style={{ backgroundImage: "url('/images/Hero-insidepage.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#001a2b]/40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <div className={`mb-6 fade-up${inView ? " in-view" : ""}`}>
            <div className="gradient-eyebrow midnight-blue">
              <span className="text-style-tagline midnight-blue">Pricing</span>
            </div>
          </div>
          <h1
            className={`text-white mb-6 fade-up${inView ? " in-view" : ""}`}
            style={{ transitionDelay: "100ms" }}
          >
            Simple plans for every stage.
          </h1>
          <p
            className={`text-lg sm:text-xl text-white/70 leading-relaxed fade-up${inView ? " in-view" : ""}`}
            style={{ transitionDelay: "180ms" }}
          >
            Choose the plan that fits how you work. Start free, scale when you
            need more, and only pay for the capacity you actually use.
          </p>
        </div>
      </div>
    </section>
  );
}
