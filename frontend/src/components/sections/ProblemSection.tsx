"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations";

export function ProblemSection() {
  return (
    <section className="bg-[#fcfbf9] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <FadeIn direction="left">
              <div className="mb-4">
                <span className="text-sm font-semibold text-[#e57368] uppercase tracking-wider">
                  The Problem
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#001a2b] mb-6 leading-tight">
                Distance creates delay, risk, and dependency.
              </h2>
              <p className="text-lg text-[#050707]/80 leading-relaxed">
                When data must travel long distances to be processed, response times slow and systems become more fragile. For organizations responsible for safety, infrastructure, or regulated services, these delays can undermine reliability and trust.
              </p>
              <p className="text-lg text-[#050707]/80 leading-relaxed mt-4">
                Centralized systems also increase dependency—on connectivity, third parties, and external timelines that may not align with operational realities.
              </p>
            </FadeIn>

            {/* Image */}
            <FadeIn direction="right" delay={0.1} className="relative order-first lg:order-last">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200">
                <Image
                  src="/images/problem-image.png"
                  alt="Distance creates delay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
