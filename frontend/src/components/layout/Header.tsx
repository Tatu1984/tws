"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/why-ten-sparrows", label: "Why Ten Sparrows" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#001a2b] shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Ten Sparrows"
              width={156}
              height={40}
              className="h-8 lg:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white hover:text-[#e57368] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button
              asChild
              className="bg-gradient-to-r from-[#e57368] to-[#f3b44a] hover:from-[#d66358] hover:to-[#e3a43a] text-white rounded-full px-6 shadow-lg"
            >
              <Link href="/contact">
                Let&apos;s Talk
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 bg-[#001a2b] border-[#001a2b]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-lg font-medium text-white hover:text-[#e57368] transition-colors border-b border-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-[#e57368] to-[#f3b44a] hover:from-[#d66358] hover:to-[#e3a43a] text-white rounded-full"
                  >
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Let&apos;s Talk
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
