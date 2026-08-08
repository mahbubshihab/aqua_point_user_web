'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { subscribeToBannersFromFirestore, BannerItem } from '@/core/services/firebase';

export const HeroSlider: React.FC = () => {
  const [mainSlides, setMainSlides] = useState<BannerItem[]>([]);
  const [sideTopBanner, setSideTopBanner] = useState<BannerItem | null>(null);
  const [sideBottomBanner, setSideBottomBanner] = useState<BannerItem | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Subscribe directly to Cloud Firestore 'banners' collection
  useEffect(() => {
    const unsub = subscribeToBannersFromFirestore((banners: BannerItem[]) => {
      if (banners && banners.length > 0) {
        // Filter position == 'main'
        const mainBanners = banners.filter(
          (b) => b.position === 'main' || (!b.position && b.id !== sideTopBanner?.id && b.id !== sideBottomBanner?.id)
        );
        if (mainBanners.length > 0) {
          setMainSlides(mainBanners);
        }

        // Filter position == 'side_top'
        const sideTop = banners.find((b) => b.position === 'side_top');
        if (sideTop) {
          setSideTopBanner(sideTop);
        }

        // Filter position == 'side_bottom'
        const sideBottom = banners.find((b) => b.position === 'side_bottom');
        if (sideBottom) {
          setSideBottomBanner(sideBottom);
        }
      }
    });

    return () => unsub();
  }, []);

  // Auto slide interval for main carousel
  useEffect(() => {
    if (isPaused || mainSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, mainSlides.length]);

  // Keep index within bounds if slide list length changes
  useEffect(() => {
    if (currentSlide >= mainSlides.length && mainSlides.length > 0) {
      setCurrentSlide(0);
    }
  }, [mainSlides.length, currentSlide]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mainSlides.length) % mainSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mainSlides.length);
  };

  // Helper for rendering banner image container with link
  const renderBannerContent = (banner: BannerItem) => {
    const content = (
      <div className="relative w-full h-full group overflow-hidden rounded-2xl">
        <img
          src={banner.imageUrl}
          alt={banner.title || 'Banner'}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out rounded-2xl"
        />
      </div>
    );

    if (!banner.ctaLink) return content;

    if (banner.ctaLink.startsWith('http')) {
      return (
        <a href={banner.ctaLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
          {content}
        </a>
      );
    }

    return (
      <Link href={banner.ctaLink} className="block w-full h-full">
        {content}
      </Link>
    );
  };

  if (mainSlides.length === 0 && !sideTopBanner && !sideBottomBanner) {
    return null; // Do not render if no banners exist
  }

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-3 sm:py-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        {/* Left Column (2/3 width / 8 cols): Large Main Carousel Slider */}
        <div className="lg:col-span-8 relative w-full h-[380px] sm:h-[440px] lg:h-[480px]">
          <div
            className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#00BCE1]/70 group bg-slate-950"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Slides */}
            {mainSlides.map((slide, idx) => {
              const isCurrent = idx === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                    isCurrent ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
                >
                  {renderBannerContent(slide)}
                </div>
              );
            })}

            {/* Centered Slide Indicator Dots */}
            {mainSlides.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 shadow-lg">
                {mainSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? 'w-7 bg-[#00BCE1]'
                        : 'w-2.5 bg-white/40 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Next / Previous Arrow Buttons */}
            {mainSlides.length > 1 && (
              <div className="absolute bottom-4 right-4 sm:right-6 z-30 flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="p-2.5 rounded-xl bg-slate-900/70 hover:bg-[#00BCE1] hover:text-slate-950 text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="p-2.5 rounded-xl bg-slate-900/70 hover:bg-[#00BCE1] hover:text-slate-950 text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1/3 width / 4 cols): 2 Stacked Side Promo Banners */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]">
          {/* Side Promo Top Banner */}
          {sideTopBanner && (
            <div className="flex-1 relative w-full h-[180px] sm:h-auto lg:h-[232px] rounded-2xl overflow-hidden shadow-xl border border-slate-800 hover:border-[#00BCE1]/60 transition-all duration-300 bg-slate-950 group">
              {renderBannerContent(sideTopBanner)}
            </div>
          )}

          {/* Side Promo Bottom Banner */}
          {sideBottomBanner && (
            <div className="flex-1 relative w-full h-[180px] sm:h-auto lg:h-[232px] rounded-2xl overflow-hidden shadow-xl border border-slate-800 hover:border-[#00BCE1]/60 transition-all duration-300 bg-slate-950 group">
              {renderBannerContent(sideBottomBanner)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
