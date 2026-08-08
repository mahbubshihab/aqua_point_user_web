'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  subscribeToReviewsFromFirestore,
  ReviewItem
} from '@/core/services/firebase';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const unsub = subscribeToReviewsFromFirestore((data) => {
      setReviews(data || []);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading || !reviews || reviews.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const visibleCount = Math.min(reviews.length, 3);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] shadow-md space-y-8 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00BCE1]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Minimal Header */}
        <div className="text-center max-w-xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Reviews
          </h2>
        </div>

        {/* Testimonials Slider */}
        <div className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: visibleCount }).map((_, offset) => {
              const idx = (currentIndex + offset) % reviews.length;
              const item = reviews[idx];
              if (!item) return null;

              return (
                <div
                  key={item.id || idx}
                  className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00BCE1]/50 hover:bg-white transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300 fill-slate-100'
                            }`}
                          />
                        ))}
                      </div>
                      <Quote className="w-5 h-5 text-[#CBD5E1] group-hover:text-[#00BCE1]/40 transition-colors" />
                    </div>

                    <p className="text-sm text-[#334155] italic leading-relaxed">
                      "{item.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] mt-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#0F172A]">
                        {item.customerName}
                      </h4>
                      {item.location && (
                        <p className="text-xs text-[#64748B] mt-0.5">
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slider Controls (if more than 3 reviews) */}
          {reviews.length > 3 && (
            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? 'w-6 bg-[#00BCE1]'
                        : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-[#00BCE1] transition-colors shadow-sm cursor-pointer"
                  aria-label="Previous reviews"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-[#00BCE1] transition-colors shadow-sm cursor-pointer"
                  aria-label="Next reviews"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

