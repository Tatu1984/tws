"use client";

import Link from "next/link";

interface CTASectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function CTASection({
  title = "Start a conversation",
  description = "If you\u2019re exploring how to modernize systems without compromising control or reliability, we\u2019re happy to talk.",
  ctaText = "Start a Conversation",
  ctaLink = "/contact",
}: CTASectionProps) {
  return (
    <section
      className="relative py-16 lg:py-24 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Hero.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#001a2b]/60 z-0" />

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-[48rem] mx-auto text-center">
          <div className="mb-2">
            <h2 className="text-white">{title}</h2>
          </div>
          <p className="text-base text-white/80 mb-8 leading-relaxed">
            {description}
          </p>
          <Link
            href={ctaLink}
            className="button-gradient text-lg"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
