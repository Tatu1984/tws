"use client";

import Image from "next/image";

export function AboutHero() {
  return (
    <section className="bg-[#001a2b] bg-cover bg-center pt-32 lg:pt-40 pb-16 lg:pb-24" style={{ backgroundImage: "url('/images/Hero-insidepage.jpg')" }}>
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Micro data centers, built for the real world
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed">
              Ten Sparrows designs and deploys practical, secure micro data center systems for organizations that need reliable infrastructure outside of traditional data centers and cloud-only environments. We believe critical technology should be easy to use, secure by default, and built for the people who operate it every day.
            </p>
          </div>

          {/* Right column - Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/creation_2111275649.jpg"
              alt="Micro data center infrastructure"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
