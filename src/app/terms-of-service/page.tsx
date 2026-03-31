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
        <section className="bg-[#001a2b] pt-32 lg:pt-40 pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={heroRef} className="max-w-3xl mx-auto text-center">
              <h1
                className={`text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight fade-up${heroInView ? " in-view" : ""}`}
              >
                Terms of Service
              </h1>
              <p
                className={`text-lg text-white/70 fade-up${heroInView ? " in-view" : ""}`}
                style={{ transitionDelay: "100ms" }}
              >
                Last updated: January 2025
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fcfbf9] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              ref={bodyRef}
              className={`max-w-3xl mx-auto prose prose-lg fade-up${bodyInView ? " in-view" : ""}`}
            >
              <h2 className="text-2xl font-bold text-[#001a2b] mb-4">Acceptance of Terms</h2>
              <p className="text-[#050707]/80 mb-6">
                By accessing and using the Ten Sparrows website and services,
                you accept and agree to be bound by these Terms of Service.
              </p>

              <h2 className="text-2xl font-bold text-[#001a2b] mb-4 mt-8">Use of Services</h2>
              <p className="text-[#050707]/80 mb-6">
                Our services are provided for informational and business
                purposes. You agree to use our services only for lawful purposes
                and in accordance with these terms.
              </p>

              <h2 className="text-2xl font-bold text-[#001a2b] mb-4 mt-8">Intellectual Property</h2>
              <p className="text-[#050707]/80 mb-6">
                All content, features, and functionality on our website are
                owned by Ten Sparrows and are protected by intellectual property
                laws.
              </p>

              <h2 className="text-2xl font-bold text-[#001a2b] mb-4 mt-8">Limitation of Liability</h2>
              <p className="text-[#050707]/80 mb-6">
                Ten Sparrows shall not be liable for any indirect, incidental,
                special, or consequential damages arising from your use of our
                services.
              </p>

              <h2 className="text-2xl font-bold text-[#001a2b] mb-4 mt-8">Changes to Terms</h2>
              <p className="text-[#050707]/80 mb-6">
                We reserve the right to modify these terms at any time.
                Continued use of our services after changes constitutes
                acceptance of the modified terms.
              </p>

              <h2 className="text-2xl font-bold text-[#001a2b] mb-4 mt-8">Contact Us</h2>
              <p className="text-[#050707]/80 mb-6">
                If you have questions about these Terms of Service, please
                contact us at{" "}
                <a href="mailto:info@tensparrows.com" className="text-[#e57368] hover:underline">
                  info@tensparrows.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
