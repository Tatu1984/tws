import { Header, Footer } from '@/components/layout';
import { CTASection } from '@/components/sections';
import { PricingHero } from '../pricing/PricingHero';
import { PricingCards } from '../pricing/PricingCards';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TS Edge Nest Pricing | Ten Sparrows',
  description: 'TS Edge Nest pricing. AI-native workspace for everyday work, collaboration, and enterprise scale.',
};

export default function TsEdgeNestPage() {
  return (
    <>
      <Header />
      <main>
        <PricingHero
          eyebrow="TS Edge Nest"
          title="TS Edge Nest plans for every team."
          description="AI-native workspace for everyday work, collaboration, and enterprise scale. Start free and grow into the controls your organization needs."
        />
        <PricingCards productId="ts-edge-nest" />
        <CTASection
          title="Still deciding?"
          description="Talk to us about which TS Edge Nest plan fits your team. We'll help you choose without the upsell."
          ctaText="Talk to Sales"
        />
      </main>
      <Footer />
    </>
  );
}
