'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, ChevronLeft, ChevronRight, CheckCircle2, TestTube } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: 'Pure Water, Pure Life',
    subtitle: 'Next-Generation Woodistic Glass RO Purifiers',
    description: 'Experience 100% pure mineral-rich drinking water with Aqua Point 7-stage RO filtration system, smart TDS control, and instant UV sterilization.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=1920&q=80',
    primaryCta: { text: 'Explore Purifiers', href: '/products' },
    secondaryCta: { text: 'Book Free Water Test', href: '/services' },
    badge: '100% Pure Water Guarantee'
  },
  {
    id: 2,
    title: 'Industrial & Commercial RO Plants',
    subtitle: 'High Capacity Solutions for Enterprises & Factories',
    description: 'Custom engineered RO water treatment plants from 100 LPH to 10,000 LPH with automatic microprocessor controller and stainless steel design.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80',
    primaryCta: { text: 'Explore Purifiers', href: '/products?category=Industrial+RO+Plants' },
    secondaryCta: { text: 'Book Free Water Test', href: '/services' },
    badge: 'Industrial Grade 500+ LPH'
  },
  {
    id: 3,
    title: '24/7 Expert Maintenance & Servicing',
    subtitle: 'On-Demand Technician Doorstep Delivery',
    description: 'Fast certified technician dispatch within 2 hours across Dhaka & Chittagong. Filter cartridge replacement, repair & free water quality audit.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1920&q=80',
    primaryCta: { text: 'Explore Purifiers', href: '/products' },
    secondaryCta: { text: 'Book Free Water Test', href: '/services' },
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
    <section className="relative overflow-hidden min-h-[560px] lg:min-h-[620px] flex items-center justify-center bg-gradient-to-b from-[#F0F9FF] via-[#FFFFFF] to-[#F8FAFC] border-b border-[#E2E8F0]">
      {/* Background Image with Light Overlay */}
      {SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-25 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ transition: 'opacity 1s ease-in-out, transform 8s ease-out' }}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover filter brightness-110 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
        </div>
      ))}

      {/* Decorative Light Water Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00BCE1]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center lg:text-left w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            {/* Guarantee Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#BAE6FD] shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#00BCE1]" />
              <span className="text-xs font-extrabold text-[#00BCE1] tracking-wider uppercase">
                {slide.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              {slide.title.split(' ')[0]} <span className="bg-gradient-to-r from-[#00BCE1] via-[#008BAA] to-[#10B981] bg-clip-text text-transparent">{slide.title.split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="text-lg sm:text-xl font-bold text-[#008BAA]">
              {slide.subtitle}
            </p>

            <p className="text-sm sm:text-base text-[#475569] max-w-2xl leading-relaxed">
              {slide.description}
            </p>

            {/* Ocean Cyan CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href={slide.primaryCta.href}
                className="px-7 py-3.5 rounded-xl bg-[#00BCE1] hover:bg-[#00A3C7] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span>{slide.primaryCta.text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={slide.secondaryCta.href}
                className="px-7 py-3.5 rounded-xl bg-white border border-[#00BCE1]/40 hover:border-[#00BCE1] text-[#00BCE1] hover:bg-[#F0F9FF] font-bold text-sm shadow-sm transition-all duration-300 flex items-center gap-2"
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
                <span>Authentic Spare Parts</span>
              </div>
            </div>

          </div>

          {/* Slider Indicators & Navigation */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center space-y-4">
            <div className="p-4 rounded-2xl bg-white/90 border border-[#E2E8F0] space-y-3 w-full max-w-xs shadow-md">
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-widest text-center">
                Featured Purifiers
              </div>
              {SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    idx === currentSlide
                      ? 'bg-[#F0F9FF] border-[#00BCE1] text-[#00BCE1] shadow-sm font-bold'
                      : 'bg-[#F8FAFC] border-transparent text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <span className="text-xs font-semibold truncate max-w-[180px]">{s.subtitle}</span>
                  <div className={`w-2 h-2 rounded-full ${idx === currentSlide ? 'bg-[#00BCE1]' : 'bg-[#CBD5E1]'}`} />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
                className="p-3 rounded-xl bg-white border border-[#E2E8F0] text-[#475569] hover:text-[#00BCE1] hover:border-[#00BCE1]/50 shadow-sm transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
                className="p-3 rounded-xl bg-white border border-[#E2E8F0] text-[#475569] hover:text-[#00BCE1] hover:border-[#00BCE1]/50 shadow-sm transition-all"
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
