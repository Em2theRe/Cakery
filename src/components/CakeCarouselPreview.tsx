"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type CakeSlide = {
  title: string;
  image: string;
  alt: string;
};

const CAKE_SLIDES: CakeSlide[] = [
  { title: "Beispiel 1", image: "/cakes/cake-1.svg", alt: "Beispieltorte 1" },
  { title: "Beispiel 2", image: "/cakes/cake-2.svg", alt: "Beispieltorte 2" },
  { title: "Beispiel 3", image: "/cakes/cake-3.svg", alt: "Beispieltorte 3" },
  { title: "Beispiel 4", image: "/cakes/cake-4.svg", alt: "Beispieltorte 4" },
  { title: "Beispiel 5", image: "/cakes/cake-5.svg", alt: "Beispieltorte 5" },
];

const AUTO_SLIDE_MS = 3000;

export default function CakeCarouselPreview() {
  const [index, setIndex] = useState(0);
  const currentSlide = useMemo(() => CAKE_SLIDES[index], [index]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIndex((previous) => (previous + 1) % CAKE_SLIDES.length);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="cakery-card p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Preview Slideshow</p>
        <p className="cakery-muted text-xs">Automatisch alle 3 Sekunden</p>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(43, 27, 22, 0.08)" }}>
        <Image
          key={currentSlide.image}
          src={currentSlide.image}
          alt={currentSlide.alt}
          width={1200}
          height={800}
          className="h-56 w-full object-cover md:h-64"
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="cakery-muted text-sm">{currentSlide.title}</p>
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
              aria-label={`Zeige ${slide.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
