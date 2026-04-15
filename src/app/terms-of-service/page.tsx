"use client";

import { Header, Footer } from "@/components/layout";
import { useInView } from "@/hooks/useInView";

export default function TermsOfServicePage() {
  const { ref: heroRef, inView: heroInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: bodyRef, inView: bodyInView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <>
      <Header />
      <main>
        {/* Hero — matches other inside-page heroes */}
        <header className="off-white-background">
          <div className="px-[5%] pt-[calc(7rem+80px)] pb-0">
            <div className="w-full max-w-7xl mx-auto">
              <div ref={heroRef} className="w-full max-w-240 mx-auto text-center pb-16">
                <div className={`mb-4 fade-up${heroInView ? " in-view" : ""}`}>
                  <div className="gradient-eyebrow inline-block">
                    <span className="text-style-tagline">Legal</span>
                  </div>
                </div>
                <h1
                  className={`text-color-midnight mb-4 fade-up${heroInView ? " in-view" : ""}`}
                  style={{ transitionDelay: "100ms" }}
                >
                  Terms of Service
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
        <section className="off-white-background px-[5%] py-28">
          <div className="w-full max-w-7xl mx-auto">
            <div
              ref={bodyRef}
              className={`max-w-3xl mx-auto fade-up${bodyInView ? " in-view" : ""}`}
            >
              <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed mb-10">
                Welcome to Ten Sparrows. By accessing or using this website, you agree to the following terms.
              </p>

              <div className="space-y-10">

                <div>
                  <h2 className="text-color-midnight mb-4" style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.4 }}>
                    Use of the Website
                  </h2>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed">
                    This website is provided for informational purposes only. You agree to use the site
                    lawfully and not in a way that could harm, disable, or interfere with its operation.
                  </p>
                </div>

                <div>
                  <h2 className="text-color-midnight mb-4" style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.4 }}>
                    No Professional Guarantees
                  </h2>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed">
                    Information on this site is provided &ldquo;as is&rdquo; and does not constitute professional,
                    technical, or legal advice. We make no guarantees regarding outcomes or results.
                  </p>
                </div>

                <div>
                  <h2 className="text-color-midnight mb-4" style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.4 }}>
                    Intellectual Property
                  </h2>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed">
                    All content on this website—including text, graphics, and branding—is the property
                    of Ten Sparrows unless otherwise noted. You may not copy, reproduce, or distribute
                    content without permission.
                  </p>
                </div>

                <div>
                  <h2 className="text-color-midnight mb-4" style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.4 }}>
                    Limitation of Liability
                  </h2>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed">
                    Ten Sparrows is not liable for any damages arising from the use of, or inability
                    to use, this website.
                  </p>
                </div>

                <div>
                  <h2 className="text-color-midnight mb-4" style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.4 }}>
                    Third-Party Links
                  </h2>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed">
                    This site may contain links to third-party websites. We are not responsible for
                    their content or practices.
                  </p>
                </div>

                <div>
                  <h2 className="text-color-midnight mb-4" style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.4 }}>
                    Changes to These Terms
                  </h2>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed">
                    We may update these Terms of Service at any time. Continued use of the site
                    constitutes acceptance of any changes.
                  </p>
                </div>

                <div>
                  <h2 className="text-color-midnight mb-4" style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.4 }}>
                    Contact
                  </h2>
                  <p className="text-[1.125rem] text-[#050707]/80 leading-relaxed">
                    Questions regarding these terms can be sent to:{" "}
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
