'use client';

import React from 'react';
import { Award, Zap, Clock, ShieldCheck, Star, Quote } from 'lucide-react';

export const WhyUsAndTestimonials: React.FC = () => {
  const features = [
    {
      title: '7-Stage Mineral RO',
      description: 'Retains essential calcium & magnesium while purifying 99.99% impurities.',
      icon: ShieldCheck,
      color: 'text-[#00E5FF]',
    },
    {
      title: '2-Hour Rapid Response',
      description: 'Dedicated helpline & quick doorstep emergency maintenance dispatch.',
      icon: Clock,
      color: 'text-[#10B981]',
    },
    {
      title: '100% Authentic Parts',
      description: 'Original imported Filmtec RO membranes & NSF certified carbon filters.',
      icon: Award,
      color: 'text-[#F59E0B]',
    },
    {
      title: 'Eco Smart Power',
      description: 'Automated auto-cutoff & low power consumption technology.',
      icon: Zap,
      color: 'text-purple-400',
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
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Why Aqua Point */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-widest">
            The Aqua Point Distinction
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            Why Thousands Trust <span className="text-[#10B981]">Aqua Point</span>
          </h2>
          <p className="text-sm text-slate-400">
            Engineered specifically for Bangladesh groundwater conditions with high iron, hardness, and TDS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#131826]/70 border border-[#1E2638] backdrop-blur-xl hover:border-[#00E5FF]/40 transition-all duration-300 space-y-3 shadow-lg"
              >
                <Icon className={`w-8 h-8 ${f.color}`} />
                <h3 className="text-base font-bold text-white">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#131826]/80 border border-[#1E2638] backdrop-blur-2xl shadow-2xl space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">
            Client Feedback & Reviews
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            Loved By Families & Businesses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0A0D16]/80 border border-[#1E2638] space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-600" />
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E2638]">
                <h4 className="text-sm font-bold text-white">{t.name}</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-0.5">
                  <span>{t.role}</span>
                  <span className="text-[#00E5FF]">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
