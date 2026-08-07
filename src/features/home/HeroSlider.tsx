'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench, Shield, Sparkles, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: 'Pure Water, Pure Life',
    subtitle: 'Next-Generation Woodistic Glass RO Purifiers',
    description: 'Experience 100% pure mineral-rich water with Aqua Point 7-stage RO filtration system, smart TDS control, and instant UV sterilization.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=1920&q=80',
    primaryCta: { text: 'Explore Purifiers', href: '/products' },
    secondaryCta: { text: 'Book Service', href: '/services' },
    badge: '120 PPM Mineral Perfect'
  },
  {
    id: 2,
    title: 'Industrial & Commercial RO Plants',
    subtitle: 'High Capacity Solutions for Enterprises & Factories',
    description: 'Custom engineered RO water treatment plants from 100 LPH to 10,000 LPH with automatic microprocessor controller and stainless steel design.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80',
    primaryCta: { text: 'View Industrial Plants', href: '/products?category=Industrial+RO+Plants' },
    secondaryCta: { text: 'Request Quote', href: '/contact' },
    badge: 'Industrial Grade 500+ LPH'
  },
  {
    id: 3,
    title: '24/7 Expert Maintenance & Servicing',
    subtitle: 'On-Demand Technician Doorstep Delivery',
    description: 'Fast certified technician dispatch within 2 hours across Dhaka & Chittagong. Filter cartridge replacement, repair & free water quality audit.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1920&q=80',
    primaryCta: { text: 'Book Maintenance Now', href: '/services' },
    secondaryCta: { text: 'Call Helpline', href: 'tel:09613700750' },
    badge: '2 Hours Rapid Response'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden min-h-[560px] lg:min-h-[640px] flex items-center justify-center bg-[#0A0D16] border-b border-[#1E2638]">
      {/* Background Image with Dark Glass Overlay */}
      {SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ transition: 'opacity 1s ease-in-out, transform 8s ease-out' }}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D16] via-[#0A0D16]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D16] via-[#0A0D16]/60 to-transparent" />
        </div>
      ))}

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00E5FF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center lg:text-left w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#131826]/90 border border-[#00E5FF]/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <Sparkles className="w-4 h-4 text-[#00E5FF] animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-xs font-bold text-[#00E5FF] tracking-wider uppercase">
                {slide.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
              {slide.title.split(' ')[0]} <span className="bg-gradient-to-r from-[#00E5FF] via-[#38BDF8] to-[#10B981] bg-clip-text text-transparent">{slide.title.split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-[#10B981]">
              {slide.subtitle}
            </p>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {slide.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href={slide.primaryCta.href}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#10B981] text-[#0A0D16] font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span>{slide.primaryCta.text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={slide.secondaryCta.href}
                className="px-7 py-3.5 rounded-xl bg-[#131826]/90 border border-[#1E2638] hover:border-[#00E5FF]/40 text-slate-200 hover:text-white font-semibold text-sm backdrop-blur-md hover:bg-[#1E2638]/80 transition-all duration-300 flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-[#10B981]" />
                <span>{slide.secondaryCta.text}</span>
              </Link>
            </div>

            {/* Key Features Bullet List */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Zero Installation Fee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                <span>2 Years On-Site Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
                <span>Authentic Spare Parts</span>
              </div>
            </div>

          </div>

          {/* Slider Glass Indicators & Navigation */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center space-y-4">
            <div className="p-4 rounded-2xl bg-[#131826]/70 border border-[#1E2638] backdrop-blur-xl space-y-3 w-full max-w-xs shadow-2xl">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center">
                Featured Highlights
              </div>
              {SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    idx === currentSlide
                      ? 'bg-[#1E2638] border-[#00E5FF] text-white shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                      : 'bg-[#0A0D16]/50 border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold truncate max-w-[180px]">{s.subtitle}</span>
                  <div className={`w-2 h-2 rounded-full ${idx === currentSlide ? 'bg-[#00E5FF] animate-ping' : 'bg-slate-600'}`} />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
                className="p-3 rounded-xl bg-[#131826] border border-[#1E2638] text-slate-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
                className="p-3 rounded-xl bg-[#131826] border border-[#1E2638] text-slate-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
