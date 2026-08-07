import React, { Suspense } from 'react';
import { ProductCatalog } from '@/features/products/ProductCatalog';

export const metadata = {
  title: 'Products Catalog | Aqua Point Purifiers & Spare Parts',
  description: 'Explore Aqua Point RO purifiers, alkaline mineral filters, industrial RO plants, and authentic replacement parts.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        Loading Aqua Point Catalog...
      </div>
    }>
      <ProductCatalog />
    </Suspense>
  );
}
