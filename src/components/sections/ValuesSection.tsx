"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const values = [
  {
    icon: "/images/shared.svg",
    title: "Shared Understanding",
    description:
      "The best systems are the ones everyone can understand. We emphasize transparent design, documentation, and collaborative communication to eliminate knowledge silos.",
  },
  {
    icon: "/images/simplicity.svg",
    title: "Simplicity Is Strategic",
    description:
      "If something is hard to use, it won\u2019t scale. We prioritize clarity over complexity, making systems intuitive and usable immediately.",
  },
  {
    icon: "/images/trust.svg",
    title: "Trust Is Foundational",
    description:
      "Security, reliability, and long-term thinking are commitments, not features. We focus on building infrastructure worthy of sustained confidence.",
  },
  {
    icon: "/images/unlock.svg",
    title: "Empowerment Over Gatekeeping",
    description:
      "Technology should empower teams, not limit them. Our systems enable broader ownership and independent team capabilities.",
  },
];

export function ValuesSection() {
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>();
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="light-gray-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <span className={`gradient-eyebrow text-style-tagline text-[#e57368] mb-4 inline-block fade-up${headerInView ? " in-view" : ""}`}>
            What We Value
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-color-midnight mb-4 leading-tight fade-up${headerInView ? " in-view" : ""}`}
            style={{ transitionDelay: "100ms" }}
          >
            The principles that guide everything we do
          </h2>
          <p
            className={`text-base lg:text-lg text-[#050707]/70 leading-relaxed fade-up${headerInView ? " in-view" : ""}`}
            style={{ transitionDelay: "180ms" }}
          >
            Our values shape the way we build, support, and grow alongside the
            organizations we serve.
          </p>
        </div>

        {/* 4-column grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 stagger-children${gridInView ? " in-view" : ""}`}
        >
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 lg:p-8">
              <div className="mb-5">
                <Image
                  src={value.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-none"
                />
              </div>
              <h5 className="text-lg lg:text-xl font-semibold text-color-midnight mb-3">
                {value.title}
              </h5>
              <p className="text-sm lg:text-base text-[#050707]/70 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
