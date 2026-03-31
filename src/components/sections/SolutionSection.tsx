"use client";

import Image from "next/image";

export function SolutionSection() {
  return (
    <section className="off-white-background py-16 lg:py-24">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <Image
              src="/images/ChatGPT-Image-Dec-20-2025-07_58_03-AM.png"
              alt="Micro data centers at the edge"
              width={1536}
              height={1024}
              className="w-full h-auto rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text Content */}
          <div>
            <div className="mb-4">
              <div className="gradient-eyebrow">
                <span className="text-style-tagline">Our Approach</span>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-[#001a2b]">
                Micro data centers at the edge.
              </h2>
            </div>
            <p className="text-lg text-[#050707]/80 leading-relaxed">
              We design and deploy small, secure, local computing environments—micro data centers—placed on-site or near operations. These systems process data locally and run AI models close to the source, reducing latency while improving resilience and control.
            </p>
            <p className="text-lg text-[#050707]/80 leading-relaxed mt-6">
              This approach is often called edge computing. At its core, it&apos;s about keeping critical intelligence close to the action.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
