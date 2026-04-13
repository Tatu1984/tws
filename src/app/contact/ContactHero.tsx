"use client";

import { useInView } from "@/hooks/useInView";

export function ContactHero() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <header className="off-white-background">
      {/* padding-global: 5% sides; padding-section-large no-bottom-margin: pt-[7rem] pb-0 */}
      <div className="px-[5%] pt-[calc(7rem+80px)] pb-0">
        <div className="w-full max-w-[80rem] mx-auto">
          <div ref={ref} className="w-full max-w-[60rem] mx-auto text-center pb-28">
            {/* margin-bottom margin-xsmall = 1rem */}
            <div className={`mb-4 fade-up${inView ? " in-view" : ""}`}>
              <div className="gradient-eyebrow inline-block">
                <span className="text-style-tagline">Connect</span>
              </div>
            </div>
            {/* margin-bottom margin-small = 1.5rem */}
            <h1
              className={`text-color-midnight mb-6 fade-up${inView ? " in-view" : ""}`}
              style={{ transitionDelay: "100ms" }}
            >
              Let&apos;s Start the Conversation
            </h1>
            {/* text-size-medium: 1.125rem, font-weight 400 */}
            <p
              className={`text-[1.125rem] text-[#050707]/80 leading-relaxed font-normal fade-up${inView ? " in-view" : ""}`}
              style={{ transitionDelay: "200ms" }}
            >
              We&apos;re here to listen, collaborate, and help you explore what&apos;s
              possible. Either book a call with us or fill out the form and someone
              from our team will reach out.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
