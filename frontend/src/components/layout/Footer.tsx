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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-emblem.png"
                alt="Ten Sparrows"
                width={103}
                height={103}
                className="h-16 lg:h-20 w-auto"
              />
            </Link>
            <p className="text-white/70 max-w-md text-sm leading-relaxed">
              Ten Sparrows helps organizations design, build, and operate intelligent systems that work in the real world—combining strategy, engineering, and edge-native AI.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Location</p>
                <p className="text-sm text-white">Atlanta, GA 30318</p>
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Email</p>
                <a
                  href="mailto:info@tensparrows.com"
                  className="text-sm text-white hover:text-[#e57368] transition-colors"
                >
                  info@tensparrows.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white hover:text-[#e57368] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Ten Sparrows Large Text - Full Width */}
      <div className="w-full overflow-hidden py-6 lg:py-8">
        <h2 className="text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] font-bold text-white/[0.08] whitespace-nowrap text-center tracking-tighter uppercase font-heading">
          TEN SPARROWS
        </h2>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-white/10 py-6 lg:py-8">
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
    </footer>
  );
}
