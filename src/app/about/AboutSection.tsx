"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";

export function AboutSection() {
  const { ref: eyebrowRef, inView: eyebrowInView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const textRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert?: () => void } = {};

    const initGsap = async () => {
      const [{ gsap }, { ScrollTrigger }, { default: SplitType }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("split-type"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      if (!textRef.current || !sectionRef.current) return;

      const split = new SplitType(textRef.current, { types: "words" });

      const isMobile = window.innerWidth <= 767;
      const startValue = isMobile ? "top 35%" : "top center";
      const endValue = isMobile ? "bottom 90%" : "bottom center";

      const tl = gsap.timeline();

      tl.from(split.words, {
        opacity: 0.25,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: startValue,
          end: endValue,
          scrub: 2,
        },
      });

      ctx = { revert: () => { split.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); } };
    };

    initGsap();

    return () => {
      if (ctx.revert) ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="off-white-background py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={eyebrowRef} className={`mb-6 fade-up${eyebrowInView ? " in-view" : ""}`}>
            <div className="gradient-eyebrow inline-block">
              <span className="text-style-tagline">About</span>
            </div>
          </div>
          <h2
            ref={textRef}
            className="text-2xl sm:text-3xl lg:text-4xl text-justify text-color-midnight leading-snug font-light"
            style={{ letterSpacing: "-0.1rem" }}
          >
            We started Ten Sparrows after seeing too many capable teams held
            back by systems that were powerful but hard to run. Things were
            overcomplicated, fragile, and understood by only a few people. By
            focusing on micro data centers, we bring technology closer to the
            people using it—so it&apos;s clear, dependable, and built to
            support real work, every day.
          </h2>
        </div>
      </div>
    </section>
  );
}
