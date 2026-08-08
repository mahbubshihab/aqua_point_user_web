'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { subscribeToProductsByTypeFromFirestore, ProductItem } from '@/core/services/firebase';
import { ProductCard } from '@/features/products/ProductCard';

interface ProductTypeSectionProps {
  type: 'open_type' | 'box_type' | 'hot_cold_normal' | 'cabinet_type';
  title: string;
  subtitle?: string;
  badgeTag?: string;
}

export const ProductTypeSection: React.FC<ProductTypeSectionProps> = ({
  type,
  title,
  subtitle,
  badgeTag,
}) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 100% server-side Firestore query: query(collection(db, 'products'), where('type', '==', type), limit(12))
    const unsubscribe = subscribeToProductsByTypeFromFirestore(type, (fetchedProducts) => {
      setProducts(fetchedProducts || []);
      setLoading(false);
    }, 12);

    return () => unsubscribe();
  }, [type]);

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          {badgeTag && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00BCE1]/10 text-[#00BCE1] border border-[#00BCE1]/20 text-xs font-extrabold uppercase tracking-wide">
              {badgeTag}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1.5">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <Link
          href={`/products?type=${type}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#00BCE1] hover:text-[#00A3C7] transition-colors shrink-0 group"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-96 rounded-[16px] bg-white border border-[#E2E8F0] animate-pulse p-4 space-y-4 shadow-sm">
              <div className="w-full h-48 bg-[#F1F5F9] rounded-xl" />
              <div className="h-4 bg-[#F1F5F9] rounded w-3/4" />
              <div className="h-4 bg-[#F1F5F9] rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-[#E2E8F0] text-xs text-[#64748B]">
          No products available in {title} at this time.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
