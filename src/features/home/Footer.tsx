'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PhoneCall, Mail, MapPin, MessageSquare } from 'lucide-react';
import { 
  fetchCompanyInfoFromFirestore, 
  fetchCategoriesFromFirestore, 
  CompanyInfo, 
  CategoryItem 
} from '@/core/services/firebase';

export const Footer: React.FC = () => {
  const [info, setInfo] = useState<CompanyInfo | null>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [dbInfo, dbCategories] = await Promise.all([
        fetchCompanyInfoFromFirestore(),
        fetchCategoriesFromFirestore()
      ]);
      setInfo(dbInfo);
      setCategories(dbCategories || []);
    };
    loadData();
  }, []);

  const helpline = info?.helpline;
  const email = info?.email;
  const address = info?.address;
  const whatsapp = info?.whatsapp;
  const currentYear = new Date().getFullYear();

  const hasContactInfo = Boolean(helpline || email || address || whatsapp);

  return (
    <footer className="mt-20 bg-[#0F172A] text-[#FFFFFF] text-sm border-t border-[#334155]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/app_logo.png"
                alt={info?.name || "Aqua Point BD"}
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider border-b border-[#334155]/50 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <Link href="/" className="hover:text-[#00BCE1] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#00BCE1] transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#00BCE1] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00BCE1] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Products Column (Dynamic categories from Firestore) */}
          {categories.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider border-b border-[#334155]/50 pb-2">
                Our Products
              </h4>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      className="hover:text-[#00BCE1] transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Column */}
          {hasContactInfo && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider border-b border-[#334155]/50 pb-2">
                Contact
              </h4>
              <ul className="space-y-2.5 text-xs text-[#94A3B8]">
                {address && (
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#00BCE1] shrink-0 mt-0.5" />
                    <span>{address}</span>
                  </li>
                )}
                {helpline && (
                  <li className="flex items-center gap-2.5">
                    <PhoneCall className="w-4 h-4 text-[#00BCE1] shrink-0" />
                    <a href={`tel:${helpline.split('/')[0].trim()}`} className="hover:text-[#00BCE1]">
                      {helpline}
                    </a>
                  </li>
                )}
                {whatsapp && (
                  <li className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-[#00BCE1] shrink-0" />
                    <a
                      href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#00BCE1]"
                    >
                      WhatsApp: {whatsapp}
                    </a>
                  </li>
                )}
                {email && (
                  <li className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#00BCE1] shrink-0" />
                    <a href={`mailto:${email}`} className="hover:text-[#00BCE1]">
                      {email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-[#334155]/50 bg-[#0F172A] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-[#94A3B8]">
          © {currentYear} {info?.name || 'Aqua Point BD'}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

