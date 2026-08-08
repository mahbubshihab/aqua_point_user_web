'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Droplets, PhoneCall, Mail, MapPin, ShieldCheck, Lock } from 'lucide-react';
import { fetchCompanyInfoFromFirestore, CompanyInfo } from '@/core/services/firebase';

export const Footer: React.FC = () => {
  const [info, setInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    const loadInfo = async () => {
      const dbInfo = await fetchCompanyInfoFromFirestore();
      setInfo(dbInfo);
    };
    loadInfo();
  }, []);

  const founder = info?.founder;
  const foundedYear = info?.foundedYear;
  const address = info?.address;
  const helpline = info?.helpline;
  const email = info?.email;
  const description = info?.description;

  return (
    <footer className="mt-20 bg-[#0F172A] text-white text-sm">
      {/* 4-Column Deep Navy Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Company Mission & Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/app_logo.png"
                alt="Aqua Point Logo"
                width={150}
                height={45}
                className="h-10 w-auto object-contain"
              />
            </Link>
            
            {(description || foundedYear || founder) && (
              <p className="text-xs text-slate-300 leading-relaxed">
                {description} {foundedYear ? `Founded ${foundedYear}` : ''} {founder ? `by ${founder}` : ''}
              </p>
            )}

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>BSTI & WHO Drinking Standard Certified</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-widest border-b border-slate-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                  <span>Products Catalog</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                  <span>Technician Servicing</span>
                </Link>
              </li>
              <li>
                <Link href="/#water-quality" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                  <span>Water Quality Meter</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                  <span>About Aqua Point</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product & Service Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-widest border-b border-slate-700 pb-2">
              Our Products
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/products?category=RO+Purifiers" className="hover:text-[#10B981] transition-colors">
                  7-Stage RO Purifiers
                </Link>
              </li>
              <li>
                <Link href="/products?category=Cabinet+Purifiers" className="hover:text-[#10B981] transition-colors">
                  Cabinet Purifiers
                </Link>
              </li>
              <li>
                <Link href="/products?category=Water+Dispensers" className="hover:text-[#10B981] transition-colors">
                  Water Dispensers
                </Link>
              </li>
              <li>
                <Link href="/products?category=Filters+%26+Cartridges" className="hover:text-[#10B981] transition-colors">
                  Filters & Cartridges
                </Link>
              </li>
              <li>
                <Link href="/products?category=Industrial+RO+Plants" className="hover:text-[#10B981] transition-colors">
                  Industrial RO Plants (500-1000 LPH)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info & Address */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-widest border-b border-slate-700 pb-2">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              {address && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                  <span>{address}</span>
                </li>
              )}
              {helpline && (
                <li className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-[#10B981] shrink-0" />
                  <a href={`tel:${helpline.split('/')[0].trim()}`} className="hover:text-[#00E5FF] font-bold">{helpline}</a>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-[#00E5FF]">{email}</a>
                </li>
              )}
            </ul>

            {/* Helpline CTA box inside column */}
            {helpline && (
              <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 space-y-1">
                <span className="text-[11px] text-slate-400 font-medium block">Need instant assistance?</span>
                <a href={`tel:${helpline.split('/')[0].trim()}`} className="text-sm font-extrabold text-[#00E5FF] hover:underline block">
                  Helpline: {helpline}
                </a>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Payment Gateway Badges & Copyright Footer Bar */}
      <div className="border-t border-slate-800 bg-[#0B1120] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {info?.name || 'Aqua Point BD'}. All rights reserved. {foundedYear ? `Founded ${foundedYear}` : ''} {founder ? `by ${founder}` : ''}
          </div>

          {/* Payment Gateway Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 mr-2 flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#10B981]" /> Secure Payments:
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] font-bold text-pink-400">
              bKash
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] font-bold text-orange-400">
              Nagad
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] font-bold text-blue-400">
              VISA / Card
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] font-bold text-[#10B981]">
              Cash On Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
