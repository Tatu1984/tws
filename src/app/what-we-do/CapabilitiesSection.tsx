"use client";

import { useInView } from "@/hooks/useInView";

export function CapabilitiesSection() {
  const { ref: textRef, inView: textInView } = useInView<HTMLDivElement>();
  const { ref: cardRef, inView: cardInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="bg-[#fcfbf9] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div ref={textRef}>
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001a2b] mb-6 leading-tight fade-left${textInView ? " in-view" : ""}`}
              >
                Data is growing faster than centralized cloud systems can handle
              </h2>
              <p
                className={`text-lg text-[#050707]/80 leading-relaxed fade-left${textInView ? " in-view" : ""}`}
                style={{ transitionDelay: "120ms" }}
              >
                Organizations across government, infrastructure, utilities, and
                healthcare generate massive data volumes from cameras, sensors,
                and equipment. Processing speed and proximity to decision-makers
                are now critical. When milliseconds matter, when connectivity
                fails, when data sovereignty is non-negotiable—you need computing
                that stays local.
              </p>
            </div>

            <div
              ref={cardRef}
              className={`bg-white rounded-2xl p-6 lg:p-8 shadow-sm fade-right${cardInView ? " in-view" : ""}`}
            >
              <h3 className="text-lg font-semibold text-[#001a2b] mb-5">
                Industries we serve:
              </h3>
              <ul className="space-y-3">
                {[
                  "Government & Public Agencies",
                  "Critical Infrastructure",
                  "Utilities & Energy",
                  "Healthcare & Medical Facilities",
                  "Manufacturing & Industrial",
                ].map((industry, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#e57368] shrink-0" />
                    <span className="text-[#050707]/80">{industry}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
