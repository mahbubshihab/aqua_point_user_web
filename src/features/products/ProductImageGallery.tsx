'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  ImageIcon,
  Sparkles
} from 'lucide-react';
import { getCloudinaryUrl } from '@/core/services/cloudinary';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  category?: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  category,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Touch Swipe Gesture State
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const minSwipeDistance = 40;

  // Safe gallery images list
  const safeImages = images && images.length > 0 ? images : ['/placeholder.png'];
  const hasMultipleImages = safeImages.length > 1;

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % safeImages.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, safeImages.length]);

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div 
        className="relative w-full h-[380px] sm:h-[460px] rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden shadow-sm group select-none transition-all"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Active Image */}
        <img
          src={getCloudinaryUrl(safeImages[selectedIndex], { width: 1000, height: 800 })}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300 transform group-hover:scale-105"
        />

        {/* Category Tag */}
        {category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#BAE6FD] text-xs font-extrabold text-[#00BCE1] shadow-sm">
              {category}
            </span>
          </div>
        )}

        {/* Lightbox / Zoom Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#0F172A] border border-[#E2E8F0] shadow-md hover:scale-110 active:scale-95 transition-all duration-200 flex items-center gap-1.5 text-xs font-bold"
          title="Expand View"
        >
          <Maximize2 className="w-4 h-4 text-[#00BCE1]" />
          <span className="hidden sm:inline">Zoom</span>
        </button>

        {/* Image Counter Badge */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/70 text-white backdrop-blur-md text-xs font-bold">
            <ImageIcon className="w-3.5 h-3.5 text-[#00BCE1]" />
            <span>{selectedIndex + 1} / {safeImages.length}</span>
          </div>
        )}

        {/* Swipe Hint overlay on mobile */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 right-4 z-10 sm:hidden">
            <span className="px-2.5 py-1 rounded-full bg-slate-900/60 text-white/90 backdrop-blur-md text-[10px] font-semibold">
              Swipe ↔
            </span>
          </div>
        )}

        {/* Swipeable & Clickable Prev Arrow Button */}
        {hasMultipleImages && (
          <button
            onClick={handlePrev}
            aria-label="Previous Image"
            className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 hover:bg-white text-[#0F172A] border border-slate-200/80 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-90 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-90 sm:opacity-0 sm:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}

        {/* Swipeable & Clickable Next Arrow Button */}
        {hasMultipleImages && (
          <button
            onClick={handleNext}
            aria-label="Next Image"
            className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 hover:bg-white text-[#0F172A] border border-slate-200/80 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-90 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-90 sm:opacity-20 sm:translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Swipe Dots Indicator for Mobile */}
      {hasMultipleImages && (
        <div className="flex items-center justify-center gap-1.5 sm:hidden py-1">
          {safeImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === idx 
                  ? 'w-6 bg-[#00BCE1]' 
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail Selector Strip */}
      {hasMultipleImages && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 px-1 scrollbar-none">
          {safeImages.map((imgUrl, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#F8FAFC] border overflow-hidden transition-all duration-200 shrink-0 group ${
                  isSelected
                    ? 'border-[#00BCE1] ring-4 ring-[#00BCE1]/20 scale-105 shadow-md'
                    : 'border-[#E2E8F0] opacity-60 hover:opacity-100 hover:border-slate-300'
                }`}
              >
                <img
                  src={getCloudinaryUrl(imgUrl, { width: 160, height: 160 })}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {isSelected && (
                  <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#00BCE1] ring-2 ring-white" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between z-10 text-white">
            <div className="space-y-0.5">
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight max-w-md line-clamp-1">
                {productName}
              </h3>
              <p className="text-xs text-slate-400">
                Image {selectedIndex + 1} of {safeImages.length}
              </p>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Main Image Display */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={safeImages[selectedIndex]}
              alt={`${productName} full preview`}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300"
            />

            {/* Lightbox Left Arrow */}
            {hasMultipleImages && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 p-3.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-90"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
            )}

            {/* Lightbox Right Arrow */}
            {hasMultipleImages && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-6 p-3.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-90"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Thumbnail Strip */}
          {hasMultipleImages && (
            <div className="flex items-center justify-center gap-3 overflow-x-auto py-2 z-10">
              {safeImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedIndex === idx 
                      ? 'border-[#00BCE1] ring-2 ring-[#00BCE1]/40 scale-105' 
                      : 'border-white/20 opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
