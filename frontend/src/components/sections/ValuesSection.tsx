"use client";

import { Users, Layers, Heart, Unlock } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Shared Understanding",
    description: "The best systems are the ones everyone can understand. We emphasize transparent design, documentation, and collaborative communication to eliminate knowledge silos.",
  },
  {
    icon: Layers,
    title: "Simplicity Is Strategic",
    description: "If something is hard to use, it won't scale. We prioritize clarity over complexity, making systems intuitive and usable immediately.",
  },
  {
    icon: Heart,
    title: "Trust Is Foundational",
    description: "Security, reliability, and long-term thinking are commitments, not features. We focus on building infrastructure worthy of sustained confidence.",
  },
  {
    icon: Unlock,
    title: "Empowerment Over Gatekeeping",
    description: "Technology should empower teams, not limit them. Our systems enable broader ownership and independent team capabilities.",
  },
];

export function ValuesSection() {
  return (
    <section className="bg-[#fcfbf9] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 lg:mb-12">
            <span className="text-sm font-semibold text-[#e57368] uppercase tracking-wider mb-3 block">
              What We Value
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#001a2b] leading-tight">
              Guiding principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="w-11 h-11 rounded-full bg-[#e57368]/10 flex items-center justify-center mb-4">
                  <value.icon className="h-5 w-5 text-[#e57368]" />
                </div>

                <h3 className="text-lg lg:text-xl font-semibold text-[#001a2b] mb-2">
                  {value.title}
                </h3>
                <p className="text-[#050707]/70 leading-relaxed text-sm lg:text-base">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
