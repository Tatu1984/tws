"use client";

import Image from "next/image";

export function ProblemSection() {
  return (
    <section className="off-white-background py-16 lg:py-24">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            <div className="mb-4">
              <div className="gradient-eyebrow">
                <span className="text-style-tagline">The Problem</span>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-[#001a2b]">
                Distance creates delay, risk, and dependency.
              </h2>
            </div>
            <p className="text-lg text-[#050707]/80 leading-relaxed">
              When data must travel long distances to be processed, response times slow and systems become more fragile. For organizations responsible for safety, infrastructure, or regulated services, these delays can undermine reliability and trust.
            </p>
            <p className="text-lg text-[#050707]/80 leading-relaxed mt-6">
              Centralized systems also increase dependency—on connectivity, third parties, and external timelines that may not align with operational realities.
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <Image
              src="/images/ChatGPT-Image-Dec-20-2025-07_52_48-AM.png"
              alt="Distance creates delay"
              width={1536}
              height={1024}
              className="w-full h-auto rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
