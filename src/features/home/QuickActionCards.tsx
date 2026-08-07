'use client';

import React from 'react';
import Link from 'next/link';
import { Wrench, ShoppingBag, Receipt, Headset, ArrowUpRight } from 'lucide-react';

export const QuickActionCards: React.FC = () => {
  const actions = [
    {
      title: 'Service Request',
      subtitle: 'Schedule technician visit',
      icon: Wrench,
      href: '/services',
      badge: '2 Hour Dispatch',
      color: 'bg-white',
      borderColor: 'hover:border-[#0284C7]',
      iconColor: 'text-[#0284C7]',
      bgIcon: 'bg-[#F0F9FF]',
    },
    {
      title: 'Buy Spare Parts',
      subtitle: 'Genuine filters & membranes',
      icon: ShoppingBag,
      href: '/products?category=Spare+Parts',
      badge: '100% Original',
      color: 'bg-white',
      borderColor: 'hover:border-[#10B981]',
      iconColor: 'text-[#10B981]',
      bgIcon: 'bg-[#ECFDF5]',
    },
    {
      title: 'Invoices & Orders',
      subtitle: 'View cart & order history',
      icon: Receipt,
      href: '/cart',
      badge: 'Instant Track',
      color: 'bg-white',
      borderColor: 'hover:border-[#F59E0B]',
      iconColor: 'text-[#F59E0B]',
      bgIcon: 'bg-[#FFFBEB]',
    },
    {
      title: 'Customer Support',
      subtitle: 'Talk to water specialist',
      icon: Headset,
      href: '/contact',
      badge: '09613 700 750',
      color: 'bg-white',
      borderColor: 'hover:border-purple-500',
      iconColor: 'text-purple-600',
      bgIcon: 'bg-purple-50',
    },
  ];

  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <Link
              key={idx}
              href={action.href}
              className={`group relative p-5 rounded-2xl ${action.color} border border-[#E2E8F0] ${action.borderColor} transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col justify-between`}
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${action.bgIcon} border border-[#E2E8F0] ${action.iconColor}`}>
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569]">
                  {action.badge}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors flex items-center justify-between">
                  <span>{action.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0284C7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-xs text-[#475569] mt-1">
                  {action.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
