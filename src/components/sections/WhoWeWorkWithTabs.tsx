"use client";

import { useState } from "react";
import Image from "next/image";

const tabs = [
  {
    title: "Secure, local computing environments",
    description: "",
    image: "/images/default-16.jpeg",
  },
  {
    title: "AI-enabled monitoring and analysis",
    description:
      "Intelligent automation and operational insight across manufacturing floors and agricultural environments\u2014supported by sensors, edge compute, and AI.",
    image: "/images/default-41.jpeg",
  },
  {
    title: "On-site and hybrid system integrations",
    description:
      "Secure, dependable systems for agencies modernizing critical infrastructure and digital services.",
    image: "/images/default-37.jpeg",
  },
];

export function WhoWeWorkWithTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-[#001a2b] py-16 lg:py-24">
      {/* Top Header Content */}
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="mb-4">
          <div className="gradient-eyebrow midnight-blue inline-block">
            <span className="text-style-tagline midnight-blue">Who We Work With</span>
          </div>
        </div>
        <h2 className="text-white mb-4">
          Practical systems, not abstract platforms
        </h2>
        <p className="text-lg text-white/80 leading-relaxed max-w-4xl">
          Everything we deploy is designed to operate reliably in real-world conditions, not idealized ones. Our systems are built to perform today within existing infrastructure, security requirements, and operational constraints, while remaining flexible enough to scale and evolve responsibly over time as needs change.
        </p>
      </div>

      {/* Tabs Content */}
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Desktop: side-by-side tabs + image */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12">
          {/* Tab Menu */}
          <div className="space-y-0">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left py-5 border-b border-white/10 transition-all ${
                  activeTab === index ? "opacity-100" : "opacity-60 hover:opacity-80"
                }`}
              >
                <h3 className="text-xl lg:text-2xl font-normal text-white">
                  {tab.title}
                </h3>
                {activeTab === index && tab.description && (
                  <p className="text-white/70 mt-2 text-base">{tab.description}</p>
                )}
              </button>
            ))}
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src={tabs[activeTab].image}
              alt={tabs[activeTab].title}
              fill
              className="object-cover rounded-2xl"
              sizes="50vw"
            />
          </div>
        </div>

        {/* Mobile: each tab — title button, then image + description below when active */}
        <div className="lg:hidden space-y-0">
          {tabs.map((tab, index) => (
            <div key={index} className="border-b border-white/10">
              <button
                onClick={() => setActiveTab(index === activeTab ? -1 : index)}
                className={`w-full text-left py-5 transition-all ${
                  activeTab === index ? "opacity-100" : "opacity-60"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-normal text-white">{tab.title}</h3>
                  <span className="text-white/50 text-xl shrink-0">
                    {activeTab === index ? "−" : "+"}
                  </span>
                </div>
              </button>

              {activeTab === index && (
                <div className="pb-6 flex flex-col gap-4">
                  {/* Image first — portrait aspect for vertical feel */}
                  <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src={tab.image}
                      alt={tab.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  {tab.description && (
                    <p className="text-white/70 text-base">{tab.description}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
