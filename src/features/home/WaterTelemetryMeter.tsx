'use client';

import React, { useState } from 'react';
import { Activity, ShieldCheck, AlertTriangle, Droplets, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

export const WaterTelemetryMeter: React.FC = () => {
  const [tds, setTds] = useState<number>(120);
  const [source, setSource] = useState<'tap' | 'tubewell' | 'surface'>('tubewell');

  const getStatus = (tdsVal: number) => {
    if (tdsVal <= 150) {
      return {
        label: '120 PPM EXCELLENT',
        color: 'text-[#10B981]',
        bgColor: 'bg-[#10B981]/15',
        borderColor: 'border-[#10B981]/40',
        badge: 'Sweet & Mineral Rich',
        ph: '7.2 - 7.5 (Balanced)',
        iron: '0.02 mg/L (Pristine)',
        hardness: '60 - 120 mg/L',
        recommendation: 'Optimal drinking standard. Aqua Point Mineral RO recommended for high purity.'
      };
    } else if (tdsVal <= 300) {
      return {
        label: 'GOOD QUALITY',
        color: 'text-[#00E5FF]',
        bgColor: 'bg-[#00E5FF]/15',
        borderColor: 'border-[#00E5FF]/40',
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
        bgColor: 'bg-[#F59E0B]/15',
        borderColor: 'border-[#F59E0B]/40',
        badge: 'Requires Filtration',
        ph: '6.5 - 6.8',
        iron: '0.80 mg/L (High Iron)',
        hardness: '280 - 450 mg/L',
        recommendation: 'Heavy metals & hard minerals detected. Aqua Point 7-Stage RO System mandatory.'
      };
    } else {
      return {
        label: 'HIGH RISK / UNHEALTHY',
        color: 'text-rose-500',
        bgColor: 'bg-rose-500/15',
        borderColor: 'border-rose-500/40',
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
    <section id="water-telemetry" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-12 rounded-3xl bg-[#131826]/80 border border-[#1E2638] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Header & Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0D16] border border-[#1E2638]">
              <Activity className="w-4 h-4 text-[#00E5FF] animate-pulse" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                Aqua Point Real-Time Water Quality Analyzer
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Test & Calculate Your <span className="text-[#00E5FF]">Water Quality</span> Meter
            </h2>

            <p className="text-sm text-slate-400 leading-relaxed">
              TDS (Total Dissolved Solids) measures minerals, salts, and metals in your water. Slide below to check your home water safety index.
            </p>

            {/* Source selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
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
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      source === s.id
                        ? 'bg-[#1E2638] border-[#00E5FF] text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                        : 'bg-[#0A0D16]/60 border-[#1E2638] text-slate-400 hover:text-slate-200'
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
                <span className="text-sm font-semibold text-slate-300">
                  TDS Level Slider: <strong className="text-[#00E5FF] text-lg">{tds} PPM</strong>
                </span>
                <button 
                  onClick={() => setTds(120)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-[#00E5FF]"
                >
                  <RefreshCw className="w-3 h-3" /> Reset to 120 PPM
                </button>
              </div>

              <input
                type="range"
                min="50"
                max="1000"
                step="5"
                value={tds}
                onChange={(e) => setTds(Number(e.target.value))}
                className="w-full h-3 bg-[#0A0D16] rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
              />

              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <span>50 PPM (Pure)</span>
                <span>150 PPM (Ideal)</span>
                <span>300 PPM (High)</span>
                <span>600+ PPM (Dangerous)</span>
              </div>
            </div>
          </div>

          {/* Telemetry Display Card */}
          <div className="lg:col-span-5">
            <div className={`p-6 rounded-2xl bg-[#0A0D16]/90 border ${currentStatus.borderColor} backdrop-blur-xl space-y-6 shadow-2xl relative`}>
              
              {/* Badge */}
              <div className="flex items-center justify-between">
                <div className={`px-4 py-2 rounded-xl ${currentStatus.bgColor} border ${currentStatus.borderColor} flex items-center gap-2`}>
                  <Droplets className={`w-5 h-5 ${currentStatus.color}`} />
                  <span className={`text-sm font-extrabold ${currentStatus.color}`}>
                    {currentStatus.label}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {currentStatus.badge}
                </span>
              </div>

              {/* Parameter Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-xl bg-[#131826] border border-[#1E2638] space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">TDS Content</span>
                  <div className={`text-lg font-bold ${currentStatus.color}`}>{tds} PPM</div>
                </div>
                <div className="p-3 rounded-xl bg-[#131826] border border-[#1E2638] space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">pH Level</span>
                  <div className="text-lg font-bold text-white">{currentStatus.ph}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#131826] border border-[#1E2638] space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Iron Content</span>
                  <div className="text-lg font-bold text-white">{currentStatus.iron}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#131826] border border-[#1E2638] space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Hardness</span>
                  <div className="text-lg font-bold text-white">{currentStatus.hardness}</div>
                </div>
              </div>

              {/* Recommendation Box */}
              <div className="p-4 rounded-xl bg-[#131826]/80 border border-[#1E2638] text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>Aqua Point Expert Verdict:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {currentStatus.recommendation}
                </p>
              </div>

              <a
                href="/services"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#10B981] text-[#0A0D16] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(0,229,255,0.3)]"
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
