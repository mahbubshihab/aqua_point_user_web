'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Droplets, 
  Search, 
  ShoppingBag, 
  PhoneCall, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  Activity
} from 'lucide-react';
import { useCart } from '@/core/context/CartContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Water Quality', href: '/#water-telemetry' },
    { name: 'About', href: '/contact#about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0A0D16]/80 border-b border-[#1E2638] transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#131826] via-[#1E2638] to-[#131826] border-b border-[#1E2638]/50 py-1.5 px-4 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[#00E5FF] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Pure RO Technology
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">
              Free Installation across Dhaka & Chittagong
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:09613700750" 
              className="flex items-center gap-1.5 text-[#10B981] font-semibold hover:text-[#00E5FF] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>24/7 Helpline: 09613 700 750</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#10B981] p-0.5 shadow-[0_0_20px_rgba(0,229,255,0.3)] group-hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300">
              <div className="w-full h-full bg-[#0A0D16] rounded-[10px] flex items-center justify-center">
                <Droplets className="w-6 h-6 text-[#00E5FF] group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                AQUA<span className="text-[#00E5FF]">POINT</span>
              </span>
              <span className="text-[10px] font-semibold text-[#10B981] tracking-widest uppercase">
                Pure Water Solution
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex flex-1 max-w-md items-center relative"
          >
            <input
              type="text"
              placeholder="Search RO purifiers, filters, spare parts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131826]/90 border border-[#1E2638] rounded-full py-2 pl-4 pr-10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all duration-300"
            />
            <button
              type="submit"
              className="absolute right-2 p-1.5 rounded-full text-slate-400 hover:text-[#00E5FF] hover:bg-[#1E2638] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[#00E5FF] bg-[#131826] border border-[#00E5FF]/30 shadow-[0_0_10px_rgba(0,229,255,0.15)]'
                      : 'text-slate-300 hover:text-white hover:bg-[#131826]/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            {/* Quick Helpline Badge */}
            <a
              href="tel:09613700750"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#131826] border border-[#1E2638] hover:border-[#10B981]/50 text-xs font-semibold text-slate-200 transition-all duration-300 shadow-inner"
            >
              <PhoneCall className="w-4 h-4 text-[#10B981]" />
              <span>09613 700 750</span>
            </a>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl bg-[#131826] border border-[#1E2638] text-slate-200 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all duration-300 group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#10B981] text-[#0A0D16] font-bold text-[11px] flex items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.5)]">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#131826] border border-[#1E2638] text-slate-200 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-[#1E2638] pt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Search Input Mobile */}
            <form onSubmit={handleSearchSubmit} className="relative px-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#131826] border border-[#1E2638] rounded-xl py-2.5 pl-4 pr-10 text-sm text-slate-200 focus:outline-none focus:border-[#00E5FF]"
              />
              <button type="submit" className="absolute right-4 top-3 text-slate-400">
                <Search className="w-4 h-4" />
              </button>
            </form>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium text-center ${
                    pathname === link.href
                      ? 'text-[#00E5FF] bg-[#131826] border border-[#00E5FF]/30'
                      : 'text-slate-300 bg-[#131826]/40 hover:bg-[#131826]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
