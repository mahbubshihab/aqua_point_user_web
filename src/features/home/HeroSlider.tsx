'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  image: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Livotec & RO Water Purifiers Showcase',
    image: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129051/rjlqkn2a9vi9kcsraa9y.webp'
  },
  {
    id: 2,
    title: 'Pure X Hot & Cold Water Dispenser Showcase',
    image: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129081/xwspevqgsjmaltfbizug.webp'
  },
  {
    id: 3,
    title: '500-1000 LPH Commercial & Industrial RO Plant Showcase',
    image: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129103/nz44nrn2bth9ky0sin3p.webp'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-4">
      <div
        className="relative w-full h-[440px] sm:h-[460px] lg:h-[480px] rounded-[18px] overflow-hidden shadow-2xl border-2 border-[#00BCE1] group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Pure Visual Panoramic Banner Images */}
        {SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              idx === currentSlide
                ? 'opacity-100 scale-100 z-10'
                : 'opacity-0 scale-105 pointer-events-none z-0'
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Centered Slide Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-8 bg-[#00BCE1]'
                  : 'w-2.5 bg-white/40 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Previous & Next Arrow Buttons on Right */}
        <div className="absolute bottom-6 right-6 sm:right-8 z-30 flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="p-3 rounded-full bg-slate-900/60 hover:bg-[#00BCE1] text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="p-3 rounded-full bg-slate-900/60 hover:bg-[#00BCE1] text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};


