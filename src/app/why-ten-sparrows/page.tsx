import { Header, Footer } from '@/components/layout';
import { CTASection } from '@/components/sections';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Ten Sparrows | Ten Sparrows',
  description: 'Discover why organizations choose Ten Sparrows for their edge computing and intelligent systems needs. Practical solutions, real accountability.',
};

export default function WhyTenSparrowsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Header */}
        <section className="py-16 lg:py-24 bg-white pt-32 lg:pt-40">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-[48rem] mx-auto text-center mb-12">
              <div className="mb-4">
                <div className="gradient-eyebrow">
                  <span className="text-style-tagline">Why Us</span>
                </div>
              </div>
              <div className="mb-6">
                <h1 className="text-color-midnight">
                  We bridge the gap between{' '}
                  <span className="gold-highlight-reg">promise and reality.</span>
                </h1>
              </div>
              <p className="text-lg text-[#050707]/80 leading-relaxed">
                Too many technology providers overpromise and underdeliver. We take a different approach—grounded in experience, accountability, and a commitment to building systems that actually work where they&apos;re needed most.
              </p>
            </div>
            <div className="relative w-full">
              <Image
                src="/images/why-ten-sparrows.png"
                alt="Why Ten Sparrows"
                width={1920}
                height={1080}
                className="w-full h-auto rounded-2xl"
                sizes="(max-width: 1280px) 100vw, 80rem"
                priority
              />
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <div className="mb-4">
                  <div className="gradient-eyebrow">
                    <span className="text-style-tagline">Philosophy</span>
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="text-color-midnight">
                    Keep it close. Keep it reliable. Keep people in control.
                  </h2>
                </div>
                <p className="text-lg text-[#050707]/80 leading-relaxed mb-6">
                  We believe computing should serve the people who depend on it—not the other way around. That means putting intelligence where it&apos;s needed, designing for resilience, and keeping human judgment at the center.
                </p>
                <p className="text-lg font-bold text-color-blue mb-4">
                  We prioritize:
                </p>
                <ul className="space-y-3">
                  {[
                    'Local intelligence over distant dependency',
                    'Reliability before scale',
                    'Human decision-making supported, not replaced',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Image
                        src="/images/Group-15430.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="mt-1 flex-shrink-0 rounded-none"
                      />
                      <span className="text-lg text-[#050707]/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/happy-diverse-people-executive-team-working-together-group-office-meeting.jpg"
                  alt="Diverse executive team working together"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Experienced Leadership */}
        <section className="off-white-background py-16 lg:py-24">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="relative">
                <Image
                  src="/images/tech-people-trying-achieve-ambitious-sustainability-goals.jpg"
                  alt="Experienced leadership team"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <div className="mb-4">
                  <div className="gradient-eyebrow">
                    <span className="text-style-tagline">Experienced Leadership</span>
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="text-color-midnight">
                    Experience that shows up in the work
                  </h2>
                </div>
                <p className="text-lg text-[#050707]/80 leading-relaxed">
                  Our leadership team brings decades of experience from organizations like Microsoft and Intel—where they worked on large-scale systems, edge infrastructure, and real-world deployments. That background informs how we scope projects, manage complexity, and build systems designed to last. We don&apos;t just understand the technology. We understand the environments it has to survive in—and the people who depend on it every day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-16 lg:py-24">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <div className="mb-4">
                  <div className="gradient-eyebrow">
                    <span className="text-style-tagline">How We Work</span>
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="text-color-midnight">
                    Collaborative, practical, and built for the long term
                  </h2>
                </div>
                <p className="text-lg text-[#050707]/80 leading-relaxed">
                  We work closely with every client to understand their environment, constraints, and goals. From there, we design and deploy solutions that are realistic, maintainable, and aligned with how your organization actually operates. No black boxes. No vendor lock-in. Just clear thinking, honest communication, and systems built to perform—today and tomorrow.
                </p>
              </div>
              <div className="relative">
                <Image
                  src="/images/colleagues-working-together-project.jpg"
                  alt="Colleagues working together on a project"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
