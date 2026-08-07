'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Droplet, 
  Box, 
  Flame, 
  Filter, 
  Cpu, 
  Factory,
  ArrowRight
} from 'lucide-react';

interface CategoryItem {
  id: string;
  title: string;
  categoryFilter: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  bgGradient: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'ro-purifiers',
    title: 'RO Water Purifiers',
    categoryFilter: 'RO Purifiers',
    description: '7-Stage Livotec, Eureka Classic, open & stand frames...',
    icon: Droplet,
    badge: 'Best Seller',
    bgGradient: 'from-sky-50 to-blue-50/50',
  },
  {
    id: 'cabinet-purifiers',
    title: 'Cabinet Purifiers',
    categoryFilter: 'Cabinet Purifiers',
    description: 'Glass Door Cabinet, Slim Cabinet, automated flushing...',
    icon: Box,
    badge: 'Modern Glass',
    bgGradient: 'from-blue-50 to-indigo-50/50',
  },
  {
    id: 'water-dispensers',
    title: 'Water Dispensers',
    categoryFilter: 'Dispensers',
    description: 'Pure X 100 GPD, Heron Hot & Cold, desktop & standing...',
    icon: Flame,
    badge: 'Hot & Cold',
    bgGradient: 'from-cyan-50 to-sky-50/50',
  },
  {
    id: 'filters-cartridges',
    title: 'Filters & Cartridges',
    categoryFilter: 'Filters & Media',
    description: '10"/20" PP Sediment, CTO Carbon, RO Membranes 75/100GPD...',
    icon: Filter,
    badge: 'Replacement',
    bgGradient: 'from-teal-50 to-emerald-50/50',
  },
  {
    id: 'spare-parts-pumps',
    title: 'Spare Parts & Pumps',
    categoryFilter: 'Spare Parts',
    description: '24V Booster Pumps, Faucets, Solenoid Valves, Tanks...',
    icon: Cpu,
    badge: 'Original Parts',
    bgGradient: 'from-slate-50 to-sky-50/50',
  },
  {
    id: 'industrial-ro',
    title: 'Industrial RO Plants',
    categoryFilter: 'Industrial RO',
    description: '500 LPH to 5000 LPH plants, Iron Removal, Softeners...',
    icon: Factory,
    badge: 'Commercial',
    bgGradient: 'from-indigo-50 to-slate-50/50',
  },
];

export const CategoryShowcaseGrid: React.FC = () => {
  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-xs font-bold text-[#00BCE1]">
            <span>💧</span> EXPLORE WATER PURIFICATION CATEGORIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-2">
            Complete Purification <span className="text-[#00BCE1]">Solutions</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-md">
          Explore our certified range of domestic drinking RO systems, luxury glass cabinets, commercial dispensers, and industrial water treatment plants.
        </p>
      </div>

      {/* 6-Category Feature Grid: Exactly 6 white cards in a row (or 3x2 / 6-col responsive grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className="group relative rounded-2xl bg-white border border-[#E2E8F0] p-4 flex flex-col justify-between hover:border-[#00BCE1] hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.bgGradient} border border-[#BAE6FD]/40 flex items-center justify-center text-[#00BCE1] group-hover:bg-[#00BCE1] group-hover:text-white transition-colors duration-300 shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[10px] font-bold text-[#64748B] group-hover:bg-[#E0F7FA] group-hover:text-[#00BCE1] transition-colors">
                    {cat.badge}
                  </span>
                </div>

                {/* Category Title */}
                <h3 className="text-sm font-extrabold text-[#0F172A] group-hover:text-[#00BCE1] transition-colors line-clamp-1">
                  {cat.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Browse Catalog Button Link */}
              <div className="pt-4 mt-3 border-t border-[#F1F5F9]">
                <Link
                  href={`/products?category=${encodeURIComponent(cat.categoryFilter)}`}
                  className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#00BCE1] hover:text-[#00A3C7] transition-colors group/link"
                >
                  <span>Browse Catalog</span>
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
