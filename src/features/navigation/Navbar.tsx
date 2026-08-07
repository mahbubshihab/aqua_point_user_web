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
  MapPin,
  TestTube
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
    { name: 'Water Quality', href: '/#water-quality' },
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
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-300">
      {/* Top Banner - Clean White / Soft Light Slate Top Bar */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] py-2 px-4 text-xs text-[#475569]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="tel:09613700750" 
              className="flex items-center gap-1.5 text-[#0284C7] font-bold hover:text-[#0369A1] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Helpline: 09613 700 750</span>
            </a>
            <span className="hidden sm:inline text-[#CBD5E1]">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-[#475569]">
              <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Dhaka Office / Showroom: 3 Ring Road, Dhaka</span>
            </div>
            <span className="hidden lg:inline text-[#CBD5E1]">|</span>
            <div className="hidden lg:flex items-center gap-1 text-[#10B981] font-semibold">
              <TestTube className="w-3.5 h-3.5" />
              <span>Free Water Testing Available!</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-[11px] font-medium text-[#64748B]">
            <span className="inline-flex items-center gap-1 text-[#0284C7] font-semibold bg-[#E0F2FE] px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3 text-[#0284C7]" /> 100% Pure Water Guarantee
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky White Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#00E5FF] p-0.5 shadow-md group-hover:shadow-lg transition-all duration-300">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Droplets className="w-6 h-6 text-[#0284C7] group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-[#0F172A] flex items-center gap-1">
                AQUA<span className="text-[#0284C7]">POINT</span>
              </span>
              <span className="text-[10px] font-bold text-[#10B981] tracking-widest uppercase">
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
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-full py-2 pl-4 pr-10 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:bg-white focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all duration-300"
            />
            <button
              type="submit"
              className="absolute right-2 p-1.5 rounded-full text-[#64748B] hover:text-[#0284C7] hover:bg-[#F1F5F9] transition-colors"
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
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD]'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
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
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] hover:bg-[#E0F2FE] text-xs font-bold text-[#0284C7] transition-all duration-300 shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-[#0284C7]" />
              <span>09613 700 750</span>
            </a>

            {/* Cart Icon / Drawer Trigger */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] hover:text-[#0284C7] hover:border-[#0284C7]/50 shadow-sm hover:shadow transition-all duration-300 group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#0284C7] text-white font-bold text-[11px] flex items-center justify-center shadow-md">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-[#E2E8F0] pt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Search Input Mobile */}
            <form onSubmit={handleSearchSubmit} className="relative px-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 pl-4 pr-10 text-sm text-[#0F172A] focus:outline-none focus:border-[#0284C7]"
              />
              <button type="submit" className="absolute right-4 top-3 text-[#64748B]">
                <Search className="w-4 h-4" />
              </button>
            </form>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold text-center ${
                    pathname === link.href
                      ? 'text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD]'
                      : 'text-[#475569] bg-[#F8FAFC] hover:bg-[#F1F5F9]'
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
