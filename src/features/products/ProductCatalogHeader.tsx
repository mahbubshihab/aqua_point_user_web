'use client';

import React from 'react';
import { Droplet, Sparkles } from 'lucide-react';

export const FILTER_PILLS = [
  'All Products',
  'RO Purifiers',
  'Cabinet Filters',
  'Dispensers',
  'Filters & Media',
  'Spare Parts',
  'Industrial RO',
] as const;

export type FilterCategory = (typeof FILTER_PILLS)[number];

interface ProductCatalogHeaderProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  totalCount?: number;
}

export const ProductCatalogHeader: React.FC<ProductCatalogHeaderProps> = ({
  selectedCategory,
  onSelectCategory,
  totalCount,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#F0F9FF] via-white to-[#F8FAFC] border border-[#BAE6FD] shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#0284C7]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        
        {/* Pill badge: COMPLETE PURIFICATION CATALOG */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#BAE6FD] text-xs font-bold text-[#0284C7] shadow-sm">
          <Droplet className="w-3.5 h-3.5 fill-[#0284C7]" />
          <span>COMPLETE PURIFICATION CATALOG</span>
        </div>

        {/* Section Title: All Water Purification Products */}
        <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-3">
          All Water Purification <span className="text-[#0284C7]">Products</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-[#475569] max-w-2xl mt-2 leading-relaxed">
          Browse our complete catalog across all water treatment categories. Certified, lab-tested, and engineered to last.
        </p>

        {typeof totalCount === 'number' && (
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0369A1] bg-sky-100/60 px-3 py-1 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Showing {totalCount} lab-certified products</span>
          </div>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
        {FILTER_PILLS.map((pill) => {
          const isActive = selectedCategory === pill || (pill === 'All Products' && selectedCategory === 'All');
          return (
            <button
              key={pill}
              onClick={() => onSelectCategory(pill)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                isActive
                  ? 'bg-[#0284C7] text-white shadow-sm shadow-sky-500/25'
                  : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
              }`}
            >
              {pill}
            </button>
          );
        })}
      </div>
    </div>
  );
};
