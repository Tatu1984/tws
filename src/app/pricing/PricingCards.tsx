"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useInView } from "@/hooks/useInView";

type PlanId = "free" | "starter" | "worker" | "assistant";

type PricingPlan = {
  id: PlanId;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  ctaLabel: string;
};

const DEFAULT_HIGHLIGHT_ID: PlanId = "worker";

const plans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    tagline: "Get a feel for how Ten Sparrows fits your workflow.",
    features: [
      "1 active project",
      "Community support",
      "Basic monitoring dashboards",
      "Up to 2 team members",
    ],
    ctaLabel: "Get started",
  },
  {
    id: "starter",
    name: "Starter",
    price: 22,
    tagline: "For small teams shipping their first real workloads.",
    features: [
      "Up to 10 active projects",
      "Email support, 24h response",
      "Standard monitoring + alerts",
      "Up to 10 team members",
      "Daily backups",
    ],
    ctaLabel: "Choose Starter",
  },
  {
    id: "worker",
    name: "Worker",
    price: 88,
    tagline: "Built for production teams who run real systems.",
    features: [
      "Unlimited projects",
      "Priority support, 4h response",
      "Advanced metrics & log retention",
      "Unlimited team members",
      "Hourly backups",
      "Single sign-on (SSO)",
    ],
    ctaLabel: "Choose Worker",
  },
  {
    id: "assistant",
    name: "Assistant",
    price: 110,
    tagline: "AI-assisted operations layered on top of Worker.",
    features: [
      "Everything in Worker",
      "AI agents for monitoring & triage",
      "Automated incident summaries",
      "Custom workflows & integrations",
      "Dedicated success engineer",
    ],
    ctaLabel: "Choose Assistant",
  },
];

export function PricingCards() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<PlanId | null>(null);

  const activeId: PlanId = hoveredId ?? DEFAULT_HIGHLIGHT_ID;

  async function handleSelect(plan: PricingPlan) {
    if (plan.price === 0) {
      toast.success("You're on the Free plan — no checkout needed.");
      return;
    }

    try {
      setLoadingId(plan.id);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      });

      const data: { url?: string; error?: string } = await res.json();

      if (!res.ok || !data.url) {
        toast.error(data.error || "Could not start checkout. Please try again.");
        return;
      }

      window.location.href = data.url;
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <section className="off-white-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 stagger-children${inView ? " in-view" : ""}`}
        >
          {plans.map((plan) => {
            const isLoading = loadingId === plan.id;
            const isActive = activeId === plan.id;

            return (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredId(plan.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(plan.id)}
                onBlur={() => setHoveredId(null)}
                tabIndex={0}
                className={`flex flex-col h-full rounded-2xl p-8 border cursor-pointer outline-none transition-[background-color,color,box-shadow,border-color] duration-300 ${
                  isActive
                    ? "bg-[#001a2b] text-white border-[#f3b44a] shadow-[0_12px_36px_rgba(0,26,43,0.28)]"
                    : "bg-white text-[#001a2b] border-black/5 shadow-[0_2px_11px_rgba(161,161,161,0.15)]"
                }`}
              >
                <h3
                  className={`text-2xl font-semibold mb-2 ${
                    isActive ? "text-white" : "text-[#001a2b]"
                  }`}
                  style={{ fontFamily: 'p22-underground, var(--font-archivo), sans-serif', letterSpacing: '-0.5px' }}
                >
                  {plan.name}
                </h3>

                <div className="mb-4 flex items-baseline gap-1">
                  <span
                    className={`text-5xl font-bold ${isActive ? "text-white" : "text-[#001a2b]"}`}
                    style={{ fontFamily: 'p22-underground, var(--font-archivo), sans-serif', letterSpacing: '-1px' }}
                  >
                    ${plan.price}
                  </span>
                  <span className={`text-sm ${isActive ? "text-white/60" : "text-black/50"}`}>
                    /mo
                  </span>
                </div>

                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    isActive ? "text-white/75" : "text-black/65"
                  }`}
                >
                  {plan.tagline}
                </p>

                <ul className="space-y-3 mb-8 grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        className={`h-4 w-4 mt-0.5 shrink-0 ${
                          isActive ? "text-[#f3b44a]" : "text-[#e57368]"
                        }`}
                        strokeWidth={3}
                      />
                      <span className={isActive ? "text-white/85" : "text-[#001a2b]/85"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleSelect(plan)}
                  disabled={isLoading}
                  className={`w-full ${
                    isActive ? "button-solid" : "button-gradient"
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {isLoading ? "Redirecting…" : plan.ctaLabel}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-black/50 mt-10">
          Payments are processed in Stripe test mode. Use card{" "}
          <span className="font-mono">4242 4242 4242 4242</span>, any future expiry, any CVC.
        </p>
      </div>
    </section>
  );
}
