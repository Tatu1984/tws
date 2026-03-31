"use client";

import Image from "next/image";

const audiences = [
  "Public agencies",
  "Utilities and infrastructure operators",
  "Healthcare organizations",
  "Manufacturing and logistics companies",
];

export function TargetAudienceSection() {
  return (
    <section className="off-white-background py-16 lg:py-24">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative order-first">
            <Image
              src="/images/ChatGPT-Image-Dec-20-2025-08_06_42-AM.png"
              alt="Who we work with"
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
                <span className="text-style-tagline">Who We Work With</span>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-[#001a2b]">
                Built for organizations with real responsibility.
              </h2>
            </div>
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
                    <Image
                      src="/images/coral-checkmark.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-none"
                    />
                  </div>
                  <span className="text-[#001a2b] text-lg">{audience}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
