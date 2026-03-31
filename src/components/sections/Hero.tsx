"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative bg-[#001a2b] bg-cover bg-center pt-32 lg:pt-40 pb-40 lg:pb-52"
      style={{ backgroundImage: "url('/images/Hero.jpg')" }}
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-[48rem] mx-auto text-center">
          <div className="mb-6">
            <h1 className="text-white">
              Modern computing for real-world operations.
            </h1>
          </div>
          <p className="text-lg text-white/80 leading-relaxed mb-10">
            Ten Sparrows helps organizations running critical, real-world systems use modern technology without putting everything at risk or relying solely on distant cloud infrastructure.
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="button-gradient text-lg"
            >
              Start the Conversation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
