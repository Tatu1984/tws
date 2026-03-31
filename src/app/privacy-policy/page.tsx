"use client";

import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { useInView } from "@/hooks/useInView";

export default function PrivacyPolicyPage() {
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
                Privacy Policy
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
              <h2 className="text-2xl font-bold text-[#001a2b] mb-4">Information We Collect</h2>
              <p className="text-[#050707]/80 mb-6">
                We collect information you provide directly to us, such as when
                you fill out a contact form, request a consultation, or
                communicate with us via email.
              </p>

              <h2 className="text-2xl font-bold text-[#001a2b] mb-4 mt-8">How We Use Your Information</h2>
              <p className="text-[#050707]/80 mb-6">
                We use the information we collect to respond to your inquiries,
                provide our services, and communicate with you about our
                products and services.
              </p>

              <h2 className="text-2xl font-bold text-[#001a2b] mb-4 mt-8">Information Sharing</h2>
              <p className="text-[#050707]/80 mb-6">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except as
                required by law.
              </p>

              <h2 className="text-2xl font-bold text-[#001a2b] mb-4 mt-8">Data Security</h2>
              <p className="text-[#050707]/80 mb-6">
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-bold text-[#001a2b] mb-4 mt-8">Contact Us</h2>
              <p className="text-[#050707]/80 mb-6">
                If you have questions about this Privacy Policy, please contact
                us at{" "}
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
