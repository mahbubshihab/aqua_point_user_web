'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Sparkles
} from 'lucide-react';
import { useCart } from '@/core/context/CartContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'TDS Meter', href: '/#water-quality' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md transition-all duration-300">
      {/* 1. Top Bar Component - Bright Electric Aqua Cyan background (#00BCE1 / #008BAA) */}
      <div className="bg-gradient-to-r from-[#008BAA] via-[#00BCE1] to-[#008BAA] text-white py-2 px-4 text-xs font-medium border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Left Text */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 font-semibold">
              <span>💧</span> 100% Certified Pure RO Water
            </span>
            <span className="hidden sm:inline opacity-60">•</span>
            <span className="hidden sm:inline text-sky-100 font-medium">
              Free Installation on Orders over ৳15,000
            </span>
          </div>

          {/* Right Text */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-right ml-auto sm:ml-0">
            <a 
              href="tel:09613700750" 
              className="flex items-center gap-1.5 hover:text-sky-200 transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>☎ 09613 700 750 / 01780-885841</span>
            </a>
            <span className="hidden md:inline opacity-60">•</span>
            <span className="hidden md:flex items-center gap-1 text-sky-100 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 inline" />
              <span>🛡️ 1-Year Warranty Included</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar - Clean pure white (#FFFFFF) */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo: Aqua Point logo (Water Drop icon + "AQUA POINT" wordmark) */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00BCE1] to-[#008BAA] p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-[#00BCE1] fill-[#00BCE1]/20 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0F172A] flex items-center gap-0.5 leading-none">
                  AQUA<span className="text-[#00BCE1]">POINT</span>
                </span>
                <span className="text-[10px] font-bold text-[#008BAA] tracking-widest uppercase mt-1">
                  Pure Water Solution
                </span>
              </div>
            </Link>

            {/* Nav Pills: Active tab highlight pill ("Home", "Products", "Services", "TDS Meter", "About", "Contact") */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#F8FAFC] p-1.5 rounded-full border border-[#E2E8F0]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#00BCE1] text-white shadow-sm shadow-cyan-500/25'
                        : 'text-[#475569] hover:text-[#00BCE1] hover:bg-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions: Search icon button, Account button, "Book Service" outline button, filled Cart (X) ocean blue button */}
            <div className="flex items-center gap-2.5">
              
              {/* Search Icon Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search catalog"
                className="p-2.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:text-[#00BCE1] hover:bg-[#F0F9FF] hover:border-[#BAE6FD] transition-all"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Account Button */}
              <Link
                href="/contact"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:text-[#00BCE1] hover:bg-[#F0F9FF] hover:border-[#BAE6FD] text-xs font-bold transition-all"
              >
                <User className="w-4 h-4 text-[#00BCE1]" />
                <span>Account</span>
              </Link>

              {/* Book Service Outline Button */}
              <Link
                href="/services"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#00BCE1] text-[#00BCE1] hover:bg-[#00BCE1] hover:text-white text-xs font-extrabold transition-all duration-200 shadow-sm"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Book Service</span>
              </Link>

              {/* Filled Cart (X) Bright Electric Aqua Cyan Button (#00BCE1) */}
              <Link
                href="/cart"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00BCE1] hover:bg-[#00A3C7] text-white text-xs font-extrabold shadow-md shadow-cyan-500/25 transition-all duration-200 group"
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Cart ({totalCount})</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search Dropdown / Bar when toggled */}
          {isSearchOpen && (
            <div className="py-3 px-4 mb-3 bg-[#F8FAFC] border border-[#BAE6FD] rounded-2xl animate-in fade-in slide-in-from-top-2 duration-200">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#00BCE1]" />
                <input
                  type="text"
                  placeholder="Search RO purifiers, filters, cartridges, pumps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-[#00BCE1] text-white text-xs font-bold hover:bg-[#00A3C7] transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 text-[#64748B] hover:text-[#0F172A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Mobile Navigation Drawer */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-6 border-t border-[#E2E8F0] pt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
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
                          : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="flex flex-col gap-2 pt-2 px-1">
                <Link
                  href="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-2xl border-2 border-[#00BCE1] text-[#00BCE1] font-extrabold text-xs text-center flex items-center justify-center gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book Service & Maintenance</span>
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
