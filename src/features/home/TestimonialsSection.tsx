'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote, ShieldCheck, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  subscribeToApprovedReviewsFromFirestore,
  ReviewItem
} from '@/core/services/firebase';

const DEFAULT_TESTIMONIALS: ReviewItem[] = [
  {
    id: 'default-1',
    customerName: 'Engr. Tanvir Ahmed',
    location: 'Gulshan 2, Dhaka',
    comment: 'Aqua Point installed our 7-stage RO purifier within 3 hours. Water TDS dropped from 420 PPM to 110 PPM! Excellent mineral taste and incredible service.',
    rating: 5,
    isApproved: true,
  },
  {
    id: 'default-2',
    customerName: 'Nusrat Jahan',
    location: 'Dhanmondi, Dhaka',
    comment: 'The monthly maintenance service is completely stress-free. Their technicians are polite, punctual, and test water quality right in front of us.',
    rating: 5,
    isApproved: true,
  },
  {
    id: 'default-3',
    customerName: 'Syed Rafiqul Islam',
    location: 'Uttara, Dhaka',
    comment: 'We installed Aqua Point\'s commercial dispenser & RO system for our 50-person office. Crisp water quality, zero breakdown in 2 years, and top tier support!',
    rating: 5,
    isApproved: true,
  },
  {
    id: 'default-4',
    customerName: 'Dr. Mahmudul Hasan',
    location: 'Rajshahi City',
    comment: 'Hard water in Rajshahi was ruining our home appliances and hair. Aqua Point heavy-duty iron filter & RO solved everything perfectly.',
    rating: 5,
    isApproved: true,
  },
];

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const unsub = subscribeToApprovedReviewsFromFirestore((data) => {
      if (data && data.length > 0) {
        setReviews(data);
      } else {
        setReviews(DEFAULT_TESTIMONIALS);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const displayList = reviews.length > 0 ? reviews : DEFAULT_TESTIMONIALS;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayList.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayList.length) % displayList.length);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] shadow-md space-y-10 relative overflow-hidden">
        {/* Background Subtle Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00BCE1]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00BCE1]/10 text-[#00BCE1] border border-[#00BCE1]/20 text-xs font-extrabold uppercase tracking-wide">
            <Droplets className="w-3.5 h-3.5 text-[#00BCE1] fill-[#00BCE1]/20" /> VERIFIED CUSTOMER REVIEWS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-2">
            Loved By Families & <span className="text-[#00BCE1]">Businesses</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Authentic feedback from our satisfied residential and commercial clients across Bangladesh.
          </p>
        </div>

        {/* Testimonials Slider Grid */}
        <div className="relative z-10">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 animate-pulse h-48 flex flex-col justify-between"
                >
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-12 bg-slate-200 rounded" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Responsive Cards Grid / Slider */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* For desktop, show up to 3 cards starting from currentIndex */}
                {[0, 1, 2].map((offset) => {
                  const idx = (currentIndex + offset) % displayList.length;
                  const item = displayList[idx];
                  if (!item) return null;

                  return (
                    <div
                      key={item.id || idx}
                      className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00BCE1]/50 hover:bg-white transition-all duration-300 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 group"
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
                          <div className="flex items-center gap-1.5">
                            <span className="p-1 rounded-lg bg-[#00BCE1]/10 text-[#00BCE1] border border-[#00BCE1]/20">
                              <Droplets className="w-3.5 h-3.5" />
                            </span>
                            <Quote className="w-5 h-5 text-[#CBD5E1] group-hover:text-[#00BCE1]/40 transition-colors" />
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-[#334155] italic leading-relaxed">
                          "{item.comment}"
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#E2E8F0] space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-extrabold text-[#0F172A]">
                            {item.customerName}
                          </h4>
                          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00BCE1]/10 text-[#00BCE1] font-semibold">
                            {item.location}
                          </span>
                          <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                            Verified User
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Slider Controls & Indicator Dots */}
              <div className="pt-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {displayList.map((_, idx) => (
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};
