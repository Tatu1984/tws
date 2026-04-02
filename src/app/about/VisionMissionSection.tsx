"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const visionBullets = [
  "Systems where the value is immediately obvious",
  "Deployments that scale from a few locations to thousands",
  "Technology that doesn\u2019t require translation or tribal knowledge",
  "Teams aligned around a shared understanding",
];

const missionBullets = [
  "Deliver systems that work in the real world",
  "Enable every role to succeed",
  "Build enterprise-grade security from day one",
  "Design architectures that evolve quickly without breaking trust",
  "Treat micro data centers as a core product",
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <Image
            src="/images/Group-15430.svg"
            alt=""
            width={24}
            height={24}
            className="rounded-none mt-0.5 shrink-0"
          />
          <span className="text-base text-[#050707]/80 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function VisionMissionSection() {
  const { ref: visionTextRef, inView: visionTextInView } = useInView<HTMLDivElement>();
  const { ref: visionImgRef, inView: visionImgInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: missionImgRef, inView: missionImgInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: missionTextRef, inView: missionTextInView } = useInView<HTMLDivElement>();

  return (
    <>
      {/* Vision Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Text */}
            <div ref={visionTextRef}>
              <div className={`mb-4 fade-up${visionTextInView ? " in-view" : ""}`}>
                <div className="gradient-eyebrow inline-block">
                  <span className="text-style-tagline">Vision</span>
                </div>
              </div>
              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-normal text-color-midnight mb-6 leading-tight fade-up${visionTextInView ? " in-view" : ""}`}
                style={{ transitionDelay: "100ms" }}
              >
                Infrastructure that anyone can run
              </h2>
              <p
                className={`text-base lg:text-lg text-[#050707]/70 leading-relaxed mb-6 fade-up${visionTextInView ? " in-view" : ""}`}
                style={{ transitionDelay: "180ms" }}
              >
                We envision a world where micro data centers are simple,
                intuitive, secure, and scalable. Where systems make value
                immediately apparent, deployments scale from one to thousands,
                and teams operate with shared understanding.
              </p>
              <p
                className={`text-base lg:text-lg font-semibold text-color-midnight mb-4 fade-up${visionTextInView ? " in-view" : ""}`}
                style={{ transitionDelay: "240ms" }}
              >
                We envision:
              </p>
              <div className={`fade-up${visionTextInView ? " in-view" : ""}`} style={{ transitionDelay: "300ms" }}>
                <BulletList items={visionBullets} />
              </div>
            </div>

            {/* Right - Image */}
            <div
              ref={visionImgRef}
              className={`relative aspect-square rounded-2xl overflow-hidden fade-in${visionImgInView ? " in-view" : ""}`}
            >
              <Image
                src="/images/two-business-people-standing-server-room-with-laptop-discussing.jpg"
                alt="Two people in a server room discussing infrastructure"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Image */}
            <div
              ref={missionImgRef}
              className={`relative aspect-square rounded-2xl overflow-hidden order-2 lg:order-1 fade-in${missionImgInView ? " in-view" : ""}`}
            >
              <Image
                src="/images/freepik__the-style-is-candid-image-photography-with-natural__57975.jpeg"
                alt="Team working with micro data center systems"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Right - Text */}
            <div ref={missionTextRef} className="order-1 lg:order-2">
              <div className={`mb-4 fade-up${missionTextInView ? " in-view" : ""}`}>
                <div className="gradient-eyebrow inline-block">
                  <span className="text-style-tagline">Mission</span>
                </div>
              </div>
              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-normal text-color-midnight mb-6 leading-tight fade-up${missionTextInView ? " in-view" : ""}`}
                style={{ transitionDelay: "100ms" }}
              >
                Make micro data centers, clear, secure and scalable
              </h2>
              <p
                className={`text-base lg:text-lg text-[#050707]/70 leading-relaxed mb-6 fade-up${missionTextInView ? " in-view" : ""}`}
                style={{ transitionDelay: "180ms" }}
              >
                We build a unified platform — hardware, software, and management
                interface — to deploy and operate micro data centers with
                confidence. Real-world functional systems built for success
                across all roles and experience levels.
              </p>
              <p
                className={`text-base lg:text-lg font-semibold text-color-midnight mb-4 fade-up${missionTextInView ? " in-view" : ""}`}
                style={{ transitionDelay: "240ms" }}
              >
                Our mission is to:
              </p>
              <div className={`fade-up${missionTextInView ? " in-view" : ""}`} style={{ transitionDelay: "300ms" }}>
                <BulletList items={missionBullets} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
