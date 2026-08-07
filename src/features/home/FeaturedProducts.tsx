'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Star, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { fetchProductsFromFirestore, ProductItem } from '@/core/services/firebase';
import { SAMPLE_PRODUCTS } from '@/core/data/sampleProducts';
import { useCart } from '@/core/context/CartContext';

export const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      const dbProducts = await fetchProductsFromFirestore();
      if (dbProducts && dbProducts.length > 0) {
        setProducts(dbProducts.slice(0, 4));
      } else {
        setProducts(SAMPLE_PRODUCTS.slice(0, 4));
      }
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product: ProductItem) => {
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-widest">
            Best Sellers & Recommendations
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Featured <span className="text-[#00E5FF]">RO Water Systems</span> & Parts
          </h2>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#10B981] hover:text-[#00E5FF] transition-colors"
        >
          <span>Explore All Products Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-96 rounded-2xl bg-[#131826]/60 border border-[#1E2638] animate-pulse p-4 space-y-4">
              <div className="w-full h-48 bg-[#1E2638] rounded-xl" />
              <div className="h-4 bg-[#1E2638] rounded w-3/4" />
              <div className="h-4 bg-[#1E2638] rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-2xl bg-[#131826]/80 border border-[#1E2638] hover:border-[#00E5FF]/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative w-full h-52 bg-[#0A0D16] overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#0A0D16]/80 border border-[#00E5FF]/30 text-[10px] font-bold text-[#00E5FF]">
                    {product.category}
                  </span>
                </div>
                {product.rating && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#131826]/90 border border-[#1E2638] text-[11px] text-amber-400 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-[#1E2638]">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#10B981] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="truncate">{product.warranty}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-extrabold text-white">
                        ৳{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-500 line-through ml-2">
                          ৳{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-1.5 text-xs font-bold ${
                        addedIds[product.id]
                          ? 'bg-[#10B981] border-[#10B981] text-[#0A0D16]'
                          : 'bg-[#131826] border-[#1E2638] text-slate-200 hover:text-[#00E5FF] hover:border-[#00E5FF]/50'
                      }`}
                    >
                      {addedIds[product.id] ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 text-[#00E5FF]" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
