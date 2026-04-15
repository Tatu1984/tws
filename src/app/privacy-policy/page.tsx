"use client";

import { Header, Footer } from "@/components/layout";
import { useInView } from "@/hooks/useInView";

export default function PrivacyPolicyPage() {
  const { ref: heroRef, inView: heroInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: bodyRef, inView: bodyInView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <>
      <Header />
      <main>
        {/* Hero — matches other inside-page heroes */}
        <header className="off-white-background">
          <div className="px-[5%] pt-[calc(7rem+80px)] pb-0">
            <div className="w-full max-w-[80rem] mx-auto">
              <div ref={heroRef} className="w-full max-w-[60rem] mx-auto text-center pb-16">
                <div className={`mb-4 fade-up${heroInView ? " in-view" : ""}`}>
                  <div className="gradient-eyebrow inline-block">
                    <span className="text-style-tagline">Legal</span>
                  </div>
                </div>
                <h1
                  className={`text-color-midnight mb-4 fade-up${heroInView ? " in-view" : ""}`}
                  style={{ transitionDelay: "100ms" }}
                >
                  Privacy Policy
                </h1>
                <p
                  className={`text-[1.125rem] text-[#050707]/60 font-normal fade-up${heroInView ? " in-view" : ""}`}
                  style={{ transitionDelay: "200ms" }}
                >
                  Effective Date: December 22, 2025
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <section className="off-white-background px-[5%] py-[7rem]">
          <div className="w-full max-w-[80rem] mx-auto">
            <div
              ref={bodyRef}
              className={`max-w-[48rem] mx-auto fade-up${bodyInView ? " in-view" : ""}`}
            >
              <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed mb-10">
                Ten Sparrows (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the website tensparrows.com (the &ldquo;Site&rdquo;).
                This Privacy Policy explains how we collect, use, and protect your information.
              </p>

              <div className="space-y-10">

                <div>
                  <h2 className="text-color-midnight mb-4" style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.4 }}>
                    Information We Collect
                  </h2>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed mb-4">
                    We collect only the information you choose to provide to us, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-[1.125rem] text-[#050707]/80 leading-relaxed mb-4">
                    <li>Name and email address submitted through our contact form</li>
                  </ul>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed mb-2">We do not:</p>
                  <ul className="list-disc pl-6 space-y-2 text-[1.125rem] text-[#050707]/80 leading-relaxed">
                    <li>Use analytics or tracking tools</li>
                    <li>Process payments</li>
                    <li>Collect sensitive personal data</li>
                    <li>Collect information from children under 13</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-color-midnight mb-4" style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.4 }}>
                    How We Use Your Information
                  </h2>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed mb-4">
                    We use the information you provide solely to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-[1.125rem] text-[#050707]/80 leading-relaxed mb-4">
                    <li>Respond to inquiries</li>
                    <li>Communicate directly with you regarding your request</li>
                  </ul>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed">
                    We do not sell, rent, or share your information with third parties.
                  </p>
                </div>

                <div>
                  <h2 className="text-color-midnight mb-4" style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.4 }}>
                    Cookies
                  </h2>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed">
                    At this time, we do not intentionally use cookies for tracking or analytics purposes.
                    Some basic cookies may be used by the website platform to ensure proper site functionality.
                  </p>
                </div>

                <div>
                  <h2 className="text-color-midnight mb-4" style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.4 }}>
                    Data Security
                  </h2>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed">
                    We take reasonable steps to protect your information, but no method of transmission
                    over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h2 className="text-color-midnight mb-4" style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.4 }}>
                    Children&apos;s Privacy
                  </h2>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed">
                    This website is not directed toward children under the age of 13, and we do not
                    knowingly collect personal information from children.
                  </p>
                </div>

                <div>
                  <h2 className="text-color-midnight mb-4" style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.4 }}>
                    Contact Us
                  </h2>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed">
                    If you have questions about this Privacy Policy, contact us at:{" "}
                    <a href="mailto:info@tensparrows.com" className="text-[#e57368] hover:underline">
                      info@tensparrows.com
                    </a>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
