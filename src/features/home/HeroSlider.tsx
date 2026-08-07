'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, ChevronLeft, ChevronRight, CheckCircle2, TestTube } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
  discountBadge: string;
  ratingBadge: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Livotec 7-Stage RO Purifier',
    subtitle: '100% Pure Mineral-Rich Drinking Water with Automatic Flushing',
    description: 'Experience 100% pure mineral-rich drinking water with Aqua Point 7-stage RO filtration system, smart TDS controller, and instant UV sterilization.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=80&w=1200&auto=format&fit=crop',
    tag: '7-STAGE FILTRATION',
    discountBadge: 'FREE INSTALLATION',
    ratingBadge: '★ 4.9 RATED',
    primaryCta: { text: 'Explore Purifiers', href: '/products' },
    secondaryCta: { text: 'Book Free Water Test', href: '/services' }
  },
  {
    id: 2,
    title: 'Pure X Hot & Cold Dispenser',
    subtitle: 'Instant Dual Temperature Water Dispenser for Home & Office',
    description: 'Instant hot & chilled pure drinking water dispenser with energy-efficient compressor cooling, child-lock safety, and high recovery RO membrane.',
    image: 'https://images.unsplash.com/photo-1527100673774-cce25eafaf7f?q=80&w=1200&auto=format&fit=crop',
    tag: 'DUAL TEMP DISPENSER',
    discountBadge: '100 GPD CAPACITY',
    ratingBadge: '★ 4.9 RATED',
    primaryCta: { text: 'Explore Purifiers', href: '/products?category=Dispensers' },
    secondaryCta: { text: 'Book Free Water Test', href: '/services' }
  },
  {
    id: 3,
    title: 'Industrial RO & Softener Plants',
    subtitle: '500 to 5000 LPH Water Treatment Solutions for Industries',
    description: 'Heavy-duty commercial RO water plant engineered for factories, hospitals, and commercial buildings with automated digital TDS monitoring.',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1200&auto=format&fit=crop',
    tag: 'COMMERCIAL & INDUSTRIAL',
    discountBadge: 'FREE WATER TESTING',
    ratingBadge: '★ 4.9 RATED',
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
    }, 4000);
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
    <section className="relative overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-gradient-to-b from-[#F0F9FF] via-[#FFFFFF] to-[#F8FAFC] border-b border-[#E2E8F0] py-12 lg:py-16">
      {/* Background Light Water Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00BCE1]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00BCE1]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Dynamic Info & Ocean Cyan CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Tag & Rating Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00BCE1]/10 border border-[#00BCE1]/30 text-[#00BCE1] shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-extrabold tracking-wider uppercase">
                  {slide.tag}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#BAE6FD] text-[#0F172A] shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#00BCE1]" />
                <span className="text-xs font-extrabold text-[#00BCE1]">
                  100% Pure Guarantee
                </span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight transition-all duration-300">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl font-bold text-[#00BCE1]">
              {slide.subtitle}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl mx-auto lg:mx-0">
              {slide.description}
            </p>

            {/* Ocean Cyan CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href={slide.primaryCta.href}
                className="px-7 py-3.5 rounded-xl bg-[#00BCE1] hover:bg-[#00A3C7] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg hover:shadow-[#00BCE1]/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span>{slide.primaryCta.text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={slide.secondaryCta.href}
                className="px-7 py-3.5 rounded-xl bg-white border-2 border-[#00BCE1] text-[#00BCE1] hover:bg-[#F0F9FF] font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <TestTube className="w-4 h-4 text-[#00BCE1]" />
                <span>{slide.secondaryCta.text}</span>
              </Link>
            </div>

            {/* Key Features Bullet List */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-semibold text-[#475569]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Zero Installation Fee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00BCE1]" />
                <span>2 Years On-Site Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
                <span>Free Water Quality Test</span>
              </div>
            </div>

          </div>

          {/* Right Side: High-Resolution Image Slider Frame */}
          <div className="lg:col-span-6">
            <div
              className="relative rounded-[18px] overflow-hidden border-2 border-[#00BCE1] shadow-[0_0_30px_rgba(0,188,225,0.35)] bg-slate-900 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Background Banner Slides */}
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
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle Gradient Overlays for text/badge readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-transparent to-slate-950/30" />
                </div>
              ))}

              {/* Floating Top Left Pill Badge: Discount Badge */}
              <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-[#00BCE1] text-white text-xs font-extrabold tracking-wider uppercase shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.discountBadge}</span>
              </div>

              {/* Floating Top Right Pill Badge: Rating */}
              <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/60 text-amber-600 text-xs font-extrabold shadow-lg flex items-center gap-1">
                <span>{slide.ratingBadge}</span>
              </div>

              {/* Floating Bottom Product Overlay */}
              <div className="absolute bottom-14 left-4 right-4 z-20 p-3.5 rounded-xl bg-slate-900/75 backdrop-blur-md border border-white/15 text-white shadow-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-[#00BCE1] uppercase tracking-widest">
                    {slide.tag}
                  </div>
                  <div className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-[280px]">
                    {slide.title}
                  </div>
                </div>
                <Link
                  href={slide.primaryCta.href}
                  className="px-3.5 py-1.5 rounded-lg bg-[#00BCE1] hover:bg-[#00A3C7] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 hover:text-[#00BCE1] shadow-lg backdrop-blur-sm transition-all duration-200 opacity-80 hover:scale-110 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 hover:text-[#00BCE1] shadow-lg backdrop-blur-sm transition-all duration-200 opacity-80 hover:scale-110 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Indicator Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? 'w-7 bg-[#00BCE1]'
                        : 'w-2 bg-white/50 hover:bg-white/90'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

