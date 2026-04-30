export type PlanId = "free" | "starter" | "worker" | "assistant";

export type PricingPlan = {
  id: PlanId;
  name: string;
  priceUsd: number;
};

export const PRICING_PLANS: Record<PlanId, PricingPlan> = {
  free: { id: "free", name: "Free", priceUsd: 0 },
  starter: { id: "starter", name: "Starter", priceUsd: 22 },
  worker: { id: "worker", name: "Worker", priceUsd: 88 },
  assistant: { id: "assistant", name: "Assistant", priceUsd: 110 },
};
