import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment successful | Ten Sparrows',
};

type SearchParams = Promise<{ session_id?: string }>;

export default async function PricingSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { session_id } = await searchParams;

  return (
    <>
      <Header />
      <main
        className="relative bg-[#001a2b] bg-cover bg-center pt-32 lg:pt-40 pb-24 lg:pb-32 min-h-[calc(100vh-5rem)]"
        style={{ backgroundImage: "url('/images/Hero-insidepage.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#001a2b]/70 pointer-events-none" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Success icon */}
          <div className="flex justify-center mb-8">
            <div
              className="flex items-center justify-center w-20 h-20 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #e57368 0%, #f3b44a 100%)',
                boxShadow: '0 10px 30px rgba(243, 180, 74, 0.3)',
              }}
            >
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="gradient-eyebrow midnight-blue">
              <span className="text-style-tagline midnight-blue">Payment confirmed</span>
            </div>
          </div>

          <h1 className="text-white mb-6">Thank you — your subscription is active.</h1>

          <p className="text-lg text-white/75 mb-10 leading-relaxed">
            We&apos;ve received your payment in Stripe&apos;s test environment. A receipt
            has been sent to the email you used at checkout, and you can start
            using your plan right away.
          </p>

          {session_id && (
            <p className="text-xs text-white/40 mb-10 font-mono break-all px-4">
              Reference: {session_id}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/" className="button-solid w-full sm:w-auto">
              Back to home
            </Link>
            <Link href="/pricing" className="button-gradient-dark w-full sm:w-auto">
              View plans
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
