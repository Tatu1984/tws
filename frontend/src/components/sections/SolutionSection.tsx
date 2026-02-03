"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations";

export function SolutionSection() {
  return (
    <section className="bg-[#fcfbf9] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <FadeIn direction="left" className="relative order-first">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200">
                <Image
                  src="/images/solution-image.png"
                  alt="Micro data centers at the edge"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            {/* Text Content */}
            <FadeIn direction="right" delay={0.1}>
              <div className="mb-4">
                <span className="text-sm font-semibold text-[#e57368] uppercase tracking-wider">
                  Our Approach
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#001a2b] mb-6 leading-tight">
                Micro data centers at the edge.
              </h2>
              <p className="text-lg text-[#050707]/80 leading-relaxed">
                We design and deploy small, secure, local computing environments—micro data centers—placed on-site or near operations. These systems process data locally and run AI models close to the source, reducing latency while improving resilience and control.
              </p>
              <p className="text-lg text-[#050707]/80 leading-relaxed mt-4">
                This approach is often called edge computing. At its core, it&apos;s about keeping critical intelligence close to the action.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
