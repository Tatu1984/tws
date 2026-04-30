import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment successful | Ten Sparrows',
};

export default function PricingSuccessPage() {
  return (
    <>
      <Header />
      <main
        className="relative bg-[#001a2b] bg-cover bg-center pt-32 lg:pt-40 pb-32"
        style={{ backgroundImage: "url('/images/Hero-insidepage.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#001a2b]/60" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-6">
            <div className="gradient-eyebrow midnight-blue">
              <span className="text-style-tagline midnight-blue">Confirmed</span>
            </div>
          </div>
          <h1 className="text-white mb-6">Thank you — your subscription is active.</h1>
          <p className="text-lg text-white/75 mb-10 leading-relaxed">
            We&apos;ve received your payment in Stripe&apos;s test environment. A receipt
            has been sent to the email you used at checkout.
          </p>
          <Link href="/pricing" className="button-solid">
            Back to pricing
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
