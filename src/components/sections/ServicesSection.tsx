"use client";

import Image from "next/image";

const services = [
  "Secure, local computing environments",
  "AI-enabled monitoring and analysis",
  "On-site and hybrid system integrations",
  "Custom software applications built for field reliability",
];

export function ServicesSection() {
  return (
    <section className="bg-[#001a2b] py-16 lg:py-24">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Text Content */}
          <div>
            <div className="mb-4">
              <div className="gradient-eyebrow">
                <span className="text-style-tagline midnight-blue">What We Deliver</span>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-white">
                Practical systems, not abstract platforms.
              </h2>
            </div>
            <div className="mb-6">
              <p className="text-base text-white/80 leading-relaxed">
                Everything we deploy is designed to operate reliably in real-world conditions, not idealized ones. Our systems are built to perform today within existing infrastructure, security requirements, and operational constraints, while remaining flexible enough to scale and evolve responsibly over time as needs change.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {services.map((service, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 self-start">
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
          <div className="relative">
            <div className="rounded-[20px] overflow-hidden">
              <Image
                src="/images/freepik__35mm-film-photography-a-logistics-or-warehouse-coo__15403.png"
                alt="What we deliver"
                width={1024}
                height={1024}
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
