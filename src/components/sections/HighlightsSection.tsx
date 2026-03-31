"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const highlights = [
  {
    icon: "/images/Vector.svg",
    text: "Local, secure computing environments",
  },
  {
    icon: "/images/Vector-1.svg",
    text: "AI and automation deployed on-site",
  },
  {
    icon: "/images/Vector-2.svg",
    text: "Designed for reliability, control, and long-term trust",
  },
];

export function HighlightsSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="flex justify-center items-center">
      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8 bg-[#fcfbf9] rounded-4xl shadow-[0_2px_11px_rgba(161,161,161,0.2)] w-full max-w-225 -mt-25 relative z-10 p-8 place-items-center stagger-children${inView ? " in-view" : ""}`}
      >
        {highlights.map((item, index) => (
          <div key={index} className="text-center flex flex-col items-center w-full">
            <div className="mb-4">
              <div className="w-12 h-12 inline-block">
                <Image
                  src={item.icon}
                  alt=""
                  width={47}
                  height={47}
                  className="w-full h-full rounded-none"
                />
              </div>
            </div>
            <h3 className="text-base font-medium text-[#001a2b] leading-snug">
              {item.text}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
