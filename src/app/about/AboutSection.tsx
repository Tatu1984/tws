"use client";

export function AboutSection() {
  return (
    <section className="off-white-background py-20 lg:py-28">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="gradient-eyebrow text-style-tagline text-[#e57368] mb-6 inline-block">
            About
          </span>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-color-midnight leading-snug font-light">
            We started Ten Sparrows after seeing too many capable teams held
            back by systems that were powerful but hard to run. Technology was
            overcomplicated, fragile, and siloed. We created the company to
            bring technology closer to users, making it dependable and
            supportive of actual work. Micro data centers that deploy anywhere.
            AI that runs on-site. Software designed to work even when the
            network doesn&apos;t. Practical systems, not abstract platforms.
          </p>
        </div>
      </div>
    </section>
  );
}
