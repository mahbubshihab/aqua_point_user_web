'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  ShieldCheck, 
  Star, 
  Check, 
  SlidersHorizontal,
  X,
  Droplets,
  Zap
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
  const [quickOrderProduct, setQuickOrderProduct] = useState<ProductItem | null>(null);
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
      
      {/* Header Title */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#131826] via-[#1E2638] to-[#131826] border border-[#1E2638] backdrop-blur-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0D16] border border-[#00E5FF]/30 text-xs font-bold text-[#00E5FF]">
          <Droplets className="w-3.5 h-3.5" /> 100% Certified Purification Range
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Aqua Point <span className="text-[#00E5FF]">Product Catalog</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Browse luxury RO drinking water purifiers, replacement filter cartridges, high rejection membranes, and heavy industrial water plants.
        </p>
      </div>

      {/* Filter & Controls Bar */}
      <div className="p-4 rounded-2xl bg-[#131826]/80 border border-[#1E2638] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#10B981] text-[#0A0D16] shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                  : 'bg-[#0A0D16]/60 border border-[#1E2638] text-slate-300 hover:text-white hover:bg-[#1E2638]'
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
              className="w-full bg-[#0A0D16] border border-[#1E2638] rounded-xl py-2 pl-3 pr-8 text-xs text-slate-200 focus:outline-none focus:border-[#00E5FF]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2 top-2 text-slate-500 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <select
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value as any)}
            className="bg-[#0A0D16] border border-[#1E2638] rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-[#00E5FF]"
          >
            <option value="default">Sort by Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-96 rounded-2xl bg-[#131826]/60 border border-[#1E2638] animate-pulse p-4 space-y-4">
              <div className="w-full h-48 bg-[#1E2638] rounded-xl" />
              <div className="h-4 bg-[#1E2638] rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-[#131826]/40 border border-[#1E2638] space-y-4">
          <Droplets className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Products Found</h3>
          <p className="text-xs text-slate-400">Try clearing your search query or selecting a different category filter.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-[#00E5FF] text-[#0A0D16] font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-[#131826]/80 border border-[#1E2638] hover:border-[#00E5FF]/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative w-full h-60 bg-[#0A0D16] overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#0A0D16]/80 border border-[#00E5FF]/30 text-[11px] font-bold text-[#00E5FF]">
                    {product.category}
                  </span>
                </div>
                {product.rating && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#131826]/90 border border-[#1E2638] text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-4 pt-3 border-t border-[#1E2638]">
                  <div className="flex items-center gap-2 text-xs text-[#10B981] font-semibold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span className="truncate">{product.warranty}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-extrabold text-white">
                        ৳{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-500 line-through ml-2">
                          ৳{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="px-3 py-2 rounded-xl bg-[#0A0D16] border border-[#1E2638] text-xs font-bold text-slate-300 hover:text-white hover:border-slate-500 transition-all"
                      >
                        Details
                      </Link>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`px-3.5 py-2 rounded-xl border transition-all duration-300 flex items-center gap-1.5 text-xs font-bold ${
                          addedIds[product.id]
                            ? 'bg-[#10B981] border-[#10B981] text-[#0A0D16]'
                            : 'bg-gradient-to-r from-[#00E5FF] to-[#10B981] border-transparent text-[#0A0D16] hover:scale-105'
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
                            <span>Order</span>
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
