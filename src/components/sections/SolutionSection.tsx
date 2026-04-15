"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

export function SolutionSection() {
  const { ref: imgRef, inView: imgInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: textRef, inView: textInView } = useInView<HTMLDivElement>();

  return (
    <section className="off-white-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content — first in DOM so it appears on top on mobile */}
          <div ref={textRef} className="order-1 md:order-2">
            <div className={`mb-4 fade-up${textInView ? " in-view" : ""}`}>
              <div className="gradient-eyebrow">
                <span className="text-style-tagline">Our Approach</span>
              </div>
            </div>
            <h2
              className={`text-[#001a2b] mb-6 fade-up${textInView ? " in-view" : ""}`}
              style={{ transitionDelay: "100ms" }}
            >
              Micro data centers at the edge.
            </h2>
            <p
              className={`text-lg text-[#050707]/80 leading-relaxed fade-up${textInView ? " in-view" : ""}`}
              style={{ transitionDelay: "200ms" }}
            >
              We design and deploy small, secure, local computing
              environments—micro data centers—placed on-site or near operations.
              These systems process data locally and run AI models close to the
              source, reducing latency while improving resilience and control.
            </p>
            <p
              className={`text-lg text-[#050707]/80 leading-relaxed mt-6 fade-up${textInView ? " in-view" : ""}`}
              style={{ transitionDelay: "280ms" }}
            >
              This approach is often called edge computing. At its core,
              it&apos;s about keeping critical intelligence close to the action.
            </p>
          </div>

          {/* Image — second in DOM, appears below text on mobile, left on desktop */}
          <div ref={imgRef} className={`relative order-2 md:order-1 fade-in${imgInView ? " in-view" : ""}`}>
            <div className="rounded-2xl overflow-hidden aspect-square">
              <Image
                src="/images/ChatGPT-Image-Dec-20-2025-07_58_03-AM.png"
                alt="Micro data centers at the edge"
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
