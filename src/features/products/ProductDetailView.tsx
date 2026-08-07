'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  fetchProductByIdFromFirestore, 
  submitOrderToFirestore, 
  ProductItem 
} from '@/core/services/firebase';
import { SAMPLE_PRODUCTS } from '@/core/data/sampleProducts';
import { getCloudinaryUrl } from '@/core/services/cloudinary';
import { useCart } from '@/core/context/CartContext';
import { 
  ShieldCheck, 
  ShoppingCart, 
  Star, 
  Truck, 
  Wrench, 
  Check, 
  ArrowLeft, 
  PhoneCall,
  X,
  Sparkles
} from 'lucide-react';

interface ProductDetailViewProps {
  productId: string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ productId }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Quick Checkout Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const dbProduct = await fetchProductByIdFromFirestore(productId);
      if (dbProduct) {
        setProduct(dbProduct);
        setActiveImage(dbProduct.imageUrl);
      } else {
        const local = SAMPLE_PRODUCTS.find((p) => p.id === productId) || SAMPLE_PRODUCTS[0];
        setProduct(local);
        setActiveImage(local.imageUrl);
      }
      setLoading(false);
    };
    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-[#475569]">
        <div className="w-10 h-10 border-4 border-[#00BCE1] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        Loading Aqua Point Product Details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-[#475569] space-y-4">
        <h2 className="text-xl font-bold text-[#0F172A]">Product Not Found</h2>
        <Link href="/products" className="px-4 py-2 rounded-xl bg-[#00BCE1] text-white font-bold text-xs shadow-sm">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const gallery = product.galleryUrls && product.galleryUrls.length > 0 
    ? product.galleryUrls 
    : [product.imageUrl];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuickOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) return;
    setSubmitting(true);
    try {
      await submitOrderToFirestore({
        customerName,
        phone,
        address,
        items: [{
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          imageUrl: product.imageUrl
        }],
        totalAmount: product.price * quantity,
        paymentMethod: 'COD'
      });
      setOrderSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setOrderSuccess(false);
        router.push('/cart');
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Back button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#475569] hover:text-[#00BCE1] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products Catalog</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full h-[420px] rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden shadow-sm">
            <img
              src={getCloudinaryUrl(activeImage, { width: 900, height: 700 })}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-white/90 border border-[#BAE6FD] text-xs font-bold text-[#00BCE1] shadow-sm">
                {product.category}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-20 h-20 rounded-xl bg-[#F8FAFC] border overflow-hidden transition-all ${
                    activeImage === imgUrl 
                      ? 'border-[#00BCE1] ring-2 ring-[#00BCE1]/20 shadow-sm' 
                      : 'border-[#E2E8F0] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2">
            {product.rating && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-xs font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating} / 5.0 Rating</span>
              </div>
            )}
            <h1 className="text-3xl font-extrabold text-[#0F172A] leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-[#475569] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price & Stock */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-[#64748B] block uppercase font-bold">Total Price</span>
              <span className="text-3xl font-extrabold text-[#00BCE1]">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#94A3B8] line-through ml-3">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
                In Stock ({product.stock} units)
              </span>
            </div>
          </div>

          {/* Warranty & Free Delivery Features */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2 text-[#334155] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>{product.warranty}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2 text-[#334155] font-semibold">
              <Truck className="w-4 h-4 text-[#00BCE1] shrink-0" />
              <span>Free Delivery & Installation</span>
            </div>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-[#475569] uppercase">Quantity:</span>
              <div className="flex items-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-[#475569] hover:text-[#0F172A] font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-extrabold text-[#0F172A]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-[#475569] hover:text-[#0F172A] font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 rounded-xl border font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  added 
                    ? 'bg-[#10B981] border-[#10B981] text-white'
                    : 'bg-white border-[#00BCE1] text-[#00BCE1] hover:bg-[#F0F9FF] shadow-sm'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added To Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add To Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 py-3.5 rounded-xl bg-[#00BCE1] hover:bg-[#00A3C7] text-white font-bold text-sm shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Order Now (Cash on Delivery)</span>
              </button>
            </div>
          </div>

          {/* Helpline shortcut */}
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs text-[#475569]">
            <span>Need advice selecting the right RO purifier?</span>
            <a href="tel:09613700750" className="text-[#00BCE1] font-bold flex items-center gap-1 hover:underline">
              <PhoneCall className="w-3.5 h-3.5" /> 09613 700 750
            </a>
          </div>

        </div>

      </div>

      {/* Specifications Table */}
      <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
          <Wrench className="w-5 h-5 text-[#00BCE1]" />
          <span>Technical Specifications & Features</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications || {}).map(([key, val]) => (
            <div key={key} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#64748B]">{key}</span>
              <span className="font-bold text-[#0F172A]">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F172A]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#00BCE1] uppercase">Instant Order</span>
              <h3 className="text-xl font-extrabold text-[#0F172A]">Deliver to Your Doorstep</h3>
              <p className="text-xs text-[#475569]">{product.name} (Qty: {quantity})</p>
            </div>

            {orderSuccess ? (
              <div className="p-6 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-center space-y-2">
                <Check className="w-10 h-10 text-[#10B981] mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-[#0F172A]">Order Confirmed!</h4>
                <p className="text-xs text-[#334155]">Our representative will call your phone shortly to verify delivery address.</p>
              </div>
            ) : (
              <form onSubmit={handleQuickOrder} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#475569]">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#475569]">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01711223344"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#475569]">Delivery Address *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="House/Apartment, Road, Area, City"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2 px-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Total Cash on Delivery:</span>
                  <span className="text-base font-extrabold text-[#00BCE1]">৳{(product.price * quantity).toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-[#00BCE1] hover:bg-[#00A3C7] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  {submitting ? 'Placing Order...' : 'Confirm Cash On Delivery Order'}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
