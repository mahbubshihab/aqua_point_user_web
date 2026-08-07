'use client';

import React, { useState, useEffect } from 'react';
import { Building2, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { subscribeToClientsFromFirestore, ClientItem } from '@/core/services/firebase';

const DEFAULT_CLIENTS: ClientItem[] = [
  {
    id: 'def-1',
    name: 'BRAC',
    industry: 'NGO & Development',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'def-2',
    name: 'Navana Group',
    industry: 'Industrial & Automotive',
    logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'def-3',
    name: 'TECNO Mobile',
    industry: 'Electronics & Tech',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'def-4',
    name: 'Bangladesh Army',
    industry: 'Defense & Government',
    logoUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'def-5',
    name: 'Square Group',
    industry: 'Pharmaceuticals',
    logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'def-6',
    name: 'Walton Hi-Tech',
    industry: 'Home Appliances',
    logoUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400&auto=format&fit=crop',
  },
];

export const OurClientsSection: React.FC = () => {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsub = subscribeToClientsFromFirestore((data) => {
      if (data && data.length > 0) {
        setClients(data);
      } else {
        setClients(DEFAULT_CLIENTS);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const displayClients = clients.length > 0 ? clients : DEFAULT_CLIENTS;
  // Duplicate for seamless infinite marquee loop
  const marqueeClients = [...displayClients, ...displayClients, ...displayClients];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Frosted White Glass Card Container */}
      <div className="p-8 sm:p-12 rounded-3xl backdrop-blur-xl bg-white/85 border border-[#E2E8F0] shadow-xl relative overflow-hidden space-y-10">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00BCE1]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header: Woodistic 1:1 style with blue underline indicator */}
        <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00BCE1]/10 text-[#00BCE1] border border-[#00BCE1]/20 text-xs font-extrabold uppercase tracking-widest">
            <Building2 className="w-4 h-4 text-[#00BCE1]" /> CORPORATE PARTNERSHIPS
          </div>

          <div className="pt-2">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight uppercase inline-block relative">
              <span className="relative z-10">OUR CLIENTS</span>
              {/* Blue Underline Indicator Bar */}
              <span className="block h-1.5 w-full bg-gradient-to-r from-[#00BCE1] via-blue-500 to-[#00BCE1] rounded-full mt-2 shadow-[0_0_10px_rgba(0,188,225,0.5)]" />
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#64748B] pt-1 leading-relaxed max-w-xl mx-auto">
            Trusted by Bangladesh's leading enterprises, financial institutions, defense organizations, and NGOs for commercial water purification solutions.
          </p>
        </div>

        {/* Client Logos Marquee / Grid Container */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-slate-100 border border-slate-200" />
            ))}
          </div>
        ) : (
          <div className="space-y-8 relative z-10">
            {/* Infinite Horizontal Logo Marquee */}
            <div className="relative w-full overflow-hidden py-3 bg-gradient-to-r from-slate-50/50 via-slate-100/60 to-slate-50/50 rounded-2xl border border-slate-200/70 backdrop-blur-md">
              {/* Fade Gradient Edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

              <div className="flex w-max animate-marquee space-x-6 items-center">
                {marqueeClients.map((client, index) => (
                  <div
                    key={`${client.id}-${index}`}
                    className="flex-shrink-0 w-44 h-24 p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#00BCE1]/60 transition-all duration-300 flex flex-col items-center justify-center space-y-1.5 group"
                  >
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="max-h-12 max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="text-[11px] font-bold text-slate-800 group-hover:text-[#00BCE1] transition-colors truncate max-w-full">
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Structured Grid Showcase */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
              {displayClients.map((client) => (
                <div
                  key={client.id}
                  className="p-5 rounded-2xl bg-white/90 border border-slate-200/90 hover:border-[#00BCE1] hover:bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center space-y-3 group hover:-translate-y-1"
                >
                  <div className="w-full h-16 rounded-xl bg-slate-50/80 border border-slate-100 p-2 flex items-center justify-center overflow-hidden">
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="max-h-12 max-w-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] group-hover:text-[#00BCE1] transition-colors line-clamp-1">
                      {client.name}
                    </h4>
                    <span className="text-[10px] text-[#64748B] font-medium block truncate mt-0.5">
                      {client.industry || 'Corporate Partner'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Trust Badge Footer */}
        <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B] relative z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00BCE1]" />
            <span className="font-semibold text-slate-700">Commercial & Industrial RO Water Plants Installed Across Bangladesh</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="inline-flex items-center gap-1 font-bold text-[#00BCE1]">
              <Award className="w-3.5 h-3.5" /> 100% Quality Assurance
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
              <Sparkles className="w-3.5 h-3.5" /> 24/7 Dedicated Support
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
