'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Tag } from 'lucide-react';
import { subscribeToBannersFromFirestore, BannerItem } from '@/core/services/firebase';

const DEFAULT_MAIN_BANNERS: BannerItem[] = [
  {
    id: 'default-main-1',
    title: 'Livotec & RO Water Purifiers Showcase',
    subtitle: 'Advanced 6-Stage Reverse Osmosis Technology for Pure & Safe Drinking Water',
    tag: 'PREMIUM SELECTION',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129051/rjlqkn2a9vi9kcsraa9y.webp',
    ctaLink: '/products',
    position: 'main',
    isActive: true
  },
  {
    id: 'default-main-2',
    title: 'Pure X Hot & Cold Water Dispenser Showcase',
    subtitle: 'Instant Hot & Refreshing Cold Mineral Water for Home & Office',
    tag: 'BESTSELLER',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129081/xwspevqgsjmaltfbizug.webp',
    ctaLink: '/products',
    position: 'main',
    isActive: true
  },
  {
    id: 'default-main-3',
    title: '500-1000 LPH Commercial & Industrial RO Plant Showcase',
    subtitle: 'Heavy-Duty Water Treatment Plants with Stainless Steel Skid & High Recovery',
    tag: 'INDUSTRIAL SOLUTION',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129103/nz44nrn2bth9ky0sin3p.webp',
    ctaLink: '/products',
    position: 'main',
    isActive: true
  }
];

const DEFAULT_SIDE_TOP: BannerItem = {
  id: 'default-side-top',
  title: 'Commercial RO Systems',
  subtitle: 'High capacity water purification solutions for factories, offices & restaurants',
  tag: 'SPECIAL OFFER',
  imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=80&w=800&auto=format&fit=crop',
  ctaLink: '/products?category=Commercial',
  position: 'side_top',
  isActive: true
};

const DEFAULT_SIDE_BOTTOM: BannerItem = {
  id: 'default-side-bottom',
  title: '24/7 Expert Service & Repair',
  subtitle: 'Professional filter replacement, membrane cleaning & rapid technical maintenance',
  tag: 'EXPERT SUPPORT',
  imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
  ctaLink: '/services',
  position: 'side_bottom',
  isActive: true
};

export const HeroSlider: React.FC = () => {
  const [mainSlides, setMainSlides] = useState<BannerItem[]>(DEFAULT_MAIN_BANNERS);
  const [sideTopBanner, setSideTopBanner] = useState<BannerItem>(DEFAULT_SIDE_TOP);
  const [sideBottomBanner, setSideBottomBanner] = useState<BannerItem>(DEFAULT_SIDE_BOTTOM);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Subscribe directly to Cloud Firestore 'banners' collection
  useEffect(() => {
    const unsub = subscribeToBannersFromFirestore((banners: BannerItem[]) => {
      if (banners && banners.length > 0) {
        // Filter position == 'main'
        const mainBanners = banners.filter(
          (b) => b.position === 'main' || (!b.position && b.id !== sideTopBanner.id && b.id !== sideBottomBanner.id)
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
  const renderBannerContent = (banner: BannerItem, isMain: boolean) => {
    const content = (
      <div className="relative w-full h-full group overflow-hidden">
        <img
          src={banner.imageUrl}
          alt={banner.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-black/20" />

        {/* Tag / Badge Overlay */}
        {banner.tag && (
          <div
            className={`absolute z-20 px-3 py-1 rounded-full bg-[#00BCE1]/90 backdrop-blur-md text-slate-950 font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg border border-white/20 ${
              isMain ? 'top-5 left-5 text-xs' : 'top-3.5 left-3.5 text-[10px]'
            }`}
          >
            <Tag className={isMain ? 'w-3.5 h-3.5 fill-slate-950' : 'w-3 h-3 fill-slate-950'} />
            {banner.tag}
          </div>
        )}

        {/* Content Details */}
        <div
          className={`absolute z-20 text-white ${
            isMain
              ? 'bottom-14 sm:bottom-12 left-5 sm:left-8 right-5 sm:right-28 space-y-2'
              : 'bottom-4 left-4 right-4 space-y-1'
          }`}
        >
          <h3
            className={`font-extrabold text-white leading-tight drop-shadow-md group-hover:text-[#00BCE1] transition-colors ${
              isMain ? 'text-xl sm:text-2xl lg:text-3xl line-clamp-2' : 'text-base sm:text-lg line-clamp-1'
            }`}
          >
            {banner.title}
          </h3>

          {banner.subtitle && (
            <p
              className={`text-slate-200 line-clamp-2 drop-shadow-sm ${
                isMain ? 'text-xs sm:text-sm max-w-xl' : 'text-xs text-slate-300'
              }`}
            >
              {banner.subtitle}
            </p>
          )}

          {/* CTA Link Button */}
          {banner.ctaLink && (
            <div className={isMain ? 'pt-2' : 'pt-1'}>
              <span
                className={`inline-flex items-center gap-1.5 rounded-xl font-bold transition-all shadow-md ${
                  isMain
                    ? 'px-4 py-2 bg-[#00BCE1] hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm hover:scale-105'
                    : 'text-xs text-[#00BCE1] group-hover:text-cyan-300 font-semibold'
                }`}
              >
                {isMain ? 'Explore Details' : 'Learn More'}{' '}
                <ArrowRight className={isMain ? 'w-4 h-4' : 'w-3.5 h-3.5 group-hover:translate-x-1 transition-transform'} />
              </span>
            </div>
          )}
        </div>
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
                  {renderBannerContent(slide, true)}
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
          <div className="flex-1 relative w-full h-[180px] sm:h-auto lg:h-[232px] rounded-2xl overflow-hidden shadow-xl border border-slate-800 hover:border-[#00BCE1]/60 transition-all duration-300 bg-slate-950 group">
            {renderBannerContent(sideTopBanner, false)}
          </div>

          {/* Side Promo Bottom Banner */}
          <div className="flex-1 relative w-full h-[180px] sm:h-auto lg:h-[232px] rounded-2xl overflow-hidden shadow-xl border border-slate-800 hover:border-[#00BCE1]/60 transition-all duration-300 bg-slate-950 group">
            {renderBannerContent(sideBottomBanner, false)}
          </div>
        </div>
      </div>
    </section>
  );
};
