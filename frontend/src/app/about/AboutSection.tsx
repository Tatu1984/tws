"use client";

export function AboutSection() {
  return (
    <section className="bg-[#fcfbf9] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg lg:text-xl text-[#050707]/90 leading-relaxed mb-6">
            We started Ten Sparrows after seeing too many capable teams held back by systems that were powerful but hard to run. Technology was overcomplicated, fragile, and siloed.
          </p>
          <p className="text-lg lg:text-xl text-[#050707]/90 leading-relaxed mb-6">
            We created the company to bring technology closer to users, making it dependable and supportive of actual work.
          </p>
          <p className="text-lg lg:text-xl text-[#050707]/90 leading-relaxed">
            Micro data centers that deploy anywhere. AI that runs on-site. Software designed to work even when the network doesn&apos;t. Practical systems, not abstract platforms.
          </p>
        </div>
      </div>
    </section>
  );
}
