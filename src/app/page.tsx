import { Header, Footer } from '@/components/layout';
import { Hero, HighlightsSection, CloudSection, ProblemSection, SolutionSection, ServicesSection, TargetAudienceSection, CTASection } from '@/components/sections';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ten Sparrows | Modern Computing for Real-World Operations',
  description: 'Ten Sparrows helps organizations running critical, real-world systems use modern technology without putting everything at risk.',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HighlightsSection />
        <CloudSection />
        <ProblemSection />
        <SolutionSection />
        <ServicesSection />
        <TargetAudienceSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
