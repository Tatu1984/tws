export type ProductId = "pablo" | "ts-edge-nest";
export type BillingInterval = "month" | "year";

export type PricingPlan = {
  id: string;
  productId: ProductId;
  name: string;
  // Base monthly price (USD). For plans that have a different per-month price
  // when billed annually, yearlyMonthlyUsd captures that.
  monthlyUsd: number;
  // Optional per-month price when billed yearly. If omitted, the default
  // 10-months-billed rule is used (i.e. 2 months free).
  yearlyMonthlyUsd?: number;
  // Optional one-time / recurring add-on note (e.g. "+$250 infrastructure fee
  // per organization"). Shown under the price; not added to checkout amount.
  infraFeeNote?: string;
  // Whether the price unit is per user (TS Edge Nest) or flat (Pablo).
  perUser?: boolean;
};

// Pablo product plans (the existing Ten Sparrows operations product).
export const PABLO_PLANS: Record<string, PricingPlan> = {
  free: { id: "free", productId: "pablo", name: "Free", monthlyUsd: 0 },
  starter: { id: "starter", productId: "pablo", name: "Starter", monthlyUsd: 22 },
  worker: { id: "worker", productId: "pablo", name: "Worker", monthlyUsd: 88 },
  assistant: { id: "assistant", productId: "pablo", name: "Assistant", monthlyUsd: 110 },
};

// TS Edge Nest product plans.
export const TS_EDGE_NEST_PLANS: Record<string, PricingPlan> = {
  "edge-free": {
    id: "edge-free",
    productId: "ts-edge-nest",
    name: "Free",
    monthlyUsd: 0,
    perUser: true,
  },
  "edge-plus": {
    id: "edge-plus",
    productId: "ts-edge-nest",
    name: "Plus",
    monthlyUsd: 25,
    yearlyMonthlyUsd: 20,
    perUser: true,
  },
  "edge-professional": {
    id: "edge-professional",
    productId: "ts-edge-nest",
    name: "Professional",
    monthlyUsd: 20,
    infraFeeNote: "+$250 infrastructure fee per organization",
    perUser: true,
  },
  "edge-enterprise": {
    id: "edge-enterprise",
    productId: "ts-edge-nest",
    name: "Enterprise",
    monthlyUsd: 40,
    infraFeeNote: "+$250 infrastructure fee per organization",
    perUser: true,
  },
};

export const PRICING_PLANS: Record<string, PricingPlan> = {
  ...PABLO_PLANS,
  ...TS_EDGE_NEST_PLANS,
};

// Default annual rule for plans that don't override it: 10 × monthly (2 months free).
export const ANNUAL_MONTHS_BILLED = 10;

export function priceFor(plan: PricingPlan, interval: BillingInterval): number {
  if (interval === "year") {
    if (plan.yearlyMonthlyUsd !== undefined) {
      return plan.yearlyMonthlyUsd * 12;
    }
    return plan.monthlyUsd * ANNUAL_MONTHS_BILLED;
  }
  return plan.monthlyUsd;
}

export function annualSavings(plan: PricingPlan): number {
  const yearlyTotal = priceFor(plan, "year");
  return plan.monthlyUsd * 12 - yearlyTotal;
}
