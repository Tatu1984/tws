"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";

interface CTASectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

export function CTASection({
  title = "Start a conversation",
  description = "If you\u2019re exploring how to modernize systems without compromising control or reliability, we\u2019re happy to talk.",
  ctaText = "Start a Conversation",
  ctaLink = "/contact",
  backgroundImage = "/images/373329-p-1600.jpg",
}: CTASectionProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      className="relative py-16 lg:py-24 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#001a2b]/60 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <h2 className={`text-white mb-2 fade-up${inView ? " in-view" : ""}`}>
            {title}
          </h2>
          <p
            className={`text-base text-white/80 mb-8 leading-relaxed fade-up${inView ? " in-view" : ""}`}
            style={{ transitionDelay: "120ms" }}
          >
            {description}
          </p>
          <div
            className={`fade-up${inView ? " in-view" : ""}`}
            style={{ transitionDelay: "240ms" }}
          >
            <Link href={ctaLink} className="button-gradient-dark text-lg">
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
