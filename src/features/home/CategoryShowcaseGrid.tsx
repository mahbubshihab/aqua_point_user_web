'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Droplet, 
  Shield, 
  Flame, 
  Wrench, 
  Package, 
  Building,
  ArrowRight
} from 'lucide-react';

interface CategoryItem {
  id: string;
  title: string;
  categoryFilter: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  itemCount: string;
  imageUrl: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'ro-purifiers',
    title: 'RO Water Purifiers',
    categoryFilter: 'RO Purifiers',
    description: '7-Stage Livotec, Eureka Classic, open & stand frames...',
    icon: Droplet,
    itemCount: '12 Items',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cabinet-purifiers',
    title: 'Cabinet Purifiers',
    categoryFilter: 'Cabinet Purifiers',
    description: 'Glass Door Cabinet, Slim Cabinet, automated flushing...',
    icon: Shield,
    itemCount: '8 Items',
    imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'water-dispensers',
    title: 'Water Dispensers',
    categoryFilter: 'Dispensers',
    description: 'Pure X 100 GPD, Heron Hot & Cold, desktop & standing...',
    icon: Flame,
    itemCount: '15 Items',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'filter-cartridges',
    title: 'Filter Cartridges',
    categoryFilter: 'Filters & Media',
    description: '10"/20" PP Sediment, CTO Carbon, RO Membranes 75/100GPD...',
    icon: Wrench,
    itemCount: '24 Items',
    imageUrl: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'spare-parts-pumps',
    title: 'Spare Parts & Pumps',
    categoryFilter: 'Spare Parts',
    description: '24V Booster Pumps, Faucets, Solenoid Valves, Tanks...',
    icon: Package,
    itemCount: '32 Items',
    imageUrl: 'https://images.unsplash.com/photo-1585832770485-e68a5fcffd69?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'industrial-ro',
    title: 'Industrial RO Plants',
    categoryFilter: 'Industrial RO',
    description: '500 LPH to 5000 LPH plants, Iron Removal, Softeners...',
    icon: Building,
    itemCount: '6 Items',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  },
];

export const CategoryShowcaseGrid: React.FC = () => {
  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Layout */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00BCE1]/10 text-[#00BCE1] border border-[#00BCE1]/20 text-xs font-extrabold uppercase tracking-wide">
            🏷 STORE COLLECTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-2">
            Explore By Water Category
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mt-1.5">
            Hand-finished RO purifiers, cabinet filters, water dispensers, filter media, spare parts, and industrial RO plants.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm font-extrabold text-[#00BCE1] hover:text-[#00A3C7] transition-colors shrink-0 group"
        >
          <span>View All Products</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 6 Vertical Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className="group relative rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#00BCE1] transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
            >
              <div>
                {/* Image Container */}
                <div className="relative w-full h-44 bg-[#F8FAFC] overflow-hidden">
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Top Right Pill Badge: White pill showing item count */}
                  <div className="absolute top-3 right-3 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-slate-800 text-[11px] font-extrabold shadow-sm border border-slate-100">
                      {cat.itemCount}
                    </span>
                  </div>
                  {/* Bottom Left Badge: Circular Aqua Cyan (#00BCE1) icon button */}
                  <div className="absolute bottom-3 left-3 pointer-events-none">
                    <div className="w-9 h-9 rounded-full bg-[#00BCE1] text-white flex items-center justify-center shadow-md border-2 border-white">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  {/* Category Title */}
                  <h3 className="text-sm font-extrabold text-[#0F172A] group-hover:text-[#00BCE1] transition-colors line-clamp-1">
                    {cat.title}
                  </h3>
                  {/* Subtitle (2 lines) */}
                  <p className="text-[11px] text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Bottom Link */}
              <div className="p-4 pt-0">
                <Link
                  href={`/products?category=${encodeURIComponent(cat.categoryFilter)}`}
                  className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#00BCE1] hover:text-[#00A3C7] transition-colors group/link"
                >
                  <span>Browse Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

