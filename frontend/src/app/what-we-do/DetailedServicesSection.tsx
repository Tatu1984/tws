"use client";

import { Server, Brain, Building2, Database, Code } from "lucide-react";

const services = [
  {
    icon: Server,
    title: "Local Computing & Micro Data Centers",
    challenge: "Organizations depend on centralized data centers or cloud platforms distant from data generation points, creating delays, higher costs, and increased risk.",
    solution: "We design compact, secure computing environments placed on-site or nearby. These systems process data locally and reduce reliance on constant connectivity.",
    industries: "Municipal facilities, utility substations, transportation hubs, healthcare facilities, industrial environments",
  },
  {
    icon: Brain,
    title: "AI for Monitoring & Decision Support",
    challenge: "Cloud-based AI solutions aren't suited for field operations, safety-critical workflows, or regulated settings; sensitive data risks increase.",
    solution: "We deploy AI models within local computing environments for real-time pattern detection and anomaly flagging without moving large volumes of sensitive data off-site.",
    industries: "Public safety, infrastructure monitoring, utilities, healthcare, transportation systems",
  },
  {
    icon: Building2,
    title: "Smart City & Public Safety Systems",
    challenge: "Cities face pressure to improve safety and efficiency while managing aging infrastructure with limited resources.",
    solution: "We build integrated, locally deployed systems supporting real-time awareness and coordinated response, designed with privacy, policy, and accountability in mind.",
    industries: "City operations centers, traffic management, emergency response, municipal infrastructure, smart campuses",
  },
  {
    icon: Database,
    title: "Secure Data & Systems Integration",
    challenge: "Multiple legacy systems from different vendors create security gaps and data inconsistencies.",
    solution: "We design integrations respecting system boundaries and security requirements, treating integration as infrastructure—not an afterthought.",
    industries: "Government agencies, utilities, healthcare IT, transportation/logistics, multi-vendor environments",
  },
  {
    icon: Code,
    title: "Custom Applications Built for the Field",
    challenge: "Off-the-shelf software assumes ideal conditions unavailable in real field operations.",
    solution: "We build custom applications within local environments, shaped around real workflows, constraints, and users.",
    industries: "Field operations, dispatch centers, healthcare support teams, infrastructure crews",
  },
];

export function DetailedServicesSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 lg:mb-12">
            <span className="text-sm font-semibold text-[#e57368] uppercase tracking-wider mb-3 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#001a2b] mb-4 leading-tight">
              Our Service Areas
            </h2>
            <p className="text-lg text-[#050707]/70 max-w-2xl mx-auto">
              Comprehensive capabilities designed for demanding environments.
            </p>
          </div>

          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#fcfbf9] rounded-2xl p-6 lg:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 lg:gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#e57368]/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="h-6 w-6 text-[#e57368]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#001a2b] mb-4">
                      {service.title}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-[#e57368]">Challenge: </span>
                        <span className="text-[#050707]/70 text-sm lg:text-base">{service.challenge}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-[#e57368]">Solution: </span>
                        <span className="text-[#050707]/70 text-sm lg:text-base">{service.solution}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-[#050707]/50">Industries: </span>
                        <span className="text-[#050707]/60 text-sm">{service.industries}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
