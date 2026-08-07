'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  ShoppingCart, 
  ShieldCheck, 
  Star, 
  Check, 
  X,
  Droplets,
} from 'lucide-react';
import { fetchProductsFromFirestore, ProductItem } from '@/core/services/firebase';
import { SAMPLE_PRODUCTS } from '@/core/data/sampleProducts';
import { useCart } from '@/core/context/CartContext';

const CATEGORIES = [
  'All',
  'RO Purifiers',
  'Water Filters',
  'Spare Parts',
  'Industrial RO Plants'
];

export const ProductCatalog: React.FC = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [priceSort, setPriceSort] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const { addToCart } = useCart();

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

  const handleAddToCart = (product: ProductItem) => {
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#F0F9FF] via-white to-[#F8FAFC] border border-[#BAE6FD] space-y-3 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#BAE6FD] text-xs font-bold text-[#0284C7] shadow-sm">
          <Droplets className="w-3.5 h-3.5" /> 100% Certified Purification Range
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Aqua Point <span className="text-[#0284C7]">Product Catalog</span>
        </h1>
        <p className="text-sm text-[#475569] max-w-2xl">
          Browse luxury Woodistic glass RO drinking water purifiers, replacement filter cartridges, high rejection membranes, and heavy industrial water plants.
        </p>
      </div>

      {/* Filter & Controls Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#0284C7] text-white shadow-sm'
                  : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2 pl-3 pr-8 text-xs text-[#0F172A] focus:outline-none focus:bg-white focus:border-[#0284C7]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2 top-2 text-[#94A3B8] hover:text-[#0F172A]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <select
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value as any)}
            className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2 px-3 text-xs text-[#475569] focus:outline-none focus:border-[#0284C7]"
          >
            <option value="default">Sort by Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Category Subheader */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-xl font-bold text-[#0F172A]">
          {selectedCategory === 'All' ? 'All RO Purifiers & Spare Parts' : selectedCategory}
          <span className="text-xs font-semibold text-[#64748B] ml-2 font-normal">
            ({filteredProducts.length} items found)
          </span>
        </h2>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-96 rounded-2xl bg-white border border-[#E2E8F0] animate-pulse p-4 space-y-4 shadow-sm">
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
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-[#0284C7] text-white font-bold text-xs shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative w-full h-60 bg-[#F8FAFC] overflow-hidden border-b border-[#E2E8F0]">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/90 border border-[#BAE6FD] text-[11px] font-bold text-[#0284C7] shadow-sm">
                    {product.category}
                  </span>
                </div>
                {product.rating && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 border border-[#E2E8F0] text-xs text-amber-500 font-bold shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#475569] mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-4 pt-3 border-t border-[#E2E8F0]">
                  <div className="flex items-center gap-2 text-xs text-[#10B981] font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span className="truncate">{product.warranty}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-extrabold text-[#0F172A]">
                        ৳{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#94A3B8] line-through ml-2">
                          ৳{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="px-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-all"
                      >
                        Details
                      </Link>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`px-3.5 py-2 rounded-xl border transition-all duration-300 flex items-center gap-1.5 text-xs font-bold ${
                          addedIds[product.id]
                            ? 'bg-[#10B981] border-[#10B981] text-white'
                            : 'bg-[#0284C7] border-[#0284C7] text-white hover:bg-[#0369A1] shadow-sm'
                        }`}
                      >
                        {addedIds[product.id] ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Order Now</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
