"use client";

import { FadeIn } from "@/components/animations";

export function CloudSection() {
  return (
    <section className="bg-[#fcfbf9] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001a2b] mb-8 leading-tight">
              The cloud alone is not enough.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#001a2b]/90 leading-relaxed">
              <span className="text-[#f3b44a] font-semibold">Real operations don&apos;t always fit cloud-only solutions</span>. Many organizations are pushed toward centralized cloud models that ignore the realities of physical environments—where responsiveness, resilience, and direct control matter. Ten Sparrows takes a different approach, bringing computing power closer to where data is created and decisions are made, reducing risk and increasing operational confidence.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
