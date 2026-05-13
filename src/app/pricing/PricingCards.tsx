"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import {
  PABLO_PLANS,
  TS_EDGE_NEST_PLANS,
  type PricingPlan,
  type ProductId,
} from "@/lib/pricing";

type PlanFeature = { title: string; description?: string };

type CardPlan = {
  id: string;
  name: string;
  tagline: string;
  ctaLabel: string;
  features: PlanFeature[];
  featuresLeadIn?: string;
};

type Product = {
  id: ProductId;
  label: string;
  intro: string;
  plans: CardPlan[];
};

const PABLO_PRODUCT: Product = {
  id: "pablo",
  label: "Pablo",
  intro: "Operations and AI assistance for teams that ship real systems.",
  plans: [
    {
      id: "free",
      name: "Free",
      tagline: "Get a feel for how Ten Sparrows fits your workflow.",
      ctaLabel: "Get started",
      features: [
        { title: "1 active project" },
        { title: "Community support" },
        { title: "Basic monitoring dashboards" },
        { title: "Up to 2 team members" },
      ],
    },
    {
      id: "starter",
      name: "Starter",
      tagline: "For small teams shipping their first real workloads.",
      ctaLabel: "Choose Starter",
      features: [
        { title: "Up to 10 active projects" },
        { title: "Email support, 24h response" },
        { title: "Standard monitoring + alerts" },
        { title: "Up to 10 team members" },
        { title: "Daily backups" },
      ],
    },
    {
      id: "worker",
      name: "Worker",
      tagline: "Built for production teams who run real systems.",
      ctaLabel: "Choose Worker",
      features: [
        { title: "Unlimited projects" },
        { title: "Priority support, 4h response" },
        { title: "Advanced metrics & log retention" },
        { title: "Unlimited team members" },
        { title: "Hourly backups" },
        { title: "Single sign-on (SSO)" },
      ],
    },
    {
      id: "assistant",
      name: "Assistant",
      tagline: "AI-assisted operations layered on top of Worker.",
      ctaLabel: "Choose Assistant",
      features: [
        { title: "Everything in Worker" },
        { title: "AI agents for monitoring & triage" },
        { title: "Automated incident summaries" },
        { title: "Custom workflows & integrations" },
        { title: "Dedicated success engineer" },
      ],
    },
  ],
};

const TS_EDGE_NEST_PRODUCT: Product = {
  id: "ts-edge-nest",
  label: "TS Edge Nest",
  intro: "AI-native workspace for everyday work, collaboration, and enterprise scale.",
  plans: [
    {
      id: "edge-free",
      name: "Free",
      tagline: "Free for everyone.",
      ctaLabel: "Try Edge Nest for free",
      featuresLeadIn: "Allows you to:",
      features: [
        {
          title: "Chat about any topic or task",
          description: "your AI assistant for everyday work",
        },
        {
          title: "Research anything in depth",
          description: "analysis and reports",
        },
        {
          title: "Automate the repetitive stuff",
          description: "Flows that handle your daily busywork",
        },
        {
          title: "Turn ideas into real apps",
          description: "production-ready web apps in minutes",
        },
        {
          title: "Turn conversations into deliverables",
          description: "create docs, sheets, decks, and apps",
        },
        {
          title: "Connect the tools you already use",
          description: "Slack, Microsoft 365, Google Workspace, QuickBooks, and more",
        },
      ],
    },
    {
      id: "edge-plus",
      name: "Plus",
      tagline: "For teams up to 300 who need collaboration and user management.",
      ctaLabel: "Choose Plus",
      featuresLeadIn: "Everything in Free, and:",
      features: [
        {
          title: "Edge on your desktop",
          description: "proactive AI across email, messaging and local files",
        },
        {
          title: "Shared Spaces for your team",
          description: "knowledge, agents, and automations that compound across people",
        },
        {
          title: "Edge works where you work",
          description: "browsers and Microsoft 365 extensions",
        },
        {
          title: "Scale when you're ready",
          description: "user management, centralized billing, up to 300 users, 10 GB storage per seat",
        },
      ],
    },
    {
      id: "edge-professional",
      name: "Professional",
      tagline: "For organizations requiring advanced governance & controls at any scale.",
      ctaLabel: "Choose Professional",
      featuresLeadIn: "Everything in Plus, and:",
      features: [
        {
          title: "Grow without limits",
          description: "unlimited user scaling so your whole org can get on board",
        },
        {
          title: "Enterprise governance and compliance",
          description: "RBAC, SSO, data sovereignty, and admin controls",
        },
        {
          title: "See the big picture instantly",
          description: "dashboards and data visualizations that surface what matters",
        },
        {
          title: "Automate complex processes",
          description: "human-in-the-loop orchestration across UIs, APIs, and teams",
        },
        {
          title: "Support when you need it",
          description: "24/7 priority support",
        },
        { title: "25 GB pooled storage per user" },
      ],
    },
    {
      id: "edge-enterprise",
      name: "Enterprise",
      tagline: "For teams who author the insights and automations their enterprise runs on.",
      ctaLabel: "Choose Enterprise",
      featuresLeadIn: "Everything in Professional, and:",
      features: [
        {
          title: "Author dashboards your way",
          description: "custom dashboard creation tailored to your business",
        },
        {
          title: "Certify and publish assets",
          description: "so your team always works from one source of truth",
        },
        { title: "50 GB pooled storage per user" },
      ],
    },
  ],
};

const PRODUCT_LOOKUP: Record<ProductId, Product> = {
  pablo: PABLO_PRODUCT,
  "ts-edge-nest": TS_EDGE_NEST_PRODUCT,
};

const PLAN_LOOKUP: Record<ProductId, Record<string, PricingPlan>> = {
  pablo: PABLO_PLANS,
  "ts-edge-nest": TS_EDGE_NEST_PLANS,
};

const CHECKOUT_PATH: Record<ProductId, string> = {
  pablo: "/pablo/checkout",
  "ts-edge-nest": "/ts-edge-nest/checkout",
};

type PricingCardsProps = {
  productId: ProductId;
};

export function PricingCards({ productId }: PricingCardsProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeProduct = PRODUCT_LOOKUP[productId];
  const planLookup = PLAN_LOOKUP[productId];
  const checkoutHref = CHECKOUT_PATH[productId];

  function handleEnter(id: string) {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setHoveredId(id);
  }

  function handleLeave() {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setHoveredId(null);
      leaveTimerRef.current = null;
    }, 120);
  }

  return (
    <section className="off-white-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-[#001a2b]/65 max-w-2xl mx-auto mb-10">
          {activeProduct.intro}
        </p>

        <p className="text-center text-xs text-[#001a2b]/55 max-w-2xl mx-auto mb-12">
          Prices shown monthly. Choose monthly, yearly, or 2-year billing at checkout.
        </p>

        <div
          ref={ref}
          key={activeProduct.id}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 stagger-children${inView ? " in-view" : ""}`}
        >
          {activeProduct.plans.map((card) => {
            const plan = planLookup[card.id];
            if (!plan) return null;
            const isActive = hoveredId === card.id;
            const priceUnit = plan.perUser ? "/user/mo" : "/mo";

            return (
              <div
                key={card.id}
                onMouseEnter={() => handleEnter(card.id)}
                onMouseLeave={handleLeave}
                onFocus={() => handleEnter(card.id)}
                onBlur={handleLeave}
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
                  {card.name}
                </h3>

                <div className="mb-1 flex items-baseline gap-1">
                  <span
                    className={`text-5xl font-bold ${isActive ? "text-white" : "text-[#001a2b]"}`}
                    style={{ fontFamily: 'p22-underground, var(--font-archivo), sans-serif', letterSpacing: '-1px' }}
                  >
                    ${plan.monthlyUsd.toLocaleString()}
                  </span>
                  <span className={`text-sm ${isActive ? "text-white/60" : "text-black/50"}`}>
                    {priceUnit}
                  </span>
                </div>

                <div className="min-h-[1.25rem] mb-3 text-xs">
                  {plan.infraFeeNote ? (
                    <span className={`italic ${isActive ? "text-white/70" : "text-black/60"}`}>
                      {plan.infraFeeNote}
                    </span>
                  ) : (
                    <span aria-hidden="true">&nbsp;</span>
                  )}
                </div>

                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    isActive ? "text-white/75" : "text-black/65"
                  }`}
                >
                  {card.tagline}
                </p>

                {card.featuresLeadIn && (
                  <p
                    className={`text-[11px] font-bold uppercase tracking-wider mb-3 ${
                      isActive ? "text-white/60" : "text-[#001a2b]/55"
                    }`}
                  >
                    {card.featuresLeadIn}
                  </p>
                )}

                <ul className="space-y-3 mb-8 grow">
                  {card.features.map((feature) => (
                    <li key={feature.title} className="flex items-start gap-3 text-sm">
                      <Check
                        className={`h-4 w-4 mt-0.5 shrink-0 ${
                          isActive ? "text-[#f3b44a]" : "text-[#e57368]"
                        }`}
                        strokeWidth={3}
                      />
                      <span className={isActive ? "text-white/85" : "text-[#001a2b]/85"}>
                        <span className="font-semibold">{feature.title}</span>
                        {feature.description && (
                          <span className={isActive ? "text-white/70" : "text-[#001a2b]/70"}>
                            {" — "}
                            {feature.description}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={checkoutHref}
                  className={`block w-full text-center rounded-full py-3 px-6 text-base font-medium border-2 transition-colors duration-300 ${
                    isActive
                      ? "border-transparent text-white bg-[linear-gradient(135deg,#e57368_20%,#f3b44a)]"
                      : "border-[#001a2b] text-[#001a2b] bg-transparent"
                  }`}
                >
                  {card.ctaLabel}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
