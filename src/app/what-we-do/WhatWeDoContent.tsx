"use client";

import Image from "next/image";
import Link from "next/link";

/* ---------- data ---------- */

const highlights = [
  { icon: "/images/Vector.svg", text: "Local, secure computing environments" },
  { icon: "/images/monitoring.svg", text: "AI and automation deployed on-site" },
  { icon: "/images/apis.svg", text: "Designed for reliability, control, and long-term trust" },
  { icon: "/images/network.svg", text: "Zero trust access to data, devices and users" },
];

const capabilities = [
  {
    number: "01",
    title: "Local Computing & Micro Data Centers",
    image: "/images/freepik__the-style-is-candid-image-photography-with-natural__61738.jpeg",
    problem:
      "Many organizations still rely on centralized data centers or cloud platforms that sit far from where their operations actually happen. As video, sensor, and operational data volumes grow, this distance creates delays, higher costs, and increased risk of disruption when connectivity is lost or bandwidth is constrained.",
    solution:
      "Ten Sparrows designs and deploys micro data centers\u2014compact, secure computing environments placed on-site or near operations. These systems process data locally, reduce dependency on cloud connectivity, and give organizations direct control over their infrastructure. Each deployment is tailored to the environment, from power and cooling to physical security and network architecture.",
    usedIn: [
      "Municipal facilities",
      "Utility substations",
      "Transportation hubs",
      "Healthcare facilities",
      "Industrial environments",
    ],
  },
  {
    number: "02",
    title: "AI for Monitoring & Decision Support",
    image: "/images/freepik__the-style-is-candid-image-photography-with-natural__61739.jpeg",
    problem:
      "Organizations are under pressure to \u201cuse AI,\u201d but many solutions are designed for centralized cloud environments and require constant connectivity, significant bandwidth, and ongoing data uploads. For environments generating real-time video, sensor, and telemetry data, these models introduce latency, cost, and privacy concerns.",
    solution:
      "Ten Sparrows deploys AI models inside local computing environments so data can be analyzed where it is created. These models support monitoring, anomaly detection, predictive maintenance, and situational awareness\u2014without sending sensitive data off-site. Every deployment is configured for the specific environment, data types, and operational goals of the organization.",
    usedIn: [
      "Public safety",
      "Infrastructure monitoring",
      "Utilities and energy",
      "Healthcare operations",
      "Transportation",
    ],
  },
  {
    number: "03",
    title: "Smart City & Public Safety Systems",
    image: "/images/freepik__the-style-is-candid-image-photography-with-natural__61740.jpeg",
    problem:
      "Cities and public agencies face growing demands to improve safety, efficiency, and transparency\u2014but they often rely on fragmented, legacy systems that can\u2019t communicate with one another. Building a connected, responsive city infrastructure from scratch is expensive, risky, and often politically complex.",
    solution:
      "Ten Sparrows builds integrated, locally deployed systems that support real-time awareness, cross-agency coordination, and data-driven decision-making. We work within existing infrastructure to connect video, sensor, communications, and operational data into unified platforms\u2014without requiring full system replacement.",
    usedIn: [
      "City operations centers",
      "Traffic management",
      "Public safety",
      "Municipal infrastructure",
      "Smart campus",
    ],
  },
  {
    number: "04",
    title: "Secure Data & Systems Integration",
    image: "/images/freepik__the-style-is-candid-image-photography-with-natural__61741.jpeg",
    problem:
      "Most organizations already have many systems in place\u2014often from different vendors, installed at different times, and built on different standards. Getting these systems to share data securely and reliably is one of the biggest challenges in modern operations, especially when compliance, access control, and auditability are required.",
    solution:
      "Ten Sparrows designs integrations that respect system boundaries, security requirements, and data governance policies. We connect existing tools and platforms using open standards and secure protocols, enabling data to flow where it\u2019s needed without creating unnecessary risk or vendor dependencies.",
    usedIn: [
      "Government and agency",
      "Utility and energy",
      "Healthcare IT",
      "Transportation and logistics",
      "Multi-vendor",
    ],
  },
  {
    number: "05",
    title: "Custom Applications Built for the Field",
    image: "/images/freepik__the-style-is-candid-image-photography-with-natural__61742.jpeg",
    problem:
      "Off-the-shelf software assumes ideal conditions\u2014constant connectivity, standardized workflows, and predictable user behavior. But organizations operating in the field, in facilities, or across distributed environments face conditions that generic software simply wasn\u2019t built for.",
    solution:
      "When existing tools fall short, Ten Sparrows designs and builds custom applications tailored to specific workflows, environments, and user needs. These applications are built for reliability in low-connectivity, high-stakes, or non-standard conditions\u2014and they\u2019re designed to integrate cleanly with existing systems.",
    usedIn: [
      "Field operations",
      "Dispatch centers",
      "Healthcare/clinical support",
      "Infrastructure/maintenance",
      "Multi-vendor",
    ],
  },
];

/* ---------- component ---------- */

export function WhatWeDoContent() {
  return (
    <>
      {/* ===== 1. Hero Header ===== */}
      <section className="bg-[#001a2b] bg-cover bg-center pt-32 lg:pt-40 pb-16 lg:pb-24" style={{ backgroundImage: "url('/images/Hero-insidepage.jpg')" }}>
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[48rem] mx-auto text-center">
            <div className="mb-4">
              <div className="gradient-eyebrow">
                <span className="text-style-tagline midnight-blue">What We Do</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Capabilities designed for real operations
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed">
              Ten Sparrows helps organizations modernize their technology
              infrastructure without compromising on control, reliability, or
              security. Every engagement starts with your environment and your
              constraints.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 2. 4-Column Highlights ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {highlights.map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="mb-6">
                  <div className="w-12 h-12 mx-auto">
                    <Image
                      src={item.icon}
                      alt=""
                      width={47}
                      height={47}
                      className="w-full h-full rounded-none"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-normal text-[#001a2b] leading-snug">
                  {item.text}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. The Reality Section ===== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left */}
            <div>
              <div className="mb-4">
                <div className="gradient-eyebrow">
                  <span className="text-style-tagline">The Reality</span>
                </div>
              </div>
              <h2 className="text-[#001a2b]">
                Data is growing faster than centralized cloud systems can handle
              </h2>
            </div>
            {/* Right */}
            <div>
              <p className="text-lg text-[#050707]/80 leading-relaxed">
                Most organizations are generating more data than ever before&mdash;from
                cameras, sensors, IoT devices, operational tools, and more. Sending
                all of that data to a centralized cloud for processing creates
                bottlenecks, increases costs, and introduces risk. The result is
                delayed decisions, overloaded networks, and growing security
                exposure. Real-world operations need systems that process data
                closer to where it&rsquo;s created.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. Our Capabilities Header ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[48rem] mx-auto text-center">
            <div className="mb-4">
              <div className="gradient-eyebrow">
                <span className="text-style-tagline">Our Capabilities</span>
              </div>
            </div>
            <h2 className="text-[#001a2b]">How we build systems</h2>
          </div>
        </div>
      </section>

      {/* ===== 5. Capability Sections (sticky numbered) ===== */}
      <section className="off-white-background py-8 lg:py-12">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          {capabilities.map((cap) => (
            <div key={cap.number} className="mb-16 last:mb-0">
              {/* Sticky header bar */}
              <div
                className="sticky top-0 z-10 bg-[#001a2b] text-white py-4 px-6 rounded-lg mb-8 flex items-center gap-4"
              >
                <span className="text-2xl font-bold gold-highlight-text">
                  {cap.number}
                </span>
                <h3 className="text-xl lg:text-2xl font-semibold">
                  {cap.title}
                </h3>
              </div>

              {/* Two-column content */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                {/* Left - text */}
                <div className="space-y-8">
                  {/* The Problem */}
                  <div>
                    <h4 className="text-lg font-bold text-[#001a2b] mb-3">
                      The Problem:
                    </h4>
                    <p className="text-[#050707]/80 leading-relaxed">
                      {cap.problem}
                    </p>
                  </div>

                  {/* Our Solution */}
                  <div>
                    <h4 className="text-lg font-bold text-[#001a2b] mb-3">
                      Our Solution:
                    </h4>
                    <p className="text-[#050707]/80 leading-relaxed">
                      {cap.solution}
                    </p>
                  </div>

                  {/* Where It's Used */}
                  <div>
                    <h4 className="text-lg font-bold text-[#001a2b] mb-3">
                      Where It&apos;s Used:
                    </h4>
                    <ul className="space-y-3">
                      {cap.usedIn.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Image
                            src="/images/coral-bullet.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="flex-shrink-0 mt-0.5 rounded-none"
                          />
                          <span className="text-[#050707]/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right - image */}
                <div className="relative">
                  <Image
                    src={cap.image}
                    alt={cap.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 6. CTA Section ===== */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/Hero.jpg"
            alt=""
            fill
            className="object-cover rounded-none"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#001a2b]/80" />
        </div>

        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-[48rem] mx-auto text-center">
            <div className="mb-4">
              <h2 className="text-white">Start a conversation</h2>
            </div>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              If you&apos;re exploring how to modernize systems without
              compromising control or reliability, we&apos;re happy to talk.
            </p>
            <Link
              href="/contact"
              className="button-gradient text-lg"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
