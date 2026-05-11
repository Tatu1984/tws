import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  PRICING_PLANS,
  priceFor,
  type BillingInterval,
} from "@/lib/pricing";

export const runtime = "nodejs";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

const PRODUCT_LABEL: Record<string, string> = {
  pablo: "Pablo",
  "ts-edge-nest": "TS Edge Nest",
};

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY in .env.local." },
      { status: 500 }
    );
  }

  let body: { planId?: string; interval?: BillingInterval };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const planId = body.planId;
  if (!planId || !(planId in PRICING_PLANS)) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  const interval: BillingInterval = body.interval === "year" ? "year" : "month";

  const plan = PRICING_PLANS[planId];
  if (plan.monthlyUsd === 0) {
    return NextResponse.json(
      { error: "Free plan does not require checkout." },
      { status: 400 }
    );
  }

  const amount = priceFor(plan, interval);
  const origin = req.headers.get("origin") || new URL(req.url).origin;
  const intervalLabel = interval === "year" ? "yearly" : "monthly";
  const productLabel = PRODUCT_LABEL[plan.productId] ?? "Ten Sparrows";
  const perUnitSuffix = plan.perUser ? " per user" : "";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amount * 100,
            recurring: { interval },
            product_data: {
              name: `${productLabel} — ${plan.name}`,
              description: `${plan.name} plan, billed ${intervalLabel}${perUnitSuffix}.`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing/cancel`,
      allow_promotion_codes: true,
      metadata: { planId, productId: plan.productId, interval },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Stripe error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
