'use client';

import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  role: string;
  comment: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Engr. Tanvir Ahmed',
    location: 'Gulshan 2, Dhaka',
    role: 'Residential Customer',
    comment: 'Aqua Point installed our 7-stage RO purifier within 3 hours. Water TDS dropped from 420 PPM to 110 PPM! Excellent mineral taste and incredible service.',
    rating: 5,
  },
  {
    name: 'Nusrat Jahan',
    location: 'Dhanmondi, Dhaka',
    role: 'Home Owner',
    comment: 'The monthly maintenance service is completely stress-free. Their technicians are polite, punctual, and test water quality right in front of us.',
    rating: 5,
  },
  {
    name: 'Syed Rafiqul Islam',
    location: 'Uttara, Dhaka',
    role: 'Commercial Client',
    comment: 'We installed Aqua Point\'s commercial dispenser & RO system for our 50-person office. Crisp water quality, zero breakdown in 2 years, and top tier support!',
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] shadow-md space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 text-xs font-extrabold uppercase tracking-wide">
            ⭐ VERIFIED CUSTOMER REVIEWS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-2">
            Loved By Families & <span className="text-[#00BCE1]">Businesses</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Authentic feedback from our 15,000+ satisfied residential and commercial clients across Bangladesh.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00BCE1]/50 hover:bg-white transition-all duration-300 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#CBD5E1]" />
                </div>
                <p className="text-xs sm:text-sm text-[#334155] italic leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-[#0F172A]">{item.name}</h4>
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                  <span>{item.role}</span>
                  <span className="text-[#00BCE1] font-bold">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
