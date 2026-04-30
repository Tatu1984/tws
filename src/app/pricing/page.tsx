import { Header, Footer } from '@/components/layout';
import { CTASection } from '@/components/sections';
import { PricingHero } from './PricingHero';
import { PricingCards } from './PricingCards';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Ten Sparrows',
  description: 'Transparent monthly pricing for Ten Sparrows. Start free and scale when you need more.',
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <PricingHero />
        <PricingCards />
        <CTASection
          title="Still deciding?"
          description="Talk to us about which plan fits your team. We'll help you choose without the upsell."
          ctaText="Talk to Sales"
        />
      </main>
      <Footer />
    </>
  );
}
