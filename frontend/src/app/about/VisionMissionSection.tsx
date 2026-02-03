"use client";

import { Target, Compass } from "lucide-react";

export function VisionMissionSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Vision */}
            <div className="bg-[#fcfbf9] rounded-2xl p-6 lg:p-8">
              <div className="w-12 h-12 rounded-full bg-[#e57368]/10 flex items-center justify-center mb-5">
                <Compass className="h-6 w-6 text-[#e57368]" />
              </div>

              <h2 className="text-xl lg:text-2xl font-bold text-[#001a2b] mb-4">Infrastructure that anyone can run</h2>
              <p className="text-[#050707]/70 leading-relaxed text-base">
                We envision a world where micro data centers are simple, intuitive, secure, and scalable. Where systems make value immediately apparent, deployments scale from one to thousands, and teams operate with shared understanding.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-[#fcfbf9] rounded-2xl p-6 lg:p-8">
              <div className="w-12 h-12 rounded-full bg-[#e57368]/10 flex items-center justify-center mb-5">
                <Target className="h-6 w-6 text-[#e57368]" />
              </div>

              <h2 className="text-xl lg:text-2xl font-bold text-[#001a2b] mb-4">Make micro data centers clear, secure, and scalable</h2>
              <p className="text-[#050707]/70 leading-relaxed text-base">
                We build a unified platform—hardware, software, and management interface—to deploy and operate micro data centers with confidence. Real-world functional systems built for success across all roles and experience levels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
