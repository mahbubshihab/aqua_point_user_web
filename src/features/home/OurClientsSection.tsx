'use client';

import React, { useState, useEffect } from 'react';
import { subscribeToClientsFromFirestore, ClientItem } from '@/core/services/firebase';

export const OurClientsSection: React.FC = () => {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsub = subscribeToClientsFromFirestore((data) => {
      setClients(data || []);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading || clients.length === 0) {
    return null;
  }

  // Duplicate array 3x for seamless loop
  const marqueeClients = [...clients, ...clients, ...clients];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center tracking-tight">
          Our Clients
        </h2>

        <div className="relative w-full overflow-hidden">
          {/* Fade Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            className="flex w-max space-x-6 items-center"
            style={{ animation: 'marquee 25s linear infinite' }}
          >
            {marqueeClients.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 w-44 h-24 p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center"
              >
                <img
                  src={client.logoUrl}
                  alt="Client logo"
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

