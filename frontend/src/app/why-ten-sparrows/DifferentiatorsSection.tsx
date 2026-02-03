"use client";

import { Wrench, Shield, Users, Zap, Clock, Award } from "lucide-react";

const differentiators = [
  {
    icon: Wrench,
    title: "Practical, Not Abstract",
    description: "We build systems that work in the real world, not theoretical platforms that require an army to operate.",
  },
  {
    icon: Shield,
    title: "Security by Design",
    description: "Enterprise-grade security isn't an add-on—it's built in from day one. Zero-trust architecture by default.",
  },
  {
    icon: Users,
    title: "Real Accountability",
    description: "We don't disappear after deployment. When something goes wrong, we're there. We take ownership of outcomes.",
  },
  {
    icon: Zap,
    title: "Operational Focus",
    description: "Technology serves operations, not the other way around. Our solutions support your mission, not complicate it.",
  },
  {
    icon: Clock,
    title: "Long-term Partnership",
    description: "We're building relationships, not just systems. Our business model is based on ongoing success.",
  },
  {
    icon: Award,
    title: "Proven Experience",
    description: "Our team has deployed mission-critical systems across government, healthcare, utilities, and manufacturing.",
  },
];

export function DifferentiatorsSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="text-sm font-semibold text-[#e57368] uppercase tracking-wider">
                What Sets Us Apart
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#001a2b] mb-4">
              A different kind of technology partner
            </h2>
            <p className="text-lg text-[#050707]/70 max-w-2xl mx-auto">
              We&apos;ve seen too many organizations struggle with vendors who overpromise and underdeliver. We take a different approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="bg-[#fcfbf9] rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-full bg-[#e57368]/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-[#e57368]" />
                </div>
                <h3 className="text-lg font-semibold text-[#001a2b] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#050707]/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
