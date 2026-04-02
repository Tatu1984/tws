"use client";

import { useInView } from "@/hooks/useInView";

export function FullWidthImageSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <div
      ref={ref}
      className={`w-full fade-in${inView ? " in-view" : ""}`}
    >
      <div
        className="w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/373329-p-1600.jpg')",
          aspectRatio: "16 / 5",
          minHeight: "220px",
        }}
        role="img"
        aria-label="Ten Sparrows operations"
      />
    </div>
  );
}
