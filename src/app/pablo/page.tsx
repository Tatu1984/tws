import { Header, Footer } from '@/components/layout';
import { CTASection } from '@/components/sections';
import { PricingHero } from '../pricing/PricingHero';
import { StripePricingTable } from '@/components/stripe/StripePricingTable';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pablo Pricing | Ten Sparrows',
  description:
    'Choose your Pablo plan — start free or pick monthly or yearly billing. Annual plans save ~73%.',
};

export default function PabloPage() {
  return (
    <>
      <Header />
      <main>
        <PricingHero
          eyebrow="Pablo"
          title="Choose your Pablo plan."
          description="Operations and AI assistance for teams that ship real systems. Start free, or pick monthly or yearly billing — annual plans save ~73%."
        />
        <section className="off-white-background py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <StripePricingTable
              pricingTableId={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID_PABLO}
              publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
            />
          </div>
        </section>
        <CTASection
          title="Need to talk to someone first?"
          description="Not sure which plan is right? We'll help you pick — no upsell."
          ctaText="Talk to Sales"
        />
      </main>
      <Footer />
    </>
  );
}
