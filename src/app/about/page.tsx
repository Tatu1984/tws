import { Header, Footer } from '@/components/layout';
import { ValuesSection, CTASection } from '@/components/sections';
import { AboutHero } from './AboutHero';
import { AboutSection } from './AboutSection';
import { VisionMissionSection } from './VisionMissionSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Ten Sparrows',
  description: 'Learn about Ten Sparrows - we build micro data centers for the real world, designed for organizations where performance, reliability, and control matter.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutSection />
        <VisionMissionSection />
        <ValuesSection />
        <CTASection
          title="Ready to build something real?"
          description="Let's discuss how we can help you deploy computing power where it matters most."
        />
      </main>
      <Footer />
    </>
  );
}
