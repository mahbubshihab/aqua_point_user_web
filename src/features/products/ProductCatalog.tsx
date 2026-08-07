'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X, Droplets } from 'lucide-react';
import { fetchProductsFromFirestore, ProductItem } from '@/core/services/firebase';
import { SAMPLE_PRODUCTS } from '@/core/data/sampleProducts';
import { ProductCatalogHeader } from './ProductCatalogHeader';
import { ProductCard } from './ProductCard';

export const ProductCatalog: React.FC = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Products';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [priceSort, setPriceSort] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const dbData = await fetchProductsFromFirestore();
      if (dbData && dbData.length > 0) {
        setProducts(dbData);
      } else {
        setProducts(SAMPLE_PRODUCTS);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  // Category matching logic
  const matchesCategoryFilter = (product: ProductItem, pill: string) => {
    if (pill === 'All Products' || pill === 'All') return true;

    const catLower = product.category.toLowerCase();
    const nameLower = product.name.toLowerCase();

    if (pill === 'RO Purifiers') {
      return catLower.includes('ro purifiers') || catLower === 'ro purifiers';
    }
    if (pill === 'Cabinet Filters') {
      return catLower.includes('cabinet') || nameLower.includes('cabinet');
    }
    if (pill === 'Dispensers') {
      return catLower.includes('dispenser') || nameLower.includes('dispenser');
    }
    if (pill === 'Filters & Media') {
      return catLower.includes('filter') || catLower.includes('media') || nameLower.includes('filter') || nameLower.includes('carbon');
    }
    if (pill === 'Spare Parts') {
      return catLower.includes('spare') || catLower.includes('parts') || nameLower.includes('membrane') || nameLower.includes('pump') || nameLower.includes('valve');
    }
    if (pill === 'Industrial RO') {
      return catLower.includes('industrial') || nameLower.includes('industrial') || nameLower.includes('lph');
    }

    return product.category === pill;
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((item) => {
    const matchesCategory = matchesCategoryFilter(item, selectedCategory);
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (priceSort === 'low-to-high') return a.price - b.price;
    if (priceSort === 'high-to-low') return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* 4. Catalog Section Header & Filter Pills */}
      <ProductCatalogHeader
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        totalCount={filteredProducts.length}
      />

      {/* Search & Sort Controls Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-[#475569]">
          <span>Showing {filteredProducts.length} items for</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#E0F7FA] text-[#00BCE1] font-extrabold">
            {selectedCategory}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2 pl-8 pr-8 text-xs text-[#0F172A] focus:outline-none focus:bg-white focus:border-[#00BCE1]"
            />
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#94A3B8]" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2 top-2.5 text-[#94A3B8] hover:text-[#0F172A]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <select
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value as any)}
            className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2 px-3 text-xs font-bold text-[#475569] focus:outline-none focus:border-[#00BCE1]"
          >
            <option value="default">Sort by Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* 5. Product Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-96 rounded-[16px] bg-white border border-[#E2E8F0] animate-pulse p-4 space-y-4 shadow-sm">
              <div className="w-full h-48 bg-[#F1F5F9] rounded-xl" />
              <div className="h-4 bg-[#F1F5F9] rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
          <Droplets className="w-12 h-12 text-[#94A3B8] mx-auto" />
          <h3 className="text-lg font-bold text-[#0F172A]">No Products Found</h3>
          <p className="text-xs text-[#475569]">Try clearing your search query or selecting a different category filter.</p>
          <button
            onClick={() => { setSelectedCategory('All Products'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-[#00BCE1] text-white font-bold text-xs shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
