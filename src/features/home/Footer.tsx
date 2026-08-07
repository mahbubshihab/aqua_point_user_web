'use client';

import React from 'react';
import Link from 'next/link';
import { Droplets, PhoneCall, Mail, MapPin, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#1E2638] bg-[#0A0D16] text-slate-400 text-sm">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#10B981] p-0.5 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                <div className="w-full h-full bg-[#0A0D16] rounded-[10px] flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-[#00E5FF]" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                AQUA<span className="text-[#00E5FF]">POINT</span>
              </span>
            </Link>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Bangladesh’s premier water treatment technology provider. Delivering luxury Woodistic glass RO purifiers, commercial filtration plants, and 24/7 technician support.
            </p>

            <div className="p-4 rounded-xl bg-[#131826] border border-[#1E2638] space-y-2">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#10B981] animate-bounce" />
                <span>24/7 Hotline Support</span>
              </div>
              <a 
                href="tel:09613700750" 
                className="text-lg font-extrabold text-[#00E5FF] hover:underline block"
              >
                09613 700 750
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#00E5FF] transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#00E5FF] transition-colors">
                  RO Purifiers Catalog
                </Link>
              </li>
              <li>
                <Link href="/products?category=Spare+Parts" className="hover:text-[#00E5FF] transition-colors">
                  Spare Parts & Filters
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#00E5FF] transition-colors">
                  Book Technician Service
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#00E5FF] transition-colors">
                  Shopping Cart & Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products?category=RO+Purifiers" className="hover:text-[#10B981] transition-colors">
                  Residential RO Systems
                </Link>
              </li>
              <li>
                <Link href="/products?category=Water+Filters" className="hover:text-[#10B981] transition-colors">
                  Alkaline Water Filters
                </Link>
              </li>
              <li>
                <Link href="/products?category=Industrial+RO+Plants" className="hover:text-[#10B981] transition-colors">
                  Commercial RO Plants
                </Link>
              </li>
              <li>
                <Link href="/products?category=Spare+Parts" className="hover:text-[#10B981] transition-colors">
                  UV Lamps & Cartridges
                </Link>
              </li>
              <li>
                <Link href="/#water-telemetry" className="hover:text-[#10B981] transition-colors">
                  TDS Quality Meter
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">
              Headquarters
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span>Aqua Point Tower, House 42, Road 11, Block D, Banani, Dhaka-1213</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>support@aquapointbd.com</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>BSTI & NSF Certified</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1E2638] bg-[#070910] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Aqua Point BD. All rights reserved. Designed with Woodistic Glassmorphic Architecture.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/contact" className="hover:text-[#00E5FF]">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
