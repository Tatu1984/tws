"use client";

import Script from "next/script";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "pricing-table-id"?: string;
        "publishable-key"?: string;
        "client-reference-id"?: string;
        "customer-email"?: string;
      };
    }
  }
}

type StripePricingTableProps = {
  pricingTableId: string | undefined;
  publishableKey: string | undefined;
  clientReferenceId?: string;
};

export function StripePricingTable({
  pricingTableId,
  publishableKey,
  clientReferenceId,
}: StripePricingTableProps) {
  if (!pricingTableId || !publishableKey) {
    return (
      <div className="max-w-2xl mx-auto rounded-2xl border border-black/10 bg-white p-8 text-center shadow-[0_2px_11px_rgba(161,161,161,0.15)]">
        <h3 className="text-lg font-semibold text-[#001a2b] mb-2">
          Checkout is not configured yet
        </h3>
        <p className="text-sm text-[#001a2b]/70">
          The Stripe Pricing Table for this product hasn&apos;t been wired up.
          Set the relevant environment variables to enable checkout.
        </p>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://js.stripe.com/v3/pricing-table.js"
        strategy="afterInteractive"
      />
      <stripe-pricing-table
        pricing-table-id={pricingTableId}
        publishable-key={publishableKey}
        client-reference-id={clientReferenceId}
      />
    </>
  );
}
