"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

/* ─────────────────────────────────────────
   DATA  (exact text from Webflow HTML)
───────────────────────────────────────── */

const highlights = [
  { icon: "/images/Vector.svg",    text: "Local, secure computing environments" },
  { icon: "/images/monitoring.svg",text: "AI and automation deployed on-site" },
  { icon: "/images/apis.svg",      text: "Designed for reliability, control, and long-term trust" },
  { icon: "/images/network.svg",   text: "Zero trust access to data, devices and users" },
];

const capabilities = [
  {
    number: "01",
    title:  "Local Computing & Micro Data Centers",
    image:  "/images/freepik__the-style-is-candid-image-photography-with-natural__61738.jpeg",
    problem:
      "Many organizations still rely on centralized data centers or cloud platforms that are physically far from where data is generated. As video, sensor, and operational data volumes grow, this distance creates delays, higher costs, and increased risk. In critical environments, waiting seconds or minutes for data to travel back and forth is not acceptable.",
    solution:
      "Ten Sparrows designs and deploys micro data centers—compact, secure computing environments placed on-site or near operations. These systems process data locally, reduce reliance on constant connectivity, and provide a stable foundation for AI and analytics. This approach is often called edge computing. In practical terms, it means keeping critical intelligence closer to the people and systems that need it.",
    usedIn: [
      "Municipal facilities and city operations",
      "Utility substations and field sites",
      "Transportation hubs and roadways",
      "Healthcare facilities and campuses",
      "Industrial and infrastructure environments",
    ],
    itemClass: "content-item-1",
  },
  {
    number: "02",
    title:  "AI for Monitoring & Decision Support",
    image:  "/images/freepik__the-style-is-candid-image-photography-with-natural__61739.jpeg",
    problem:
      "Organizations are under pressure to \u201cuse AI,\u201d but many solutions are designed for centralized cloud environments and office use\u2014not field-deployed, bandwidth-constrained, or privacy-sensitive environments. Sending data off-site for analysis introduces latency, cost, and risk.",
    solution:
      "Ten Sparrows deploys AI models inside local computing environments so data can be analyzed where it is created. These models support monitoring, anomaly detection, predictive maintenance, and situational awareness\u2014without sending sensitive data off-site. Every deployment is configured for the specific environment, data types, and operational goals of the organization.",
    usedIn: [
      "Public safety and surveillance",
      "Utility and infrastructure monitoring",
      "Healthcare operational support",
      "Transportation and logistics",
      "Industrial automation",
    ],
    itemClass: "content-item-2",
  },
  {
    number: "03",
    title:  "Smart City & Public Safety Systems",
    image:  "/images/freepik__the-style-is-candid-image-photography-with-natural__61740.jpeg",
    problem:
      "Cities and public agencies face growing demands to improve safety, efficiency, and transparency\u2014often with aging infrastructure and limited resources. Many smart city solutions are fragmented, cloud-dependent, or difficult to govern responsibly.",
    solution:
      "Ten Sparrows builds integrated, locally deployed systems that support real-time awareness and coordinated response. By combining micro data centers with AI-enabled software, agencies can process data locally, apply clear rules, and maintain control over how technology is used.",
    usedIn: [
      "City operations centers",
      "Traffic and transportation management",
      "Public safety and emergency response",
      "Municipal infrastructure monitoring",
      "Smart campus environments",
    ],
    itemClass: "content-item-3",
  },
  {
    number: "04",
    title:  "Secure Data & Systems Integration",
    image:  "/images/freepik__the-style-is-candid-image-photography-with-natural__61741.jpeg",
    problem:
      "Most organizations already have many systems in place\u2014often from different vendors, built over many years. Poor integration can introduce security gaps, data inconsistencies, and operational friction\u2014especially as data volumes and compliance requirements grow.",
    solution:
      "Ten Sparrows designs integrations that respect system boundaries, security requirements, and operational workflows. By processing and routing data locally where appropriate, we reduce exposure while improving reliability and performance.",
    usedIn: [
      "Government and agency systems",
      "Utility and energy platforms",
      "Healthcare IT and operational systems",
      "Transportation and logistics systems",
      "Multi-vendor operational environments",
    ],
    itemClass: "content-item-4",
  },
  {
    number: "05",
    title:  "Custom Applications Built for the Field",
    image:  "/images/freepik__the-style-is-candid-image-photography-with-natural__61742.jpeg",
    problem:
      "Off-the-shelf software assumes ideal conditions\u2014constant connectivity, standardized workflows, and office-based users. Real operations involve field teams, inspectors, and operators who need tools that work in their actual environment, not a generic one.",
    solution:
      "Ten Sparrows designs and builds custom applications that integrate with local computing environments and offline use\u2014when existing tools fall short. Ten Sparrows designs and builds custom applications tailored to specific workflows, constraints, and users. These applications are shaped around real workflows, constraints, and users\u2014not generic templates.",
    usedIn: [
      "Field operations and inspections",
      "Dispatch and operations centers",
      "Infrastructure and maintenance crews",
      "Multi-vendor operational environments",
    ],
    itemClass: "content-item-5",
  },
];

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */

function HeroSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  return (
    <header
      className="section-header23 relative"
      style={{
        backgroundImage: "url('/images/Hero-insidepage.jpg')",
        backgroundPosition: "50%",
        backgroundSize: "cover",
        backgroundColor: "#001a2b",
        paddingBottom: "100px",
      }}
    >
      <div className="absolute inset-0 bg-[#001a2b]/60 pointer-events-none" />
      <div className="max-w-[80rem] mx-auto px-[5%] relative z-10">
        <div className="py-28 lg:py-36">
          <div ref={ref} className="text-center">
            {/* Eyebrow */}
            <div className={`mb-4 fade-up${inView ? " in-view" : ""}`}>
              <div className="gradient-eyebrow midnight-blue inline-block">
                <span className="text-style-tagline midnight-blue">What We Do</span>
              </div>
            </div>
            {/* H1 */}
            <div className="max-w-[60rem] mx-auto">
              <h1
                className={`text-white text-center fade-up${inView ? " in-view" : ""}`}
                style={{ transitionDelay: "100ms" }}
              >
                Capabilities designed for real operations
              </h1>
              {/* Description */}
              <p
                className={`mt-6 text-white/80 leading-relaxed fade-up${inView ? " in-view" : ""}`}
                style={{ fontSize: "1.125rem", transitionDelay: "200ms" }}
              >
                Ten Sparrows designs and deploys local computing environments and
                intelligent systems for organizations where performance,
                reliability, and control matter. We help teams process and act on
                data in real time, close to where decisions are made, without
                depending entirely on distant cloud infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────
   4-COLUMN HIGHLIGHTS
───────────────────────────────────────── */

function HighlightsGrid() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  return (
    <section className="bg-white">
      <div className="max-w-[80rem] mx-auto px-[5%]">
        <div className="py-12">
          <div
            ref={ref}
            className={`grid grid-cols-2 lg:grid-cols-4 gap-8 stagger-children${inView ? " in-view" : ""}`}
          >
            {highlights.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-6">
                  <Image
                    src={item.icon}
                    alt=""
                    width={47}
                    height={47}
                    className="rounded-none"
                  />
                </div>
                <p
                  className="text-[#001a2b]"
                  style={{ fontFamily: '"Open Sans", sans-serif', fontSize: "1.125rem", fontWeight: 400 }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   REALITY SECTION
───────────────────────────────────────── */

function RealitySection() {
  const { ref: leftRef, inView: leftInView }   = useInView<HTMLDivElement>();
  const { ref: rightRef, inView: rightInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  return (
    <section className="bg-white">
      <div className="max-w-[80rem] mx-auto px-[5%]">
        <div className="py-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left */}
            <div ref={leftRef}>
              <div className={`mb-4 fade-up${leftInView ? " in-view" : ""}`}>
                <div className="gradient-eyebrow inline-block">
                  <span className="text-style-tagline">The Reality</span>
                </div>
              </div>
              <h2
                className={`text-[#001a2b] fade-up${leftInView ? " in-view" : ""}`}
                style={{ transitionDelay: "100ms" }}
              >
                Data is growing faster than centralized cloud systems can handle
              </h2>
            </div>
            {/* Right */}
            <div ref={rightRef}>
              <p
                className={`text-[#001a2b]/80 leading-relaxed fade-up${rightInView ? " in-view" : ""}`}
                style={{ fontSize: "1.125rem", marginTop: "40px" }}
              >
                Organizations across government, infrastructure, utilities, and
                healthcare generate massive volumes of data from cameras, sensors,
                equipment, and operational systems. The challenge is no longer
                collection&mdash;it&rsquo;s processing data fast enough, safely
                enough, and close enough to where decisions are made.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CAPABILITIES HEADER
───────────────────────────────────────── */

function CapabilitiesHeader() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="bg-[#fcfbf9]">
      <div className="max-w-[80rem] mx-auto px-[5%]">
        <div className="pt-28 pb-16 text-center">
          <div ref={ref}>
            <div className={`mb-4 fade-up${inView ? " in-view" : ""}`}>
              <div className="gradient-eyebrow inline-block">
                <span className="text-style-tagline">Our Capabilities</span>
              </div>
            </div>
            <h2
              className={`text-[#001a2b] fade-up${inView ? " in-view" : ""}`}
              style={{ transitionDelay: "100ms" }}
            >
              How we build systems
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CAPABILITY CARD (sticky stacking)
───────────────────────────────────────── */

/*
  Webflow layout357 sticky stacking — PURE CSS, no JS.
  Desktop: position sticky with top offsets + negative margins for overlap.
  Tablet/mobile: position relative, no margins, all content always visible.
*/
const capDesktopStyle: Record<string, React.CSSProperties> = {
  "content-item-1": { top: 0, marginBottom: "12rem" },
  "content-item-2": { top: "4rem", marginTop: "-8rem", marginBottom: "8rem" },
  "content-item-3": { top: "8rem", marginTop: "-4rem", marginBottom: "4rem" },
  "content-item-4": { top: 0, marginBottom: "4rem" },
  "content-item-5": { top: "12rem" },
};

function CapabilityCard({ cap }: { cap: typeof capabilities[0] }) {
  const { ref: contentRef, inView: contentInView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  const subheadingStyle: React.CSSProperties = {
    fontFamily: "p22-underground, var(--font-archivo), sans-serif",
    fontSize: "1.375rem",
    fontWeight: 400,
    letterSpacing: "-1px",
    lineHeight: 1.4,
    color: "#001a2b",
    marginBottom: "0.5rem",
  };

  return (
    <>
      {/* ── DESKTOP (lg+): sticky card with full 2-column layout ── */}
      <div
        className="hidden lg:block sticky bg-[#fcfbf9] border-t border-[#05070726]"
        style={capDesktopStyle[cap.itemClass]}
      >
        <div className="max-w-[80rem] mx-auto px-[5%]">
          {/* Sticky bar */}
          <div className="flex items-center h-16 gap-6">
            <span style={{ fontFamily: '"Open Sans", sans-serif', fontSize: "1.125rem", color: "#001a2b", marginRight: "1.5rem", flexShrink: 0 }}>
              {cap.number}
            </span>
            <span style={{ fontFamily: '"Open Sans", sans-serif', fontSize: "1.125rem", color: "#001a2b" }}>
              {cap.title}
            </span>
          </div>

          {/* 2-column grid: text left, image right */}
          <div
            ref={contentRef}
            className={`grid grid-cols-2 items-center py-12 gap-20 fade-up${contentInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4">
              <div>
                <h6 style={subheadingStyle}>The Problem:</h6>
                <p style={{ fontSize: "0.875rem", color: "#050707cc", lineHeight: 1.6 }}>{cap.problem}</p>
              </div>
              <div>
                <h6 style={subheadingStyle}>Our Solution:</h6>
                <p style={{ fontSize: "0.875rem", color: "#050707cc", lineHeight: 1.6 }}>{cap.solution}</p>
              </div>
              <div>
                <h6 style={subheadingStyle}>Where It&apos;s Used:</h6>
                <div className="flex flex-col gap-1">
                  {cap.usedIn.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Image src="/images/coral-bullet.svg" alt="" width={8} height={8} className="shrink-0 rounded-none" />
                      <p style={{ fontSize: "0.875rem", color: "#050707cc", lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-hidden" style={{ borderRadius: "40px" }}>
              <Image src={cap.image} alt={cap.title} width={1200} height={900} loading="lazy" className="w-full object-cover rounded-none" style={{ height: "60vh" }} sizes="50vw" />
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE/TABLET (<lg): static card, single column, all visible ── */}
      <div className="lg:hidden bg-[#fcfbf9] border-t border-[#05070726] pb-8 sm:pb-14">
        <div className="max-w-[80rem] mx-auto px-[5%]">
          {/* Title bar */}
          <div className="flex items-center h-16 gap-4">
            <span style={{ fontFamily: '"Open Sans", sans-serif', fontSize: "1.125rem", color: "#001a2b", marginRight: "0.5rem", flexShrink: 0 }}>
              {cap.number}
            </span>
            <span style={{ fontFamily: '"Open Sans", sans-serif', fontSize: "1.125rem", color: "#001a2b" }}>
              {cap.title}
            </span>
          </div>

          {/* Content: text first, then image below */}
          <div className="flex flex-col gap-8 py-6">
            <div className="flex flex-col gap-4">
              <div>
                <h6 style={subheadingStyle}>The Problem:</h6>
                <p style={{ fontSize: "0.875rem", color: "#050707cc", lineHeight: 1.6 }}>{cap.problem}</p>
              </div>
              <div>
                <h6 style={subheadingStyle}>Our Solution:</h6>
                <p style={{ fontSize: "0.875rem", color: "#050707cc", lineHeight: 1.6 }}>{cap.solution}</p>
              </div>
              <div>
                <h6 style={subheadingStyle}>Where It&apos;s Used:</h6>
                <div className="flex flex-col gap-1">
                  {cap.usedIn.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Image src="/images/coral-bullet.svg" alt="" width={8} height={8} className="shrink-0 rounded-none" />
                      <p style={{ fontSize: "0.875rem", color: "#050707cc", lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Image — portrait on mobile, tall on tablet */}
            <div className="overflow-hidden rounded-3xl">
              <Image src={cap.image} alt={cap.title} width={1200} height={900} loading="lazy" className="w-full object-cover rounded-none" style={{ height: "30rem" }} sizes="100vw" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   CTA SECTION
───────────────────────────────────────── */

function CTASection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  return (
    <section
      className="relative"
      style={{
        backgroundImage: "url('/images/Hero.jpg')",
        backgroundPosition: "50%",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-[#001a2b]/80 pointer-events-none" />
      <div className="max-w-[80rem] mx-auto px-[5%] relative z-10">
        <div className="py-28 text-center">
          <div ref={ref} className="max-w-[60rem] mx-auto">
            {/* Eyebrow */}
            <div className={`mb-4 fade-up${inView ? " in-view" : ""}`}>
              <div className="gradient-eyebrow midnight-blue inline-block">
                <span className="text-style-tagline midnight-blue">How Engagement Starts</span>
              </div>
            </div>
            {/* H2 */}
            <h2
              className={`text-white mb-6 fade-up${inView ? " in-view" : ""}`}
              style={{ transitionDelay: "100ms" }}
            >
              A clear, low-risk path forward
            </h2>
            {/* Body */}
            <p
              className={`text-white/80 leading-relaxed mb-10 fade-up${inView ? " in-view" : ""}`}
              style={{ fontSize: "1.125rem", transitionDelay: "200ms" }}
            >
              Most Ten Sparrows engagements begin with an assessment or pilot.
              This allows systems to be tested in real conditions, validated with
              real users, and refined before broader deployment.
            </p>
            {/* Button — solid gradient fill */}
            <div className={`fade-up${inView ? " in-view" : ""}`} style={{ transitionDelay: "300ms" }}>
              <Link href="/contact" className="button-solid">
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */

export function WhatWeDoContent() {
  return (
    <>
      <HeroSection />
      <HighlightsGrid />
      <RealitySection />
      <CapabilitiesHeader />

      {/* Sticky stacking capabilities */}
      <div>
        {capabilities.map((cap) => (
          <CapabilityCard key={cap.number} cap={cap} />
        ))}
      </div>

      <CTASection />
    </>
  );
}
