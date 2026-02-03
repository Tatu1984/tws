"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function CTASection({
  title = "Start a conversation",
  description = "If you're exploring how to modernize systems without compromising control or reliability, we're happy to talk.",
  ctaText = "Start a Conversation",
  ctaLink = "/contact",
}: CTASectionProps) {
  return (
    <section className="relative bg-[#001a2b] py-16 lg:py-24 overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/services-1.jpeg"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-[#001a2b]/70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            {description}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#e57368] to-[#f3b44a] hover:from-[#d66358] hover:to-[#e3a43a] text-white rounded-full px-8 h-12 text-base font-medium shadow-lg"
          >
            <Link href={ctaLink}>
              {ctaText}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
