'use client';

import React from 'react';
import { Award, Zap, Clock, ShieldCheck, Star, Quote } from 'lucide-react';

export const WhyUsAndTestimonials: React.FC = () => {
  const features = [
    {
      title: '7-Stage Mineral RO',
      description: 'Retains essential calcium & magnesium while purifying 99.99% impurities.',
      icon: ShieldCheck,
      color: 'text-[#00BCE1]',
      bg: 'bg-[#F0F9FF]',
    },
    {
      title: '2-Hour Rapid Response',
      description: 'Dedicated helpline & quick doorstep emergency maintenance dispatch.',
      icon: Clock,
      color: 'text-[#10B981]',
      bg: 'bg-[#ECFDF5]',
    },
    {
      title: '100% Authentic Parts',
      description: 'Original imported Filmtec RO membranes & NSF certified carbon filters.',
      icon: Award,
      color: 'text-[#F59E0B]',
      bg: 'bg-[#FFFBEB]',
    },
    {
      title: 'Eco Smart Power',
      description: 'Automated auto-cutoff & low power consumption technology.',
      icon: Zap,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  const testimonials = [
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
      name: 'Rahim Chowdhury',
      location: 'Agrabad, Chittagong',
      role: 'Factory Manager',
      comment: 'We purchased a 1000 LPH Commercial RO plant for our food process line. Working flawlessly for over 18 months with top tier efficiency.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Why Aqua Point */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#00BCE1] uppercase tracking-widest">
            The Aqua Point Distinction
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A]">
            Why Thousands Trust <span className="text-[#10B981]">Aqua Point</span>
          </h2>
          <p className="text-sm text-[#475569]">
            Engineered specifically for Bangladesh groundwater conditions with high iron, hardness, and TDS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00BCE1]/40 transition-all duration-300 space-y-3 shadow-sm"
              >
                <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center border border-[#E2E8F0]`}>
                  <Icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">{f.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] shadow-md space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">
            Client Feedback & Reviews
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A]">
            Loved By Families & Businesses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#CBD5E1]" />
                </div>
                <p className="text-xs text-[#334155] italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0]">
                <h4 className="text-sm font-bold text-[#0F172A]">{t.name}</h4>
                <div className="flex items-center justify-between text-[11px] text-[#64748B] mt-0.5">
                  <span>{t.role}</span>
                  <span className="text-[#00BCE1] font-semibold">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
