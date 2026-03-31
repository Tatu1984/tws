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
          <div className="gradient-eyebrow">
            <span className="text-style-tagline midnight-blue text-white">
              Who We Work With
            </span>
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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Tab Menu */}
          <div className="space-y-0">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left py-5 border-b border-white/10 transition-all ${
                  activeTab === index
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-80"
                }`}
              >
                <h3 className="text-xl lg:text-2xl font-normal text-white">
                  {tab.title}
                </h3>
                {activeTab === index && tab.description && (
                  <p className="text-white/70 mt-2 text-base">
                    {tab.description}
                  </p>
                )}
              </button>
            ))}
          </div>

          {/* Tab Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src={tabs[activeTab].image}
              alt={tabs[activeTab].title}
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
