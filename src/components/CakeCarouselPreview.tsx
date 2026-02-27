"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CakeSlide = {
  image: string;
  alt: string;
};

const CAKE_SLIDES: CakeSlide[] = [
  { image: "/cakes/cake-1.svg", alt: "Beispieltorte 1" },
  { image: "/cakes/cake-2.svg", alt: "Beispieltorte 2" },
  { image: "/cakes/cake-3.svg", alt: "Beispieltorte 3" },
  { image: "/cakes/cake-4.svg", alt: "Beispieltorte 4" },
  { image: "/cakes/cake-5.svg", alt: "Beispieltorte 5" },
];

const AUTO_SLIDE_MS = 3000;

export default function CakeCarouselPreview() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIndex((previous) => (previous + 1) % CAKE_SLIDES.length);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="cakery-card p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Cake&apos;s der Community</p>
      </div>

      <div
        className="relative mt-4 h-56 overflow-hidden rounded-2xl border md:h-64"
        style={{ borderColor: "rgba(43, 27, 22, 0.08)" }}
      >
        {CAKE_SLIDES.map((slide, slideIndex) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-all duration-700 ease-in-out"
            style={{
              opacity: slideIndex === index ? 1 : 0,
              transform: slideIndex === index ? "scale(1.04) rotate(1deg)" : "scale(1) rotate(-1deg)",
            }}
          />
        ))}
      </div>

      <div className="mt-3 flex justify-end">
        <div className="flex gap-2">
          {CAKE_SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => setIndex(slideIndex)}
              className="h-2.5 w-2.5 rounded-full transition"
              style={{
                background:
                  slideIndex === index ? "var(--primary)" : "rgba(43, 27, 22, 0.18)",
              }}
              aria-label={`Zeige Bild ${slideIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
