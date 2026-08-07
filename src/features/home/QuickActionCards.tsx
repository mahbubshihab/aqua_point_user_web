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
      color: 'from-[#00E5FF]/20 via-[#131826] to-[#131826]',
      borderColor: 'hover:border-[#00E5FF]',
      iconColor: 'text-[#00E5FF]',
    },
    {
      title: 'Buy Spare Parts',
      subtitle: 'Genuine filters & membranes',
      icon: ShoppingBag,
      href: '/products?category=Spare+Parts',
      badge: '100% Original',
      color: 'from-[#10B981]/20 via-[#131826] to-[#131826]',
      borderColor: 'hover:border-[#10B981]',
      iconColor: 'text-[#10B981]',
    },
    {
      title: 'Invoices & Orders',
      subtitle: 'View cart & order history',
      icon: Receipt,
      href: '/cart',
      badge: 'Instant Track',
      color: 'from-[#F59E0B]/20 via-[#131826] to-[#131826]',
      borderColor: 'hover:border-[#F59E0B]',
      iconColor: 'text-[#F59E0B]',
    },
    {
      title: 'Customer Support',
      subtitle: 'Talk to water specialist',
      icon: Headset,
      href: '/contact',
      badge: '09613 700 750',
      color: 'from-[#8B5CF6]/20 via-[#131826] to-[#131826]',
      borderColor: 'hover:border-[#8B5CF6]',
      iconColor: 'text-[#8B5CF6]',
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
              className={`group relative p-5 rounded-2xl bg-gradient-to-br ${action.color} border border-[#1E2638] ${action.borderColor} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between`}
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl bg-[#0A0D16]/80 border border-[#1E2638] ${action.iconColor}`}>
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#0A0D16]/60 border border-[#1E2638] text-slate-300">
                  {action.badge}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors flex items-center justify-between">
                  <span>{action.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#00E5FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-xs text-slate-400 mt-1">
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
