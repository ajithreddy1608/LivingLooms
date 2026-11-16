'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    setCouponFeedback(result);
    if (result.success) setCouponInput('');
  };

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="border-b border-brand-border/60 pb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-grey font-medium mb-2">
            <Link href="/" className="hover:text-brand-dark">Home</Link>
            <span>/</span>
            <span className="text-brand-gold">Shopping Bag</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="font-playfair text-3xl sm:text-4xl font-light text-brand-dark">
              YOUR SHOPPING BAG
            </h1>
            <span className="text-xs uppercase tracking-widest text-brand-grey">
              {cart.reduce((a, b) => a + b.quantity, 0)} Items Curated
            </span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white p-12 sm:p-20 text-center rounded-sm border border-brand-border space-y-6 max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#EFE8DE] flex items-center justify-center mx-auto text-brand-gold">
              <ShoppingBag className="w-10 h-10 opacity-70" />
            </div>

            <div className="space-y-2">
              <h2 className="font-playfair text-2xl text-brand-dark">
                Your Bag Is Presently Empty
              </h2>
              <p className="text-xs sm:text-sm text-brand-grey max-w-md mx-auto font-light leading-relaxed">
                Discover masterfully woven sarees, Chanderi kurtas, and artisanal dupattas designed for life&apos;s celebrated moments.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md"
              >
                <span>EXPLORE THE ATELIER</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Items Table (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-white rounded-sm border border-brand-border overflow-hidden shadow-xs">
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-12 p-4 bg-[#EFE8DE] text-xs uppercase tracking-wider font-semibold text-brand-dark border-b border-brand-border">
                  <div className="col-span-6">Creation</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-brand-border/60">
                  {cart.map((item, idx) => (
                    <div 
                      key={`${item.productId}-${item.size}-${item.color}-${idx}`} 
                      className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="sm:col-span-6 flex gap-4">
                        <div className="relative w-20 h-28 bg-neutral-100 flex-shrink-0 rounded-sm overflow-hidden border border-brand-border">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex flex-col justify-between py-0.5">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-wider text-brand-gold font-medium block">
                              {item.product.category.replace('-', ' ')}
                            </span>
                            <Link
                              href={`/shop/${item.product.slug}`}
                              className="font-playfair text-sm sm:text-base font-medium text-brand-dark hover:text-brand-gold line-clamp-1 transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <div className="text-xs text-brand-grey space-x-2">
                              <span>Size: <strong className="text-brand-dark font-medium">{item.size}</strong></span>
                              <span>•</span>
                              <span>Color: <strong className="text-brand-dark font-medium">{item.color}</strong></span>
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.productId, item.size, item.color)}
                            className="text-xs text-brand-grey hover:text-red-700 flex items-center gap-1.5 transition-colors self-start mt-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="sm:col-span-2 flex justify-start sm:justify-center">
                        <div className="flex items-center border border-brand-border rounded bg-[#F8F5EF]">
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                            className="p-1.5 text-brand-dark hover:text-brand-gold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-brand-dark min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                            className="p-1.5 text-brand-dark hover:text-brand-gold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="sm:col-span-2 text-left sm:text-right text-xs text-brand-grey font-mono">
                        <span className="sm:hidden font-sans text-brand-dark mr-2">Unit:</span>
                        {formatPrice(item.price)}
                      </div>

                      {/* Subtotal Item */}
                      <div className="sm:col-span-2 text-left sm:text-right font-playfair font-semibold text-brand-dark text-sm sm:text-base">
                        <span className="sm:hidden font-sans text-xs text-brand-dark font-normal mr-2">Total:</span>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Controls: Continue Shopping & Clear */}
                <div className="p-4 bg-[#F8F5EF] border-t border-brand-border flex items-center justify-between text-xs">
                  <Link
                    href="/shop"
                    className="text-brand-dark hover:text-brand-gold font-medium uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>← Continue Curating</span>
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-brand-grey hover:text-brand-dark flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear Entire Bag</span>
                  </button>
                </div>
              </div>

              {/* Complimentary Courier Highlight */}
              <div className="bg-[#EFE8DE] p-4 rounded-sm border border-brand-border flex items-center gap-4 text-xs text-brand-dark">
                <Truck className="w-6 h-6 text-brand-gold flex-shrink-0" />
                <div>
                  <span className="font-semibold block">Insured Domestic Shipping</span>
                  <span className="text-brand-dark/70 font-light">Every order is safely encased in breathable heirloom packaging and insured against transit loss.</span>
                </div>
              </div>

            </div>

            {/* Right Summary Card (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-brand-border shadow-sm space-y-6">
                
                <h3 className="font-playfair text-xl font-medium text-brand-dark uppercase tracking-wider pb-3 border-b border-brand-border">
                  Order Summary
                </h3>

                {/* Line Items */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-brand-dark/80">
                    <span>Bag Subtotal</span>
                    <span className="font-semibold text-brand-dark font-mono">{formatPrice(cartSubtotal)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-800 font-medium">
                      <span>Privilege Code ({appliedCoupon.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-brand-dark/80">
                    <span>Express Insured Shipping</span>
                    <span className="text-brand-gold font-semibold uppercase tracking-wider">Complimentary</span>
                  </div>

                  <div className="pt-3 border-t border-brand-border flex justify-between items-baseline text-brand-dark">
                    <span className="text-sm font-semibold uppercase tracking-wider">Total Amount</span>
                    <span className="font-playfair text-2xl font-bold">{formatPrice(cartTotal)}</span>
                  </div>

                  <p className="text-[10px] text-brand-grey text-right">
                    Includes GST and complimentary luxury packaging
                  </p>
                </div>

                {/* Coupon Code Form */}
                <div className="pt-4 border-t border-brand-border space-y-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-brand-dark flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Apply Privilege Code</span>
                  </span>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded text-xs text-emerald-800">
                      <div>
                        <strong>{appliedCoupon.code}</strong>: {appliedCoupon.description}
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-600 hover:underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="e.g. WELCOME10"
                        className="flex-1 px-3 py-2 text-xs uppercase bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                      />
                      <button
                        type="submit"
                        className="bg-brand-dark text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-brand-gold transition-colors rounded"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponFeedback && (
                    <div className={`text-xs flex items-center gap-1.5 ${couponFeedback.success ? 'text-emerald-700' : 'text-red-700'}`}>
                      {couponFeedback.success ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      <span>{couponFeedback.message}</span>
                    </div>
                  )}

                  {/* Promo Hint */}
                  <p className="text-[11px] text-brand-grey font-light">
                    Try <strong>WELCOME10</strong> for 10% off inaugural orders.
                  </p>
                </div>

                {/* Checkout Button */}
                <div className="pt-2">
                  <Link
                    href="/checkout"
                    className="w-full bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white py-4 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-sm shadow-md flex items-center justify-center gap-2"
                  >
                    <span>PROCEED TO SECURE CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-brand-grey border-t border-neutral-100">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  <span>Razorpay PCI-DSS 256-bit Encrypted</span>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
