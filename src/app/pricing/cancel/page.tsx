import Link from 'next/link';
import { X } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout cancelled | Ten Sparrows',
};

export default function PricingCancelPage() {
  return (
    <>
      <Header />
      <main
        className="relative bg-[#001a2b] bg-cover bg-center pt-32 lg:pt-40 pb-24 lg:pb-32 min-h-[calc(100vh-5rem)]"
        style={{ backgroundImage: "url('/images/Hero-insidepage.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#001a2b]/70 pointer-events-none" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Cancel icon */}
          <div className="flex justify-center mb-8">
            <div
              className="flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border-2 border-white/20"
            >
              <X className="w-10 h-10 text-white/80" strokeWidth={3} />
            </div>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="gradient-eyebrow midnight-blue">
              <span className="text-style-tagline midnight-blue">Checkout cancelled</span>
            </div>
          </div>

          <h1 className="text-white mb-6">No charge was made.</h1>

          <p className="text-lg text-white/75 mb-10 leading-relaxed">
            You closed the checkout before finishing. Nothing was billed to your
            card. Pick another plan whenever you&apos;re ready, or get in touch if
            you&apos;d like to talk it through first.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/pricing" className="button-solid w-full sm:w-auto">
              Back to pricing
            </Link>
            <Link href="/contact" className="button-gradient-dark w-full sm:w-auto">
              Talk to us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
