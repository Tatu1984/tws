"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

export function AboutHero() {
  const { ref: textRef, inView: textInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: imgRef, inView: imgInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      className="relative bg-[#001a2b] bg-cover bg-center pt-32 lg:pt-40 pb-16 lg:pb-24"
      style={{ backgroundImage: "url('/images/Hero-insidepage.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#001a2b]/40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column */}
          <div ref={textRef}>
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight fade-left${textInView ? " in-view" : ""}`}
            >
              Micro data centers, built for the real world
            </h1>
            <p
              className={`text-lg sm:text-xl text-white/70 leading-relaxed fade-left${textInView ? " in-view" : ""}`}
              style={{ transitionDelay: "140ms" }}
            >
              Ten Sparrows designs and deploys practical, secure micro data center
              systems for organizations that need reliable infrastructure outside
              of traditional data centers and cloud-only environments. We believe
              critical technology should be easy to use, secure by default, and
              built for the people who operate it every day.
            </p>
          </div>

          {/* Right column - Image */}
          <div
            ref={imgRef}
            className={`relative aspect-4/3 rounded-2xl overflow-hidden fade-right${imgInView ? " in-view" : ""}`}
          >
            <Image
              src="/images/creation_2111275649.jpg"
              alt="Micro data center infrastructure"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
