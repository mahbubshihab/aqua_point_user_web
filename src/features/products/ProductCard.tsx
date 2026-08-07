'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Plus, Check } from 'lucide-react';
import { ProductItem } from '@/core/services/firebase';
import { useCart } from '@/core/context/CartContext';

interface ProductCardProps {
  product: ProductItem;
  topRightTag?: string;
  bottomLeftBadge?: string;
  isNew?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  topRightTag,
  bottomLeftBadge,
  isNew = true,
}) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  // Tag helper
  const getTopRightTag = () => {
    if (topRightTag) return topRightTag;
    if (product.category === 'RO Purifiers') return 'RO 7-Stage';
    if (product.category === 'Cabinet Purifiers' || product.category === 'Cabinet Filters') return 'Cabinet';
    if (product.category === 'Dispensers' || product.category === 'Water Dispensers') return 'Dispenser';
    if (product.category === 'Spare Parts') return 'Spare Part';
    if (product.category === 'Industrial RO Plants' || product.category === 'Industrial RO') return 'Industrial';
    return 'RO 7-Stage';
  };

  const getBottomLeftBadge = () => {
    if (bottomLeftBadge) return bottomLeftBadge;
    if (product.category === 'Spare Parts') return '75 GPD';
    if (product.category === 'Water Filters' || product.category === 'Filters & Media') return '5 Micron';
    if (product.category === 'Industrial RO Plants') return '500 LPH';
    return 'TDS: < 50 PPM';
  };

  return (
    <div className="group rounded-[16px] bg-white border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#0284C7]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1">
      {/* Product Image Container */}
      <div className="relative w-full h-56 bg-[#F8FAFC] overflow-hidden border-b border-[#E2E8F0] flex items-center justify-center">
        <Link href={`/products/${product.id}`} className="w-full h-full block">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Top Right Badge: Rounded pill tag in #0284C7 */}
        <div className="absolute top-3 right-3 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-[#0284C7] text-white text-[11px] font-extrabold shadow-md shadow-sky-500/20">
            {getTopRightTag()}
          </span>
        </div>

        {/* Bottom Left Badge: "TDS: < 50 PPM" or "75 GPD" */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold tracking-wide shadow-sm border border-white/10">
            {getBottomLeftBadge()}
          </span>
        </div>

        {/* Bottom Right Badge: "NEW" (Orange #F97316) */}
        {isNew && (
          <div className="absolute bottom-3 right-3 pointer-events-none">
            <span className="px-2.5 py-0.5 rounded-full bg-[#F97316] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
              NEW
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Top Row: Category name on left, Star Rating on right */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#64748B] uppercase tracking-wider text-[11px]">
              {product.category || 'RO Water Purifiers'}
            </span>
            <div className="flex items-center gap-1 font-extrabold text-[#0F172A] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating ? product.rating.toFixed(1) : '4.9'}</span>
            </div>
          </div>

          {/* Bold Product Title */}
          <Link href={`/products/${product.id}`}>
            <h3 className="text-base font-extrabold text-[#0F172A] group-hover:text-[#0284C7] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Bottom Row: Price on left, filled ocean blue + Add button on right */}
        <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs font-semibold text-[#94A3B8] line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-lg font-black text-[#0F172A]">
              ৳{product.price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center gap-1.5 shadow-md ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-emerald-500/25 scale-95'
                : 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-sky-500/25 active:scale-95'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
