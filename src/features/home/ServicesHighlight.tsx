'use client';

import React from 'react';
import Link from 'next/link';
import { Wrench, Shield, TestTube, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ServicesHighlight: React.FC = () => {
  const services = [
    {
      title: 'Free Installation',
      description: 'Expert technician setup for all home & commercial RO purifiers with free plumbing check.',
      icon: Cpu,
      color: 'text-[#00E5FF]',
      bg: 'bg-[#00E5FF]/10',
    },
    {
      title: 'Scheduled Servicing',
      description: 'Periodic cartridge replacement, RO membrane cleaning, and leakage inspection.',
      icon: Wrench,
      color: 'text-[#10B981]',
      bg: 'bg-[#10B981]/10',
    },
    {
      title: 'Annual Maintenance (AMC)',
      description: 'Hassle-free 365-day warranty cover, unlimited service visits, and free filter replacement.',
      icon: Shield,
      color: 'text-[#F59E0B]',
      bg: 'bg-[#F59E0B]/10',
    },
    {
      title: 'Water Quality Testing',
      description: 'Comprehensive lab analysis for TDS, pH, Iron, Arsenic, and microbial bacteria count.',
      icon: TestTube,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#131826] via-[#131826]/90 to-[#0A0D16] border border-[#1E2638] backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-[#10B981] uppercase tracking-widest">
              End-to-End Care
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Professional <span className="text-[#00E5FF]">Aqua Services</span> & Doorstep Support
            </h2>
          </div>
          <Link
            href="/services"
            className="px-6 py-3 rounded-xl bg-[#0A0D16] border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0A0D16] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2"
          >
            <span>Book A Technician Service</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0A0D16]/60 border border-[#1E2638] hover:border-[#00E5FF]/40 transition-all duration-300 space-y-4 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center border border-[#1E2638]`}>
                  <Icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#10B981] pt-2 border-t border-[#1E2638]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed Technicians</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
