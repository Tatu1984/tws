"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/what-we-do", label: "What We Do" },
    { href: "/why-ten-sparrows", label: "Why Ten Sparrows" },
    { href: "/contact", label: "Contact Us" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy policy" },
    { href: "/terms-of-service", label: "Terms of service" },
  ],
};

const COPYRIGHT_TOOLTIP =
  "This website and all associated content—including text, graphics, logos, designs, and software—are the exclusive property of Ten Sparrows, LLC. No part of this site may be reproduced, distributed, modified, or transmitted in any form or by any means without prior written permission from Ten Sparrows, LLC. Unauthorized use is strictly prohibited.";

export function Footer() {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <footer className="bg-[#001a2b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-20">

          {/* Top Section — stacks on mobile, 3-col on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] gap-10 lg:gap-12 pb-8 lg:pb-16">

            {/* Brand — full width on mobile */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-6">
                <Link href="/">
                  <Image
                    src="/images/Final-Logo_emblem.png"
                    alt="Ten Sparrows"
                    width={103}
                    height={103}
                    className="h-16 lg:h-20 w-auto rounded-none"
                  />
                </Link>
              </div>
              <p className="text-white/70 max-w-md text-sm leading-relaxed">
                Ten Sparrows helps organizations design, build, and operate
                intelligent systems that work in the real world—combining
                strategy, engineering, and edge-native AI.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white/50 mb-1">Location</p>
                  <p className="text-sm text-white">Atlanta, GA 30318, United States</p>
                </div>
                <div>
                  <p className="text-sm text-white/50 mb-1">Email</p>
                  <a
                    href="mailto:info@tensparrows.com?subject=Inquiry"
                    className="text-sm text-white hover:text-[#e57368] transition-colors"
                  >
                    info@tensparrows.com
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <div className="flex flex-col space-y-3">
                {footerLinks.navigation.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white hover:text-[#e57368] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Ten Sparrows SVG Separator */}
          <div className="py-4">
            <Image
              src="/images/ten-sparrows.svg"
              alt=""
              width={1200}
              height={60}
              className="w-full rounded-none"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Bottom Bar */}
          <div className="pt-6 lg:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setTooltipVisible((v) => !v)}
                  className="text-sm text-white/50 text-center sm:text-left cursor-pointer hover:text-white/70 transition-colors select-none bg-transparent border-none p-0"
                >
                  © 2026 Ten Sparrows, LLC. All rights reserved.
                </button>
                {tooltipVisible && (
                  <>
                    {/* Backdrop to close on outside click */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setTooltipVisible(false)}
                    />
                    <div className="absolute bottom-full left-0 mb-3 z-50 w-80 sm:w-96 bg-[#001422] border border-white/10 rounded-xl p-4 shadow-2xl">
                      <p className="text-xs text-white/70 leading-relaxed">
                        {COPYRIGHT_TOOLTIP}
                      </p>
                      <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#001422] border-r border-b border-white/10 rotate-45" />
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
