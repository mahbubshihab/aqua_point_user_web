'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Search, 
  ShoppingBag, 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  User,
  Wrench,
  Sparkles,
  MapPin,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useCart } from '@/core/context/CartContext';
import { ProductItem, fetchProductsFromFirestore, searchProductsFromFirestore, fetchCompanyInfoFromFirestore, CompanyInfo } from '@/core/services/firebase';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [searchResults, setSearchResults] = useState<ProductItem[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    fetchCompanyInfoFromFirestore().then(info => {
      if (info) setCompanyInfo(info);
    }).catch(() => {});
  }, []);

  const quickSearchTags = [
    'RO Water Purifier',
    'Alkaline Filter',
    'Water Dispenser',
    'TDS Meter',
    'UV Sterilizer',
    'Filter Cartridge'
  ];

  // Prefetch products from Firestore when search bar is focused
  useEffect(() => {
    if (isSearchFocused && allProducts.length === 0) {
      setIsSearching(true);
      fetchProductsFromFirestore(undefined, 50).then((prods) => {
        if (prods && prods.length > 0) {
          setAllProducts(prods);
        }
        setIsSearching(false);
      }).catch(() => setIsSearching(false));
    }
  }, [isSearchFocused, allProducts.length]);

  // Dynamic live search filtering as user types letter-by-letter
  useEffect(() => {
    const term = searchQuery.trim().toLowerCase();
    setSelectedIndex(-1);

    if (!term) {
      setSearchResults([]);
      return;
    }

    // 1. Instant local match for 0ms latency if allProducts is loaded
    if (allProducts.length > 0) {
      const matched = allProducts.filter((p) =>
        p.name?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term) ||
        p.type?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
      ).slice(0, 5);
      setSearchResults(matched);
    }

    // 2. Fetch up-to-date dynamic results from Firestore
    const timer = setTimeout(() => {
      setIsSearching(true);
      searchProductsFromFirestore(searchQuery, 5).then((remoteResults) => {
        if (remoteResults) {
          setSearchResults(remoteResults);
        }
        setIsSearching(false);
      }).catch(() => setIsSearching(false));
    }, 150);

    return () => clearTimeout(timer);
  }, [searchQuery, allProducts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    router.push(`/products?search=${encodeURIComponent(tag)}`);
    setIsSearchFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (searchResults.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % searchResults.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (searchResults.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
      }
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && searchResults[selectedIndex]) {
        e.preventDefault();
        router.push(`/products/${searchResults[selectedIndex].id}`);
        setIsSearchFocused(false);
        setSearchQuery('');
      }
    } else if (e.key === 'Escape') {
      setIsSearchFocused(false);
    }
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-300">
      {/* 1. Top Bar Component - Sleek #0369A1 / #00BCE1 gradient */}
      <div className="bg-gradient-to-r from-[#0369A1] via-[#00BCE1] to-[#0369A1] text-white py-2 px-4 text-xs font-medium border-b border-white/10 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Left: Helpline & Address & Offer */}
          <div className="flex items-center gap-3 flex-wrap">
            {companyInfo?.name && (
              <span className="flex items-center gap-1.5 font-bold tracking-wide">
                <span>💧</span> {companyInfo.name}
              </span>
            )}
            {companyInfo?.address && (
              <>
                <span className="hidden sm:inline text-white/40">•</span>
                <span className="hidden md:flex items-center gap-1 text-sky-100 font-medium">
                  <MapPin className="w-3 h-3 text-cyan-200" />
                  {companyInfo.address}
                </span>
              </>
            )}
          </div>

          {/* Right: Phone Numbers & Warranty */}
          <div className="flex items-center gap-3 text-right ml-auto sm:ml-0">
            {companyInfo?.helpline && (
              <a 
                href={`tel:${companyInfo.helpline.split('/')[0].trim()}`} 
                className="flex items-center gap-1.5 hover:text-cyan-200 transition-colors font-bold text-white"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-200" />
                <span>{companyInfo.helpline}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Navbar Container */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 lg:gap-6">
            
            {/* Left: Brand Logo & Home Link */}
            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                <Image
                  src="/app_logo.png"
                  alt="Aqua Point Logo"
                  width={160}
                  height={48}
                  className="h-10 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0A2540] flex items-center gap-1">
                  AQUA <span className="text-[#00BCE1]">POINT</span>
                </span>
              </Link>

              {/* Home link */}
              <Link
                href="/"
                className={`hidden md:inline-flex px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  pathname === '/'
                    ? 'bg-[#00BCE1] text-white shadow-sm shadow-cyan-500/25'
                    : 'text-slate-600 hover:text-[#00BCE1] hover:bg-slate-100'
                }`}
              >
                Home
              </Link>
            </div>

            {/* Center: Search Bar with Autocomplete Dropdown */}
            <div className="hidden md:block flex-1 max-w-[420px] lg:max-w-[480px] relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none select-none">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00BCE1] focus:ring-2 focus:ring-[#00BCE1]/20 rounded-full pl-11 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all focus:outline-none focus:bg-white"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : null}
              </form>

              {/* Glassmorphic Autocomplete Live Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                  {searchQuery.trim() !== '' ? (
                    <div>
                      <div className="flex items-center justify-between px-2 pb-2 mb-1.5 border-b border-slate-100/80 text-[11px] font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5 text-[#0369A1]">
                          <Search className="w-3.5 h-3.5 text-[#00BCE1]" />
                          Product Suggestions ({searchResults.length})
                        </span>
                        {isSearching ? (
                          <span className="flex items-center gap-1 text-[10px] text-[#00BCE1] font-medium">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Searching...
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-semibold">Top 5</span>
                        )}
                      </div>

                      {searchResults.length > 0 ? (
                        <div className="space-y-1 my-1">
                          {searchResults.map((product, index) => (
                            <div
                              key={product.id}
                              onClick={() => {
                                router.push(`/products/${product.id}`);
                                setIsSearchFocused(false);
                                setSearchQuery('');
                              }}
                              onMouseEnter={() => setSelectedIndex(index)}
                              className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer group ${
                                selectedIndex === index
                                  ? 'bg-[#F0F9FF] border border-[#BAE6FD] shadow-xs'
                                  : 'hover:bg-slate-50/80 border border-transparent'
                              }`}
                            >
                              {/* Product Thumbnail & Title */}
                              <div className="flex items-center gap-3 min-w-0 pr-2">
                                <div className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center">
                                  <img
                                    src={product.imageUrl || '/app_logo.png'}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = '/app_logo.png';
                                    }}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#00BCE1] transition-colors truncate">
                                    {product.name}
                                  </h4>
                                  <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                                    {product.category || 'Water Purifier'}
                                  </span>
                                </div>
                              </div>

                              {/* Price Tag */}
                              <div className="shrink-0">
                                <span className="text-xs font-black text-[#0369A1] bg-[#E0F7FA] px-2.5 py-1 rounded-full border border-[#00BCE1]/30">
                                  ৳{product.price ? product.price.toLocaleString() : '0'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : !isSearching ? (
                        <div className="py-6 text-center text-slate-500 text-xs">
                          <p className="font-semibold text-slate-700">No products found for "{searchQuery}"</p>
                          <p className="text-[11px] text-slate-400 mt-1">Try checking spelling or search a general term like RO, Filter</p>
                        </div>
                      ) : null}

                      {/* Footer Link */}
                      <div className="pt-2.5 mt-2 border-t border-slate-100/80 flex items-center justify-between text-xs text-slate-500">
                        <span className="text-[11px] text-slate-400">
                          Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-600">Enter</kbd> to search catalog
                        </span>
                        <button
                          type="button"
                          onClick={handleSearchSubmit}
                          className="text-[#00BCE1] font-bold hover:underline flex items-center gap-1 text-xs"
                        >
                          <span>See all results</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <span>Popular Searches</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#00BCE1]" />
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {quickSearchTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagClick(tag)}
                            className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-[#F0F9FF] border border-slate-200 hover:border-[#BAE6FD] text-slate-700 hover:text-[#00BCE1] text-xs font-medium transition-all text-left flex items-center gap-1.5 group"
                          >
                            <Search className="w-3 h-3 text-slate-400 group-hover:text-[#00BCE1]" />
                            <span>{tag}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Account Button */}
              <Link
                href="/contact"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-50 hover:bg-[#F0F9FF] border border-slate-200 hover:border-[#BAE6FD] text-slate-700 hover:text-[#00BCE1] text-xs font-bold transition-all"
                title="User Profile & Account"
              >
                <div className="w-5 h-5 rounded-full bg-[#00BCE1]/10 flex items-center justify-center text-[#00BCE1]">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>Account</span>
              </Link>

              {/* Book Service Button */}
              <Link
                href="/services"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#00BCE1] text-[#00BCE1] hover:bg-[#00BCE1] hover:text-white text-xs font-extrabold transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-cyan-500/20"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Book Service</span>
              </Link>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#00BCE1] hover:bg-[#00A3C7] text-white text-xs font-extrabold shadow-md shadow-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/35 transition-all duration-200 group"
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Cart ({totalCount})</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Drawer (Visible on small screens) */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-6 border-t border-slate-100 pt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Mobile Search Bar */}
              <div className="px-1 relative">
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#00BCE1] focus:ring-2 focus:ring-[#00BCE1]/20 rounded-full pl-11 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </form>

                {/* Mobile Suggestions List */}
                {searchQuery.trim() !== '' && searchResults.length > 0 && (
                  <div className="mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1">
                    <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Matching Products ({searchResults.length})
                    </div>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          router.push(`/products/${product.id}`);
                          setIsMobileMenuOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F0F9FF] text-left cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <img
                            src={product.imageUrl || '/app_logo.png'}
                            alt={product.name}
                            className="w-9 h-9 object-cover rounded-lg border border-slate-200 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/app_logo.png';
                            }}
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">{product.name}</p>
                            <p className="text-[10px] text-slate-400">{product.category}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#0369A1] bg-[#E0F7FA] px-2 py-0.5 rounded-full shrink-0">
                          ৳{product.price ? product.price.toLocaleString() : '0'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-2 px-1">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold text-center transition-all ${
                    pathname === '/'
                      ? 'bg-[#00BCE1] text-white shadow-sm'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Home
                </Link>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex flex-col gap-2 pt-2 px-1">
                <Link
                  href="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-2xl border-2 border-[#00BCE1] text-[#00BCE1] font-extrabold text-xs text-center flex items-center justify-center gap-2 shadow-xs"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book Service</span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs text-center flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-[#00BCE1]" />
                  <span>Account</span>
                </Link>
                {companyInfo?.helpline && (
                  <a
                    href={`tel:${companyInfo.helpline.split('/')[0].trim()}`}
                    className="w-full py-2.5 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] text-[#00BCE1] font-bold text-xs text-center flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Hotline: {companyInfo.helpline}</span>
                  </a>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
