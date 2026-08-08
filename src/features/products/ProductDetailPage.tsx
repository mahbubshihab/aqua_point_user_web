'use client';

import React from 'react';
import { ProductDetailView } from './ProductDetailView';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  return <ProductDetailView productId={productId} />;
};

export default ProductDetailPage;
