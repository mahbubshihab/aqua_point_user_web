import React, { use } from 'react';
import { ProductDetailView } from '@/features/products/ProductDetailView';
import { fetchProductsFromFirestore } from '@/core/services/firebase';

export const metadata = {
  title: 'Product Details | Aqua Point BD',
  description: 'View specifications, warranty details, and place direct orders for Aqua Point RO water systems.',
};

export async function generateStaticParams() {
  try {
    const products = await fetchProductsFromFirestore();
    if (products && products.length > 0) {
      return products.map((product) => ({
        id: product.id,
      }));
    }
  } catch (error) {
    console.warn('generateStaticParams error:', error);
  }
  return [{ id: 'default' }, { id: '1' }, { id: '2' }];
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <ProductDetailView productId={resolvedParams.id} />;
}
