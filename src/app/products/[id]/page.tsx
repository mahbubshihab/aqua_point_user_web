import React, { use } from 'react';
import { ProductDetailView } from '@/features/products/ProductDetailView';

export const metadata = {
  title: 'Product Details | Aqua Point BD',
  description: 'View specifications, warranty details, and place direct orders for Aqua Point RO water systems.',
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <ProductDetailView productId={resolvedParams.id} />;
}
