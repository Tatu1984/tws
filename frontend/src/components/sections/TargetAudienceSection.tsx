"use client";

import Image from "next/image";

const audiences = [
  "Public agencies",
  "Utilities and infrastructure operators",
  "Healthcare organizations",
  "Manufacturing and logistics companies",
];

// Coral checkmark SVG component
function CoralCheckmark() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
      <circle cx="12" cy="12" r="10" fill="#e57368" />
      <path
        d="M8 12.5L10.5 15L16 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TargetAudienceSection() {
  return (
    <section className="bg-[#f5f5f5] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="relative order-first">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="/images/who-we-work-with.png"
                  alt="Who we work with"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Text Content */}
            <div>
              <div className="mb-4">
                <span className="text-sm font-semibold text-[#e57368] uppercase tracking-wider">
                  Who We Work With
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#001a2b] mb-6 leading-tight">
                Built for organizations with real responsibility.
              </h2>
              <p className="text-lg text-[#050707]/80 leading-relaxed mb-6">
                Ten Sparrows works with organizations that cannot afford downtime, uncertainty, or untested technology. Our partners operate in environments where reliability, security, and accountability matter deeply.
              </p>
              <p className="text-lg text-[#050707]/80 leading-relaxed mb-6">
                We work with organizations operating in regulated or mission-critical environments, including:
              </p>

              <div className="space-y-3">
                {audiences.map((audience, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <CoralCheckmark />
                    </div>
                    <span className="text-[#001a2b] text-lg">{audience}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
