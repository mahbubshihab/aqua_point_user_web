'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Award, 
  ShieldCheck, 
  Droplets, 
  Building2, 
  CheckCircle2, 
  Phone, 
  ArrowRight 
} from 'lucide-react';

export const AboutCompanySection: React.FC = () => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] shadow-md relative overflow-hidden">
        {/* Soft Background Accent Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00BCE1]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Column: Vision & Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0F9FF] border border-[#BAE6FD]">
              <Droplets className="w-4 h-4 text-[#00BCE1]" />
              <span className="text-xs font-extrabold text-[#00BCE1] uppercase tracking-widest">
                ABOUT AQUA POINT BD
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              17+ Years of Purity — <span className="text-[#00BCE1]">Aqua Point BD</span>
            </h2>

            <p className="text-sm text-[#475569] leading-relaxed">
              Founded in <strong className="text-[#0F172A]">2007 by Enjamamul Haque (Kiron)</strong>, Aqua Point BD has grown into one of Bangladesh's most trusted water purification providers. With over 17 years of dedicated engineering experience, we specialize in high-capacity 7-stage RO purifiers, luxury cabinet filters, office water dispensers, and commercial industrial RO plants.
            </p>

            {/* Key Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <ShieldCheck className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-[#0F172A]">Certified Purity</h4>
                  <p className="text-[11px] text-[#64748B]">WHO & BSTI drinking standard compliance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <Award className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-[#0F172A]">Genuine Components</h4>
                  <p className="text-[11px] text-[#64748B]">Imported Filmtec RO membranes & NSF carbon.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/about"
                className="px-6 py-3 rounded-full bg-[#00BCE1] hover:bg-[#00A3C7] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-cyan-500/20 flex items-center gap-2"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:01780885841"
                className="px-6 py-3 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#0F172A] font-extrabold text-xs flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-[#00BCE1]" />
                <span>Call Founder Line: 01780-885841</span>
              </a>
            </div>
          </div>

          {/* Right Column: Key Stats Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-6 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
                <Building2 className="w-5 h-5 text-[#00BCE1]" />
                <span>Company Highlights</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E2E8F0]">
                  <span className="text-xs font-bold text-[#64748B]">Established</span>
                  <span className="text-sm font-extrabold text-[#00BCE1]">2007 (17+ Years)</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E2E8F0]">
                  <span className="text-xs font-bold text-[#64748B]">Founder & CEO</span>
                  <span className="text-sm font-extrabold text-[#0F172A]">Enjamamul Haque (Kiron)</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E2E8F0]">
                  <span className="text-xs font-bold text-[#64748B]">Headquarters</span>
                  <span className="text-xs font-extrabold text-[#0F172A] text-right">House 72, Janata Housing, Ring Rd, Dhaka</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E2E8F0]">
                  <span className="text-xs font-bold text-[#64748B]">Satisfied Clients</span>
                  <span className="text-sm font-extrabold text-[#10B981]">15,000+ Nationwide</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center gap-2 text-xs font-extrabold text-[#047857]">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>100% Genuine Certified Water Equipment Guarantee</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
