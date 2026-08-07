'use client';

import React, { useState } from 'react';
import { Activity, ShieldCheck, Droplets, RefreshCw, CheckCircle2, Award } from 'lucide-react';

export const WaterQualityMeter: React.FC = () => {
  const [tds, setTds] = useState<number>(120);
  const [source, setSource] = useState<'tap' | 'tubewell' | 'surface'>('tubewell');

  const getStatus = (tdsVal: number) => {
    if (tdsVal <= 150) {
      return {
        label: '120 PPM EXCELLENT',
        color: 'text-[#10B981]',
        bgColor: 'bg-[#ECFDF5]',
        borderColor: 'border-[#A7F3D0]',
        badge: 'Sweet & Mineral Rich',
        ph: '7.2 - 7.5 (Balanced)',
        iron: '0.02 mg/L (Pristine)',
        hardness: '60 - 120 mg/L',
        recommendation: 'Optimal drinking standard. Aqua Point Mineral RO recommended for high purity.'
      };
    } else if (tdsVal <= 300) {
      return {
        label: 'GOOD QUALITY',
        color: 'text-[#0284C7]',
        bgColor: 'bg-[#F0F9FF]',
        borderColor: 'border-[#BAE6FD]',
        badge: 'Safe Drinking Water',
        ph: '6.9 - 7.3',
        iron: '0.15 mg/L',
        hardness: '150 - 220 mg/L',
        recommendation: 'Acceptable for human intake. 5-Stage UV+RO purifier recommended.'
      };
    } else if (tdsVal <= 600) {
      return {
        label: 'FAIR / MODERATE',
        color: 'text-[#F59E0B]',
        bgColor: 'bg-[#FFFBEB]',
        borderColor: 'border-[#FDE68A]',
        badge: 'Requires Filtration',
        ph: '6.5 - 6.8',
        iron: '0.80 mg/L (High Iron)',
        hardness: '280 - 450 mg/L',
        recommendation: 'Heavy metals & hard minerals detected. Aqua Point 7-Stage RO System mandatory.'
      };
    } else {
      return {
        label: 'HIGH RISK / UNHEALTHY',
        color: 'text-rose-600',
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-200',
        badge: 'Contaminated Source',
        ph: '6.0 - 6.4 (Acidic)',
        iron: '2.50+ mg/L (Severe Heavy Metals)',
        hardness: '500+ mg/L (Very Hard)',
        recommendation: 'Unsafe for consumption. Immediate Commercial/Residential RO Installation required!'
      };
    }
  };

  const currentStatus = getStatus(tds);

  return (
    <section id="water-quality" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl relative overflow-hidden">
        {/* Soft Ocean Aqua Accent Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0284C7]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Header & Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0F9FF] border border-[#BAE6FD]">
              <Activity className="w-4 h-4 text-[#0284C7] animate-pulse" />
              <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest">
                Aqua Point Real-Time Water Quality Analyzer
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Test & Calculate Your <span className="text-[#0284C7]">Water Quality</span> Meter
            </h2>

            <p className="text-sm text-[#475569] leading-relaxed">
              TDS (Total Dissolved Solids) measures minerals, salts, and metals in your water. Slide below to check your home water safety index.
            </p>

            {/* Source selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                Select Your Water Source
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'tubewell', name: 'Deep Tube Well' },
                  { id: 'tap', name: 'WASA Tap Water' },
                  { id: 'surface', name: 'Pond / River' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSource(s.id as any)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      source === s.id
                        ? 'bg-[#0284C7] border-[#0284C7] text-white shadow-sm'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* TDS Slider */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-[#0F172A]">
                  TDS Level Slider: <strong className="text-[#0284C7] text-lg">{tds} PPM</strong>
                </span>
                <button 
                  onClick={() => setTds(120)}
                  className="flex items-center gap-1 text-xs font-semibold text-[#0284C7] hover:underline"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset to 120 PPM
                </button>
              </div>

              <input
                type="range"
                min="50"
                max="1000"
                step="5"
                value={tds}
                onChange={(e) => setTds(Number(e.target.value))}
                className="w-full h-3 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#0284C7]"
              />

              <div className="flex justify-between text-[11px] font-bold text-[#64748B]">
                <span>50 PPM (Pure)</span>
                <span>150 PPM (Ideal)</span>
                <span>300 PPM (High)</span>
                <span>600+ PPM (Dangerous)</span>
              </div>
            </div>
          </div>

          {/* Telemetry Display Card */}
          <div className="lg:col-span-5">
            <div className={`p-6 rounded-2xl bg-white border ${currentStatus.borderColor} space-y-6 shadow-lg relative`}>
              
              {/* Badge */}
              <div className="flex items-center justify-between">
                <div className={`px-4 py-2 rounded-xl ${currentStatus.bgColor} border ${currentStatus.borderColor} flex items-center gap-2 shadow-sm`}>
                  <Droplets className={`w-5 h-5 ${currentStatus.color}`} />
                  <span className={`text-sm font-extrabold ${currentStatus.color}`}>
                    {currentStatus.label}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#475569] flex items-center gap-1">
                  <Award className="w-4 h-4 text-[#F59E0B]" />
                  {currentStatus.badge}
                </span>
              </div>

              {/* Parameter Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <span className="text-[11px] text-[#64748B] uppercase font-bold">TDS Content</span>
                  <div className={`text-lg font-extrabold ${currentStatus.color}`}>{tds} PPM</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <span className="text-[11px] text-[#64748B] uppercase font-bold">pH Level</span>
                  <div className="text-lg font-extrabold text-[#0F172A]">{currentStatus.ph}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <span className="text-[11px] text-[#64748B] uppercase font-bold">Iron Content</span>
                  <div className="text-lg font-extrabold text-[#0F172A]">{currentStatus.iron}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <span className="text-[11px] text-[#64748B] uppercase font-bold">Hardness</span>
                  <div className="text-lg font-extrabold text-[#0F172A]">{currentStatus.hardness}</div>
                </div>
              </div>

              {/* Recommendation Box */}
              <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#0284C7]">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>Aqua Point Expert Verdict:</span>
                </div>
                <p className="text-[#334155] leading-relaxed">
                  {currentStatus.recommendation}
                </p>
              </div>

              <a
                href="/services"
                className="w-full py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Book Free Water Quality Test</span>
                <CheckCircle2 className="w-4 h-4" />
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
