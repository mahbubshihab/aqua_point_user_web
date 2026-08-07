'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  ShieldCheck, 
  TestTube, 
  Cpu, 
  Building2, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { fetchServicesFromFirestore, ServiceItem } from '@/core/services/firebase';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  TestTube,
  Cpu,
  Wrench,
  Shield: ShieldCheck,
  ShieldCheck,
  Building: Building2,
  Building2,
};

const STYLES = [
  { color: 'text-[#00BCE1]', bg: 'bg-[#F0F9FF]' },
  { color: 'text-[#10B981]', bg: 'bg-[#ECFDF5]' },
  { color: 'text-[#F59E0B]', bg: 'bg-[#FFFBEB]' },
  { color: 'text-purple-600', bg: 'bg-purple-50' },
  { color: 'text-blue-600', bg: 'bg-blue-50' },
];

export const ServicesHighlight: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      const dbServices = await fetchServicesFromFirestore();
      setServices(dbServices);
      setLoading(false);
    };
    loadServices();
  }, []);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00BCE1]/10 text-[#00BCE1] border border-[#00BCE1]/20 text-xs font-extrabold uppercase tracking-wide">
              🛠 DOORSTEP TECHNICIAN & CARE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-2">
              Water Treatment <span className="text-[#00BCE1]">Services</span> & Support
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              End-to-end water quality testing, professional installation, scheduled servicing, and industrial plant consulting.
            </p>
          </div>
          <Link
            href="/services"
            className="px-6 py-3 rounded-full bg-[#00BCE1] hover:bg-[#00A3C7] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 shrink-0"
          >
            <span>Book A Technician Service</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] animate-pulse space-y-4 shadow-sm h-52">
                <div className="w-11 h-11 rounded-xl bg-[#E2E8F0]" />
                <div className="h-4 bg-[#E2E8F0] rounded w-3/4" />
                <div className="h-3 bg-[#E2E8F0] rounded w-full" />
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="p-8 text-center bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] text-xs text-[#64748B]">
            0 services found. No services found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {services.map((service, idx) => {
              const IconComponent = (service.icon && ICON_MAP[service.icon]) || Wrench;
              const style = STYLES[idx % STYLES.length];
              return (
                <div
                  key={service.id || idx}
                  className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00BCE1] hover:bg-white transition-all duration-300 space-y-3 shadow-sm hover:shadow-lg flex flex-col justify-between hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-xl ${style.bg} flex items-center justify-center border border-[#E2E8F0]`}>
                        <IconComponent className={`w-5 h-5 ${style.color}`} />
                      </div>
                      {service.badge && (
                        <span className="text-[10px] font-extrabold text-[#64748B] bg-white px-2 py-0.5 rounded-full border border-[#E2E8F0]">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-extrabold text-[#0F172A]">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#10B981] pt-3 border-t border-[#E2E8F0]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Guaranteed Service</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
