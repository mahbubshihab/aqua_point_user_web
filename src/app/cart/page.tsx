import React from 'react';
import { CartCheckoutView } from '@/features/cart_checkout/CartCheckoutView';

export const metadata = {
  title: 'Shopping Cart & Checkout | Aqua Point BD',
  description: 'Review your cart items and place cash on delivery order for Aqua Point products.',
};

export default function CartPage() {
  return <CartCheckoutView />;
}
