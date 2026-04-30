export type PlanId = "free" | "starter" | "worker" | "assistant";
export type BillingInterval = "month" | "year";

export type PricingPlan = {
  id: PlanId;
  name: string;
  monthlyUsd: number;
};

export const PRICING_PLANS: Record<PlanId, PricingPlan> = {
  free: { id: "free", name: "Free", monthlyUsd: 0 },
  starter: { id: "starter", name: "Starter", monthlyUsd: 22 },
  worker: { id: "worker", name: "Worker", monthlyUsd: 88 },
  assistant: { id: "assistant", name: "Assistant", monthlyUsd: 110 },
};

// Annual pricing = 10 × monthly (2 months free).
export const ANNUAL_MONTHS_BILLED = 10;

export function priceFor(plan: PricingPlan, interval: BillingInterval): number {
  return interval === "year" ? plan.monthlyUsd * ANNUAL_MONTHS_BILLED : plan.monthlyUsd;
}

export function annualSavings(plan: PricingPlan): number {
  return plan.monthlyUsd * (12 - ANNUAL_MONTHS_BILLED);
}
