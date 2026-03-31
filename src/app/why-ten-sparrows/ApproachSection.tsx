"use client";

import { Check, X } from "lucide-react";

const comparisons = [
  {
    others: "Sell you technology, then move on",
    us: "Partner with you for ongoing success",
  },
  {
    others: "Design for perfect conditions",
    us: "Design for real-world constraints",
  },
  {
    others: "Require specialized expertise to operate",
    us: "Build systems your team can actually run",
  },
  {
    others: "Lock you into proprietary ecosystems",
    us: "Design for your independence",
  },
  {
    others: "Prioritize features over reliability",
    us: "Prioritize what actually matters",
  },
  {
    others: "Disappear when things go wrong",
    us: "Stand behind our work, always",
  },
];

export function ApproachSection() {
  return (
    <section className="bg-[#fcfbf9] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="text-sm font-semibold text-[#e57368] uppercase tracking-wider">
                Our Approach
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#001a2b] mb-4">
              The difference in practice
            </h2>
            <p className="text-lg text-[#050707]/70 max-w-2xl mx-auto">
              We&apos;ve learned from watching technology projects fail. Here&apos;s how we do things differently.
            </p>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-2 bg-[#001a2b] p-4">
              <div className="flex items-center gap-2 text-white/70 font-medium">
                <X className="h-5 w-5 text-red-400" />
                Others
              </div>
              <div className="flex items-center gap-2 text-[#e57368] font-medium">
                <Check className="h-5 w-5" />
                Ten Sparrows
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((comparison, index) => (
              <div
                key={index}
                className="grid grid-cols-2 p-4 border-t border-gray-100"
              >
                <div className="flex items-start gap-2 text-[#050707]/60 pr-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <span className="text-sm">{comparison.others}</span>
                </div>
                <div className="flex items-start gap-2 text-[#001a2b] pr-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e57368] mt-2 flex-shrink-0" />
                  <span className="text-sm font-medium">{comparison.us}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
