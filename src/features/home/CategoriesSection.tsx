'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { subscribeToCategoriesFromFirestore, CategoryItem } from '@/core/services/firebase';

const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: 'ro-purifiers',
    name: 'RO Purifiers',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cabinet-purifiers',
    name: 'Cabinet Purifiers',
    imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'water-dispensers',
    name: 'Water Dispensers',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'filters-media',
    name: 'Filters & Media',
    imageUrl: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'spare-parts',
    name: 'Spare Parts',
    imageUrl: 'https://images.unsplash.com/photo-1585832770485-e68a5fcffd69?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'industrial-ro',
    name: 'Industrial RO',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  },
];

export const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES);

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
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
          Categories
        </h2>
      </div>

      {/* Clean Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat) => {
          const imgSrc = cat.imageUrl || 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=600&q=80';

          return (
            <Link
              key={cat.id}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden hover:border-[#00BCE1] hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Image Container with Smooth Zoom Effect */}
              <div className="relative w-full aspect-[4/3] bg-[#F8FAFC] overflow-hidden">
                <img
                  src={imgSrc}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>

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
