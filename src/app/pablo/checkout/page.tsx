import { Header, Footer } from "@/components/layout";
import { StripePricingTable } from "@/components/stripe/StripePricingTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pablo Checkout | Ten Sparrows",
  description:
    "Choose monthly, yearly, or 2-year billing for your Pablo plan.",
};

export default function PabloCheckoutPage() {
  return (
    <>
      <Header />
      <main className="off-white-background pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-[#001a2b] mb-4">Choose your Pablo plan</h1>
            <p className="text-base text-[#001a2b]/70 max-w-2xl mx-auto">
              Pick a plan and a billing cycle. Monthly, yearly, and 2-year
              options are shown below with their respective prices.
            </p>
          </div>
          <StripePricingTable
            pricingTableId={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID_PABLO}
            publishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
