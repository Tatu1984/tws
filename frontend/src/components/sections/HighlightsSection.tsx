"use client";

import { StaggerContainer, StaggerItem } from "@/components/animations";

export function HighlightsSection() {
  return (
    <section className="bg-[#001a2b] py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto" staggerDelay={0.15}>
          {/* Local, secure computing - Monitor icon */}
          <StaggerItem className="text-center">
            <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-4">
              <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="#e57368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="10" width="52" height="34" rx="2" />
                <line x1="6" y1="36" x2="58" y2="36" />
                <circle cx="14" cy="23" r="2" fill="#e57368" />
                <circle cx="22" cy="23" r="2" fill="#e57368" />
                <line x1="32" y1="44" x2="32" y2="52" />
                <line x1="20" y1="54" x2="44" y2="54" />
              </svg>
            </div>
            <h3 className="text-base lg:text-lg font-medium text-white leading-snug">
              Local, secure computing environments
            </h3>
          </StaggerItem>

          {/* AI and automation - Gear/Sun icon */}
          <StaggerItem className="text-center">
            <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-4">
              <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="#e57368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="32" cy="32" r="12" />
                <circle cx="32" cy="32" r="5" fill="#e57368" />
                <line x1="32" y1="4" x2="32" y2="14" />
                <line x1="32" y1="50" x2="32" y2="60" />
                <line x1="4" y1="32" x2="14" y2="32" />
                <line x1="50" y1="32" x2="60" y2="32" />
                <line x1="12.2" y1="12.2" x2="19.3" y2="19.3" />
                <line x1="44.7" y1="44.7" x2="51.8" y2="51.8" />
                <line x1="12.2" y1="51.8" x2="19.3" y2="44.7" />
                <line x1="44.7" y1="19.3" x2="51.8" y2="12.2" />
              </svg>
            </div>
            <h3 className="text-base lg:text-lg font-medium text-white leading-snug">
              AI and automation deployed on-site
            </h3>
          </StaggerItem>

          {/* Reliability and trust - Shield icon */}
          <StaggerItem className="text-center">
            <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-4">
              <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="#e57368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M32 4 L56 14 L56 30 C56 46 44 56 32 60 C20 56 8 46 8 30 L8 14 L32 4Z" />
                <path d="M22 32 L28 38 L42 24" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-base lg:text-lg font-medium text-white leading-snug">
              Designed for reliability, control, and long-term trust
            </h3>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
