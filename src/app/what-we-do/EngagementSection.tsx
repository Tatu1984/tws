"use client";

import { MessageSquare, Search, Settings, Rocket } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    icon: MessageSquare,
    title: "Discovery",
    description: "We start with a conversation. What are your operational challenges? What has worked? What hasn't?",
  },
  {
    icon: Search,
    title: "Assessment",
    description: "We analyze your environment, existing systems, and requirements to identify where we can make the biggest impact.",
  },
  {
    icon: Settings,
    title: "Pilot",
    description: "Before full deployment, we prove the value. A targeted pilot demonstrates results in your actual environment.",
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "We deploy, train your team, and provide ongoing support. Our systems are designed for you to own and operate.",
  },
];

export function EngagementSection() {
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>();
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="bg-[#fcfbf9] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div ref={headerRef} className="text-center mb-10 lg:mb-12">
            <span className={`text-sm font-semibold text-[#e57368] uppercase tracking-wider mb-3 block fade-up${headerInView ? " in-view" : ""}`}>
              Our Process
            </span>
            <h2
              className={`text-3xl lg:text-4xl font-bold text-[#001a2b] mb-4 leading-tight fade-up${headerInView ? " in-view" : ""}`}
              style={{ transitionDelay: "100ms" }}
            >
              How We Work
            </h2>
            <p
              className={`text-lg text-[#050707]/70 max-w-2xl mx-auto fade-up${headerInView ? " in-view" : ""}`}
              style={{ transitionDelay: "180ms" }}
            >
              Most engagements begin with assessments or pilots, allowing systems
              to be tested in real conditions, validated with actual users, and
              refined before broader deployment.
            </p>
          </div>

          <div
            ref={gridRef}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 stagger-children${gridInView ? " in-view" : ""}`}
          >
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-11 h-11 rounded-full bg-[#e57368]/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-5 w-5 text-[#e57368]" />
                </div>
                <span className="text-xs font-semibold text-[#e57368] uppercase tracking-wider mb-2 block">
                  Step {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-[#001a2b] mb-2">{step.title}</h3>
                <p className="text-sm text-[#050707]/70 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
