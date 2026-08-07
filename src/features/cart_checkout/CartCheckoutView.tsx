'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/core/context/CartContext';
import { submitOrderToFirestore } from '@/core/services/firebase';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ArrowLeft,
  PhoneCall,
  CreditCard,
  Building,
  Check
} from 'lucide-react';

const DISTRICTS = [
  'Dhaka (Dhaka City)',
  'Gazipur',
  'Narayanganj',
  'Chittagong (Chattogram)',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Other District (Courier Delivery)'
];

export const CartCheckoutView: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, totalCount } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'bKash' | 'Card'>('COD');

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const deliveryFee = subtotal > 0 ? (district.includes('Dhaka City') ? 0 : 200) : 0;
  const grandTotal = subtotal + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!customerName || !phone || !address) {
      setErrorMsg('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl
      }));

      const docRef = await submitOrderToFirestore({
        customerName,
        phone,
        email,
        address,
        district,
        items: orderItems,
        totalAmount: grandTotal,
        paymentMethod
      });

      setPlacedOrderId(docRef.id);
      setOrderPlaced(true);
      clearCart();
    } catch (err: any) {
      console.error("Order submission failed:", err);
      setErrorMsg('Order placement failed. Please call 09613 700 750 for telephone ordering.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#131826]/90 border border-[#10B981] backdrop-blur-2xl shadow-2xl space-y-4">
          <CheckCircle2 className="w-16 h-16 text-[#10B981] mx-auto animate-bounce" />
          <h1 className="text-3xl font-extrabold text-white">Order Confirmed Successfully!</h1>
          <p className="text-sm text-slate-300">
            Thank you for trusting Aqua Point BD. Your order ticket ID is <strong className="text-[#00E5FF] font-mono">{placedOrderId}</strong>.
          </p>
          <div className="p-4 rounded-xl bg-[#0A0D16] border border-[#1E2638] text-xs text-slate-400 max-w-md mx-auto text-left space-y-2">
            <div className="flex justify-between">
              <span>Customer Name:</span> <strong className="text-white">{customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Phone Contact:</span> <strong className="text-white">{phone}</strong>
            </div>
            <div className="flex justify-between">
              <span>Payment Method:</span> <strong className="text-[#10B981]">{paymentMethod}</strong>
            </div>
            <div className="flex justify-between">
              <span>Grand Total:</span> <strong className="text-[#00E5FF]">৳{grandTotal.toLocaleString()}</strong>
            </div>
          </div>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/products"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#10B981] text-[#0A0D16] font-bold text-xs uppercase"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="p-12 rounded-3xl bg-[#131826]/40 border border-[#1E2638] max-w-lg mx-auto space-y-4">
          <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-slate-400">
            Explore our 7-stage RO purifiers, mineral filters, and replacement parts to add items to your cart.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 rounded-xl bg-[#00E5FF] text-[#0A0D16] font-bold text-xs uppercase tracking-wider"
          >
            Explore Product Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-white">
          Shopping Cart <span className="text-[#00E5FF]">({totalCount} Items)</span>
        </h1>
        <Link href="/products" className="text-xs font-bold text-slate-400 hover:text-[#00E5FF] flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cart Item List */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="p-5 rounded-2xl bg-[#131826]/80 border border-[#1E2638] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover bg-[#0A0D16] border border-[#1E2638]"
                />
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{item.product.name}</h3>
                  <span className="text-xs font-bold text-[#00E5FF] block mt-1">
                    ৳{item.product.price.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 block">{item.product.warranty}</span>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1E2638]">
                {/* Quantity adjuster */}
                <div className="flex items-center rounded-xl bg-[#0A0D16] border border-[#1E2638]">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-white">
                    ৳{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl bg-[#131826]/90 border border-[#1E2638] backdrop-blur-xl shadow-2xl space-y-6">
            <h2 className="text-xl font-bold text-white">Order Checkout & Delivery</h2>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500 text-xs text-rose-300">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#0A0D16] border border-[#1E2638] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="01711223344"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0A0D16] border border-[#1E2638] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">District *</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-[#0A0D16] border border-[#1E2638] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                  >
                    {DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Full Street Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="House #, Road #, Area..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#0A0D16] border border-[#1E2638] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              {/* Payment Option */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-300 uppercase">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'COD', label: 'Cash On Delivery' },
                    { id: 'bKash', label: 'bKash / Nagad' },
                    { id: 'Card', label: 'Debit / Card' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`py-2 px-2 rounded-xl border text-[11px] font-bold transition-all ${
                        paymentMethod === m.id
                          ? 'bg-[#1E2638] border-[#00E5FF] text-[#00E5FF]'
                          : 'bg-[#0A0D16] border-[#1E2638] text-slate-400'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cost Summary */}
              <div className="p-4 rounded-xl bg-[#0A0D16] border border-[#1E2638] space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-bold text-white">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery Fee:</span>
                  <span className="font-bold text-[#10B981]">
                    {deliveryFee === 0 ? 'FREE (Dhaka)' : `৳${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-[#1E2638]">
                  <span>Grand Total:</span>
                  <span className="text-[#00E5FF]">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#10B981] text-[#0A0D16] font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:scale-[1.01] transition-transform disabled:opacity-50"
              >
                {loading ? 'Processing Order...' : `Place Order (৳${grandTotal.toLocaleString()})`}
              </button>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
};
