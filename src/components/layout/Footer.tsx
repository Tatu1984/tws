"use client";

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

export function Footer() {
  return (
    <footer className="bg-[#001a2b] text-white">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-20">
          {/* Top Section */}
          <div className="pb-8 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr] gap-10 lg:gap-12">
              {/* Brand Section */}
              <div>
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
                  Ten Sparrows helps organizations design, build, and operate intelligent systems that work in the real world—combining strategy, engineering, and edge-native AI.
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
              <p className="text-sm text-white/50">
                © 2025 Ten Sparrows. All rights reserved.
              </p>
              <div className="flex gap-6">
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
