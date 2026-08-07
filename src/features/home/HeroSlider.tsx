'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Tag } from 'lucide-react';
import { subscribeToBannersFromFirestore, BannerItem } from '@/core/services/firebase';

interface Slide {
  id: string | number;
  title: string;
  image: string;
  tag?: string;
  ctaLink?: string;
}

const DEFAULT_SLIDES: Slide[] = [
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
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Subscribe directly to Cloud Firestore 'banners' collection
  useEffect(() => {
    const unsub = subscribeToBannersFromFirestore((banners: BannerItem[]) => {
      if (banners && banners.length > 0) {
        const dynamicSlides: Slide[] = banners.map((b) => ({
          id: b.id,
          title: b.title,
          image: b.imageUrl,
          tag: b.tag,
          ctaLink: b.ctaLink,
        }));
        setSlides(dynamicSlides);
      }
    });

    return () => unsub();
  }, []);

  // Auto slide interval
  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  // Keep index within bounds if slide list length changes
  useEffect(() => {
    if (currentSlide >= slides.length && slides.length > 0) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-4">
      <div
        className="relative w-full h-[440px] sm:h-[460px] lg:h-[480px] rounded-[18px] overflow-hidden shadow-2xl border-2 border-[#00BCE1] group bg-slate-950"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Dynamic Panoramic Banner Images */}
        {slides.map((s, idx) => {
          const isCurrent = idx === currentSlide;

          const ImageElement = (
            <div className="relative w-full h-full">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover object-center"
              />
              {/* Optional Subtle Gradient Overlay for Tag/Title readability if present */}
              {(s.tag || s.title) && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
              )}

              {/* Tag / Badge Overlay */}
              {s.tag && (
                <div className="absolute top-6 left-6 z-20 px-3.5 py-1.5 rounded-full bg-[#00BCE1]/90 backdrop-blur-md text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg border border-white/20">
                  <Tag className="w-3.5 h-3.5 fill-slate-950" /> {s.tag}
                </div>
              )}

              {/* Optional Title & CTA Overlay if link exists */}
              {s.ctaLink && (
                <div className="absolute bottom-16 left-6 sm:left-10 z-20 max-w-lg hidden sm:block">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold border border-[#00BCE1]/40 hover:bg-[#00BCE1] hover:text-slate-950 transition-all shadow-xl">
                    Explore Details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              )}
            </div>
          );

          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                isCurrent
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
            >
              {s.ctaLink ? (
                s.ctaLink.startsWith('http') ? (
                  <a href={s.ctaLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    {ImageElement}
                  </a>
                ) : (
                  <Link href={s.ctaLink} className="block w-full h-full">
                    {ImageElement}
                  </Link>
                )
              ) : (
                ImageElement
              )}
            </div>
          );
        })}

        {/* Centered Slide Indicator Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10">
            {slides.map((_, idx) => (
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
        )}

        {/* Previous & Next Arrow Buttons on Right */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 right-6 sm:right-8 z-30 flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="p-3 rounded-full bg-slate-900/60 hover:bg-[#00BCE1] text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 shadow-lg cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="p-3 rounded-full bg-slate-900/60 hover:bg-[#00BCE1] text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 shadow-lg cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
