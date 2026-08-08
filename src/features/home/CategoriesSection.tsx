'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { subscribeToCategoriesFromFirestore, CategoryItem } from '@/core/services/firebase';

export const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCategoriesFromFirestore((fetchedCategories) => {
      if (fetchedCategories && fetchedCategories.length > 0) {
        setCategories(fetchedCategories);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Minimal Header */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Categories
          </h2>
        </div>
      )}

      {/* Clean Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat) => {
          const imgSrc = cat.imageUrl;

          return (
            <Link
              key={cat.id}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden hover:border-[#00BCE1] hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Image Container with Smooth Zoom Effect */}
              {imgSrc && (
                <div className="relative w-full aspect-[4/3] bg-[#F8FAFC] overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>
              )}

              {/* Clean Category Name */}
              <div className="p-3.5 text-center bg-white border-t border-[#F1F5F9] flex items-center justify-center min-h-[52px]">
                <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#00BCE1] transition-colors line-clamp-1">
                  {cat.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
