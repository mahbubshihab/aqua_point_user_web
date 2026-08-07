'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, TestTube } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  headline: string;
  subtitle: string;
  image: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Livotec 7-Stage RO Purifier System',
    headline: 'Pure & Safe Water Solutions',
    subtitle: '17+ Years of Pure Drinking Water Excellence across Bangladesh.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=80&w=1600&auto=format&fit=crop',
    primaryCta: { text: 'Explore Purifiers', href: '/products' },
    secondaryCta: { text: 'Book Free Water Test', href: '/services' }
  },
  {
    id: 2,
    title: 'Pure X Hot & Cold Dispenser System',
    headline: 'Pure & Safe Water Solutions',
    subtitle: '17+ Years of Pure Drinking Water Excellence across Bangladesh.',
    image: 'https://images.unsplash.com/photo-1527100673774-cce25eafaf7f?q=80&w=1600&auto=format&fit=crop',
    primaryCta: { text: 'Explore Purifiers', href: '/products?category=Dispensers' },
    secondaryCta: { text: 'Book Free Water Test', href: '/services' }
  },
  {
    id: 3,
    title: 'Industrial RO Plants & Water Testing',
    headline: 'Pure & Safe Water Solutions',
    subtitle: '17+ Years of Pure Drinking Water Excellence across Bangladesh.',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1600&auto=format&fit=crop',
    primaryCta: { text: 'Explore Purifiers', href: '/products?category=Industrial' },
    secondaryCta: { text: 'Book Free Water Test', href: '/services' }
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const slide = SLIDES[currentSlide];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-4">
      <div
        className="relative w-full h-[440px] sm:h-[460px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Panoramic Images & Dark Gradient Overlay */}
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
            {/* Dark Gradient Overlays (rgba(15,23,42,0.85) to rgba(15,23,42,0.3)) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.65) 50%, rgba(15,23,42,0.3) 100%), linear-gradient(to bottom, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.3) 100%)'
              }}
            />
          </div>
        ))}

        {/* Minimal Text Overlay (Left-aligned) */}
        <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 max-w-2xl text-left space-y-4">
          {/* Badge: 💧 AQUA POINT BD (#00BCE1 pill tag) */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00BCE1] text-white font-extrabold text-xs tracking-wider uppercase shadow-md w-fit">
            💧 AQUA POINT BD
          </div>

          {/* Bold Main Headline (1-2 lines max): Pure & Safe Water Solutions */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            {slide.headline}
          </h1>

          {/* Slide Title */}
          <div className="text-base sm:text-lg lg:text-xl font-bold text-[#00BCE1] tracking-wide drop-shadow">
            {slide.title}
          </div>

          {/* Short Minimal Subtitle (1 line) */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-200 font-medium leading-relaxed drop-shadow max-w-xl truncate">
            {slide.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href={slide.primaryCta.href}
              className="px-6 py-3 rounded-xl bg-[#00BCE1] hover:bg-[#00A3C7] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#00BCE1]/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore Purifiers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={slide.secondaryCta.href}
              className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/40 text-white font-bold text-sm shadow-sm hover:border-white transition-all duration-300 flex items-center gap-2"
            >
              <TestTube className="w-4 h-4 text-cyan-300" />
              <span>Book Free Water Test</span>
            </Link>
          </div>
        </div>

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

        {/* Previous & Next Arrow Buttons at Bottom-Right */}
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

