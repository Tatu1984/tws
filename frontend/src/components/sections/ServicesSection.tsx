"use client";

import Image from "next/image";

const services = [
  "Secure, local computing environments",
  "AI-enabled monitoring and analysis",
  "On-site and hybrid system integrations",
  "Custom software applications built for field reliability",
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

export function ServicesSection() {
  return (
    <section className="bg-[#001a2b] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div>
              <div className="mb-4">
                <span className="text-sm font-semibold text-[#e57368] uppercase tracking-wider">
                  What We Deliver
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                Practical systems, not abstract platforms.
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                Everything we deploy is designed to operate reliably in real-world conditions, not idealized ones. Our systems are built to perform today within existing infrastructure, security requirements, and operational constraints, while remaining flexible enough to scale and evolve responsibly over time as needs change.
              </p>

              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <CoralCheckmark />
                    </div>
                    <span className="text-white text-lg">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative order-first lg:order-last">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="/images/what-we-deliver.png"
                  alt="What we deliver"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
