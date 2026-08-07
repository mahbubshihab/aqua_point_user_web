'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Droplets, 
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
  Clock,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useCart } from '@/core/context/CartContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'TDS Meter', href: '/#water-quality' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const quickSearchTags = [
    'RO Water Purifier',
    'Alkaline Filter',
    'Water Dispenser',
    'TDS Meter',
    'UV Sterilizer',
    'Filter Cartridge'
  ];

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
            <span className="flex items-center gap-1.5 font-bold tracking-wide">
              <span>💧</span> 100% Certified Pure RO Water
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="hidden md:flex items-center gap-1 text-sky-100 font-medium">
              <MapPin className="w-3 h-3 text-cyan-200" />
              House 72, Janata Housing Road, 3 Ring Road, Dhaka 1219
            </span>
            <span className="hidden lg:inline text-white/40">•</span>
            <span className="hidden lg:inline bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-full text-[11px] font-semibold transition-colors cursor-default">
              🧪 Free Water Testing Offer
            </span>
          </div>

          {/* Right: Phone Numbers & Warranty */}
          <div className="flex items-center gap-3 text-right ml-auto sm:ml-0">
            <a 
              href="tel:01780885841" 
              className="flex items-center gap-1.5 hover:text-cyan-200 transition-colors font-bold text-white"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-200" />
              <span>01780-885841 / 09613 700 750</span>
            </a>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:flex items-center gap-1 text-sky-100 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 inline" />
              <span>🛡️ 1-Year Warranty</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar Container */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 lg:gap-6">
            
            {/* Left: Aqua Point Logo (app_logo.png + AQUA POINT brand text) */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
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

            {/* Nav Links Row: Clean Pill Navigation */}
            <nav className="hidden xl:flex items-center gap-1 bg-slate-50 p-1.5 rounded-full border border-slate-200/80 shrink-0">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#00BCE1] text-white shadow-sm shadow-cyan-500/25'
                        : 'text-slate-600 hover:text-[#00BCE1] hover:bg-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Center / Prominent Large Search Bar */}
            <div className="hidden md:block flex-1 max-w-[420px] lg:max-w-[480px] relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none select-none">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search purifiers, filters, dispensers, spare parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full bg-slate-50/80 border border-slate-200 focus:border-[#00BCE1] focus:ring-2 focus:ring-[#00BCE1]/20 rounded-full pl-11 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all shadow-inner focus:outline-none focus:bg-white"
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

              {/* Instant Live Search Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <span>Popular Searches</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#00BCE1]" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
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

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-600">Enter</kbd> to view all results</span>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-[#00BCE1] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Search Catalog</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Actions */}
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

              {/* Book Service Button (Cyan outline button with wrench icon) */}
              <Link
                href="/services"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#00BCE1] text-[#00BCE1] hover:bg-[#00BCE1] hover:text-white text-xs font-extrabold transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-cyan-500/20"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Book Service</span>
              </Link>

              {/* Cart (0) Button (Filled #00BCE1 cyan button with cart icon & item counter) */}
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
                className="lg:hidden p-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Medium Screens (lg) Nav Links bar if screen width is between lg and xl */}
          <div className="hidden lg:flex xl:hidden justify-center pb-3 border-t border-slate-100 pt-2">
            <nav className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-full border border-slate-200/80">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#00BCE1] text-white shadow-sm shadow-cyan-500/25'
                        : 'text-slate-600 hover:text-[#00BCE1] hover:bg-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Drawer (Visible on small screens) */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-6 border-t border-slate-100 pt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Mobile Prominent Search Bar */}
              <div className="px-1">
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Search purifiers, filters, dispensers, spare parts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#00BCE1] focus:ring-2 focus:ring-[#00BCE1]/20 rounded-full pl-11 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </form>
              </div>

              {/* Mobile Navigation Links */}
              <div className="grid grid-cols-2 gap-2 px-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold text-center transition-all ${
                        isActive
                          ? 'bg-[#00BCE1] text-white shadow-sm'
                          : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex flex-col gap-2 pt-2 px-1">
                <Link
                  href="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-2xl border-2 border-[#00BCE1] text-[#00BCE1] font-extrabold text-xs text-center flex items-center justify-center gap-2 shadow-xs"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book Service & Maintenance</span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs text-center flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-[#00BCE1]" />
                  <span>My Account</span>
                </Link>
                <a
                  href="tel:09613700750"
                  className="w-full py-2.5 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] text-[#00BCE1] font-bold text-xs text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Hotline: 09613 700 750</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
