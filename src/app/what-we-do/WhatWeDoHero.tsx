"use client";

import { useInView } from "@/hooks/useInView";

export function WhatWeDoHero() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="bg-[#001a2b] pt-32 lg:pt-40 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight fade-up${inView ? " in-view" : ""}`}
          >
            Capabilities designed for real operations
          </h1>
          <p
            className={`text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed fade-up${inView ? " in-view" : ""}`}
            style={{ transitionDelay: "140ms" }}
          >
            We design and deploy local computing environments and intelligent
            systems for organizations where performance, reliability, and control
            matter. We help teams process and act on data in real time,
            positioned close to where decisions occur.
          </p>
        </div>
      </div>
    </section>
  );
}
