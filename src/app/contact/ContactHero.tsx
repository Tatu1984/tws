"use client";

import { useInView } from "@/hooks/useInView";

export function ContactHero() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="bg-[#001a2b] pt-32 lg:pt-40 pb-16 lg:pb-20 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(229,115,104,0.12)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <div className={`mb-4 fade-up${inView ? " in-view" : ""}`}>
            <div className="gradient-eyebrow midnight-blue inline-block">
              <span className="text-style-tagline midnight-blue">Connect</span>
            </div>
          </div>
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight fade-up${inView ? " in-view" : ""}`}
            style={{ transitionDelay: "100ms" }}
          >
            Let&apos;s Start the Conversation
          </h1>
          <p
            className={`text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto fade-up${inView ? " in-view" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            We&apos;re here to listen, collaborate, and help you explore what&apos;s
            possible. Either book a call with us or fill out the form and someone
            from our team will reach out.
          </p>
        </div>
      </div>
    </section>
  );
}
