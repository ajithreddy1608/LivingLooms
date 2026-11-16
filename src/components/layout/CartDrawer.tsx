'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    discountAmount,
    appliedCoupon
  } = useStore();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F5EF] shadow-2xl flex flex-col justify-between border-l border-brand-border">
          
          {/* Header */}
          <div className="p-6 border-b border-brand-border bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-gold" />
              <h2 className="font-playfair text-lg font-semibold tracking-wider text-brand-dark uppercase">
                Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 text-brand-dark hover:text-brand-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Banner */}
          <div className="bg-[#EFE8DE] px-6 py-2.5 text-xs text-brand-dark flex items-center justify-between border-b border-brand-border">
            <span className="font-medium text-brand-dark">✨ Complimentary Express Shipping</span>
            <span className="text-brand-gold font-semibold">Included Across India</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE8DE] flex items-center justify-center mx-auto text-brand-gold">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-playfair text-lg text-brand-dark">Your bag is currently empty</h3>
                <p className="text-xs text-brand-grey max-w-xs mx-auto">
                  Explore our handcrafted collections and discover pieces made with timeless Indian grace.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="inline-block mt-2 bg-brand-dark text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-brand-gold transition-colors"
                >
                  Explore The Shop
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-brand-border/60">
                {cart.map((item, idx) => (
                  <div key={`${item.productId}-${item.size}-${item.color}-${idx}`} className="py-4 flex gap-4">
                    <div className="relative w-20 h-24 bg-neutral-100 flex-shrink-0 rounded-sm overflow-hidden border border-brand-border">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/shop/${item.product.slug}`}
                            onClick={() => setIsCartDrawerOpen(false)}
                            className="text-xs font-semibold text-brand-dark hover:text-brand-gold line-clamp-1 font-playfair"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.productId, item.size, item.color)}
                            className="text-brand-grey hover:text-red-700 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-brand-grey mt-1 space-x-2">
                          <span>Size: <strong className="text-brand-dark">{item.size}</strong></span>
                          <span>•</span>
                          <span>Color: <strong className="text-brand-dark">{item.color}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-brand-border bg-white rounded">
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                            className="p-1 hover:text-brand-gold transition-colors text-brand-dark"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-medium text-brand-dark min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                            className="p-1 hover:text-brand-gold transition-colors text-brand-dark"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-xs font-semibold text-brand-dark">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-brand-border space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-brand-grey">
                  <span>Subtotal</span>
                  <span className="font-medium text-brand-dark">{formatPrice(cartSubtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Privilege Coupon ({appliedCoupon.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-brand-grey">
                  <span>Standard Insured Shipping</span>
                  <span className="text-brand-gold font-medium">Free</span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-brand-dark pt-2 border-t border-brand-border">
                  <span>Estimated Total</span>
                  <span className="text-base text-brand-dark font-playfair">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full bg-brand-dark text-white py-3.5 px-4 text-xs font-semibold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 flex items-center justify-center gap-2 rounded-sm shadow"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full block text-center py-2 text-xs uppercase tracking-wider text-brand-dark/80 hover:text-brand-gold transition-colors font-medium"
                >
                  View Full Bag & Apply Coupons
                </Link>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-brand-grey border-t border-neutral-100">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                <span>100% Genuine Handlooms • Razorpay Encrypted Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
