'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchProductsFromFirestore, ProductItem } from '@/core/services/firebase';
import { SAMPLE_PRODUCTS } from '@/core/data/sampleProducts';
import { ProductCard } from '@/features/products/ProductCard';

export const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const dbProducts = await fetchProductsFromFirestore();
      if (dbProducts && dbProducts.length > 0) {
        setProducts(dbProducts);
      } else {
        setProducts(SAMPLE_PRODUCTS);
      }
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-extrabold text-[#00BCE1] uppercase tracking-widest bg-[#F0F9FF] px-3 py-1 rounded-full border border-[#BAE6FD]">
            BEST SELLERS & POPULAR PURIFIERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-2">
            Featured <span className="text-[#00BCE1]">RO Water Systems</span> & Parts
          </h2>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#00BCE1] hover:text-[#00A3C7] transition-colors"
        >
          <span>Explore All Products Catalog</span>
          <ArrowRight className="w-4 h-4" />
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
