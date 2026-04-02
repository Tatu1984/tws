"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const services = [
  "Secure, local computing environments",
  "AI-enabled monitoring and analysis",
  "On-site and hybrid system integrations",
  "Custom software applications built for field reliability",
];

export function ServicesSection() {
  const { ref: textRef, inView: textInView } = useInView<HTMLDivElement>();
  const { ref: imgRef, inView: imgInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="bg-[#001a2b] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Text Content */}
          <div ref={textRef}>
            <div className={`mb-4 fade-up${textInView ? " in-view" : ""}`}>
              <div className="gradient-eyebrow midnight-blue">
                <span className="text-style-tagline midnight-blue">What We Deliver</span>
              </div>
            </div>
            <h2
              className={`text-white mb-6 fade-up${textInView ? " in-view" : ""}`}
              style={{ transitionDelay: "100ms" }}
            >
              Practical systems, not abstract platforms.
            </h2>
            <p
              className={`text-base text-white/80 leading-relaxed mb-6 fade-up${textInView ? " in-view" : ""}`}
              style={{ transitionDelay: "180ms" }}
            >
              Everything we deploy is designed to operate reliably in real-world
              conditions, not idealized ones. Our systems are built to perform
              today within existing infrastructure, security requirements, and
              operational constraints, while remaining flexible enough to scale
              and evolve responsibly over time as needs change.
            </p>

            <div className={`space-y-4 pt-2 stagger-children${textInView ? " in-view" : ""}`}>
              {services.map((service, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="shrink-0 self-start">
                    <Image
                      src="/images/Group-15430.svg"
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-none"
                    />
                  </div>
                  <p className="text-white">{service}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imgRef} className={`relative fade-in${imgInView ? " in-view" : ""}`}>
            <div className="rounded-[20px] overflow-hidden">
              <Image
                src="/images/what-we-deliver.png"
                alt="What we deliver"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full h-auto object-cover aspect-square rounded-none"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
