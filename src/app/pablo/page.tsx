import { Header, Footer } from '@/components/layout';
import { CTASection } from '@/components/sections';
import { PricingHero } from '../pricing/PricingHero';
import { PricingCards } from '../pricing/PricingCards';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pablo Pricing | Ten Sparrows',
  description: 'Pablo pricing. Operations and AI assistance for teams that ship real systems.',
};

export default function PabloPage() {
  return (
    <>
      <Header />
      <main>
        <PricingHero
          eyebrow="Pablo"
          title="Pablo plans for every stage."
          description="Operations and AI assistance for teams that ship real systems. Start free, or pick monthly or yearly billing — annual plans save ~73%."
        />
        <PricingCards productId="pablo" />
        <CTASection
          title="Still deciding?"
          description="Talk to us about which Pablo plan fits your team. We'll help you choose without the upsell."
          ctaText="Talk to Sales"
        />
      </main>
      <Footer />
    </>
  );
}
