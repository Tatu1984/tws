"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const audiences = [
  "Public agencies",
  "Utilities and infrastructure operators",
  "Healthcare organizations",
  "Manufacturing and logistics companies",
];

export function TargetAudienceSection() {
  const { ref: imgRef, inView: imgInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: textRef, inView: textInView } = useInView<HTMLDivElement>();

  return (
    <section className="off-white-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Text Content — first in DOM so it appears above image on mobile */}
          <div ref={textRef} className="order-1 md:order-2">
            <div className={`mb-4 fade-up${textInView ? " in-view" : ""}`}>
              <div className="gradient-eyebrow">
                <span className="text-style-tagline">Who We Work With</span>
              </div>
            </div>
            <h2
              className={`text-[#001a2b] mb-6 fade-up${textInView ? " in-view" : ""}`}
              style={{ transitionDelay: "100ms" }}
            >
              Built for organizations with real responsibility.
            </h2>
            <p
              className={`text-lg text-[#050707]/80 leading-relaxed mb-6 fade-up${textInView ? " in-view" : ""}`}
              style={{ transitionDelay: "180ms" }}
            >
              Ten Sparrows works with organizations that cannot afford downtime,
              uncertainty, or untested technology. Our partners operate in
              environments where reliability, security, and accountability matter
              deeply.
            </p>
            <p
              className={`text-lg text-[#050707]/80 leading-relaxed mb-6 fade-up${textInView ? " in-view" : ""}`}
              style={{ transitionDelay: "240ms" }}
            >
              We work with organizations operating in regulated or
              mission-critical environments, including:
            </p>

            <div className={`space-y-3 stagger-children${textInView ? " in-view" : ""}`}>
              {audiences.map((audience, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
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

          {/* Image — second in DOM, below text on mobile; left column on desktop */}
          <div ref={imgRef} className={`relative order-2 md:order-1 fade-in${imgInView ? " in-view" : ""}`}>
            <div className="rounded-2xl overflow-hidden aspect-square">
              <Image
                src="/images/ChatGPT-Image-Dec-20-2025-08_06_42-AM.png"
                alt="Who we work with"
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
