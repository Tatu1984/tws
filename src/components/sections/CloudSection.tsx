"use client";

import { useInView } from "@/hooks/useInView";

export function CloudSection() {
  const { ref: headingRef, inView: headingInView } = useInView<HTMLHeadingElement>();
  const { ref: bodyRef, inView: bodyInView } = useInView<HTMLHeadingElement>({ threshold: 0.1 });

  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            ref={headingRef}
            className={`big-text-scroll text-[#001a2b] fade-left${headingInView ? " in-view" : ""}`}
          >
            The cloud alone is not enough.
          </h2>
          <h2
            ref={bodyRef}
            className={`big-text-scroll-2 mt-5 fade-right${bodyInView ? " in-view" : ""}`}
          >
            <span className="gold-highlight-text">
              Real operations don&apos;t always fit cloud-only solutions
            </span>
            . Many organizations are pushed toward centralized cloud models that
            ignore the realities of physical environments—where responsiveness,
            resilience, and direct control matter. Ten Sparrows takes a different
            approach, bringing computing power closer to where data is created
            and decisions are made, reducing risk and increasing operational
            confidence.
          </h2>
        </div>
      </div>
    </section>
  );
}
