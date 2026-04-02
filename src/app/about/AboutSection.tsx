"use client";

import { useInView } from "@/hooks/useInView";

export function AboutSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className="off-white-background py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="max-w-4xl mx-auto text-center">
          <div className={`mb-6 fade-up${inView ? " in-view" : ""}`}>
            <div className="gradient-eyebrow inline-block">
              <span className="text-style-tagline">About</span>
            </div>
          </div>
          <p
            className={`text-2xl sm:text-3xl lg:text-4xl text-color-midnight leading-snug font-light fade-up${inView ? " in-view" : ""}`}
            style={{ transitionDelay: "120ms" }}
          >
            We started Ten Sparrows after seeing too many capable teams held
            back by systems that were powerful but hard to run. Technology was
            overcomplicated, fragile, and siloed. We created the company to
            bring technology closer to users, making it dependable and
            supportive of actual work. Micro data centers that deploy anywhere.
            AI that runs on-site. Software designed to work even when the
            network doesn&apos;t. Practical systems, not abstract platforms.
          </p>
        </div>
      </div>
    </section>
  );
}
