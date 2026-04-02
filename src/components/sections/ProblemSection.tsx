"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

export function ProblemSection() {
  const { ref: textRef, inView: textInView } = useInView<HTMLDivElement>();
  const { ref: imgRef, inView: imgInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="off-white-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div ref={textRef}>
            <div className={`mb-4 fade-up${textInView ? " in-view" : ""}`}>
              <div className="gradient-eyebrow">
                <span className="text-style-tagline">The Problem</span>
              </div>
            </div>
            <h2
              className={`text-[#001a2b] mb-6 fade-up${textInView ? " in-view" : ""}`}
              style={{ transitionDelay: "100ms" }}
            >
              Distance creates delay, risk, and dependency.
            </h2>
            <p
              className={`text-lg text-[#050707]/80 leading-relaxed fade-up${textInView ? " in-view" : ""}`}
              style={{ transitionDelay: "200ms" }}
            >
              When data must travel long distances to be processed, response
              times slow and systems become more fragile. For organizations
              responsible for safety, infrastructure, or regulated services,
              these delays can undermine reliability and trust.
            </p>
            <p
              className={`text-lg text-[#050707]/80 leading-relaxed mt-6 fade-up${textInView ? " in-view" : ""}`}
              style={{ transitionDelay: "280ms" }}
            >
              Centralized systems also increase dependency—on connectivity,
              third parties, and external timelines that may not align with
              operational realities.
            </p>
          </div>

          {/* Image */}
          <div ref={imgRef} className={`relative fade-in${imgInView ? " in-view" : ""}`}>
            <div className="rounded-2xl overflow-hidden aspect-square">
              <Image
                src="/images/ChatGPT-Image-Dec-20-2025-07_52_48-AM.png"
                alt="Distance creates delay"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full h-full object-cover rounded-none"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
