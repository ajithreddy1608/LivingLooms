'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  Printer, 
  ArrowRight, 
  ShoppingBag,
  ExternalLink 
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || '';

  const { orders, getOrderByNumber } = useStore();
  const order = getOrderByNumber(orderNumber) || orders[0];

  if (!order) {
    return (
      <div className="bg-[#F8F5EF] min-h-screen py-20 flex items-center justify-center">
        <div className="bg-white p-8 max-w-md text-center rounded-sm border border-brand-border space-y-4">
          <h2 className="font-playfair text-xl text-brand-dark">No Order Found</h2>
          <p className="text-xs text-brand-grey">Please check your order link or contact atelier concierge.</p>
          <Link href="/shop" className="inline-block bg-brand-dark text-white px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-brand-gold transition-colors">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Celebration Header */}
        <div className="bg-white p-8 sm:p-12 text-center rounded-sm border border-brand-border shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="relative h-12 w-48 mx-auto">
            <Image
              src="/images/living-looms-logo.png"
              alt="Living Looms by Manisha Reddy"
              fill
              className="object-contain"
            />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold block">
              Heirloom Order Confirmed
            </span>
            <h1 className="font-playfair text-2xl sm:text-4xl font-light text-brand-dark">
              THANK YOU FOR ACQUIRING FROM LIVING LOOMS
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-brand-dark/70 max-w-lg mx-auto font-light leading-relaxed">
            Your handcrafted order has been received at our atelier. A confirmation receipt has been dispatched to <strong>{order.customerEmail}</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <span className="bg-[#EFE8DE] px-4 py-2 text-xs font-mono font-semibold text-brand-dark rounded border border-brand-border">
              Order Reference: {order.orderNumber}
            </span>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 border border-brand-border rounded text-xs uppercase tracking-wider text-brand-dark hover:border-brand-gold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice Receipt</span>
            </button>
          </div>
        </div>

        {/* Order Details & Logistics Status */}
        <div className="bg-white p-6 sm:p-8 rounded-sm border border-brand-border shadow-xs space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-border gap-2">
            <div>
              <span className="text-xs text-brand-grey block">Dispatch Status</span>
              <span className="font-semibold text-sm uppercase tracking-wider text-brand-dark flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span>{order.orderStatus} • Packaging with Artisanal Care</span>
              </span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-brand-grey block">Courier Partner</span>
              <span className="font-semibold text-sm text-brand-dark">
                {order.courierPartner || 'BlueDart Express Air'}
              </span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-4">
            <h3 className="font-playfair text-base font-semibold uppercase tracking-wider text-brand-dark">
              Acquired Creations
            </h3>

            <div className="divide-y divide-brand-border/60">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex gap-4 items-center">
                  <div className="relative w-16 h-20 bg-neutral-100 flex-shrink-0 rounded overflow-hidden border border-brand-border">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-playfair text-sm font-medium text-brand-dark truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-brand-grey">
                      Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right font-playfair font-semibold text-sm text-brand-dark">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown & Shipping Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-brand-border">
            
            {/* Shipping Destination */}
            <div className="space-y-2 text-xs">
              <span className="uppercase tracking-wider font-semibold text-brand-gold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Delivery Address</span>
              </span>
              <p className="font-semibold text-brand-dark">{order.shippingAddress.fullName}</p>
              <p className="text-brand-dark/80">{order.shippingAddress.street}</p>
              <p className="text-brand-dark/80">
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <p className="text-brand-grey">Contact: {order.shippingAddress.phone}</p>
            </div>

            {/* Payment Summary */}
            <div className="space-y-2 text-xs bg-[#F8F5EF] p-4 rounded border border-brand-border">
              <div className="flex justify-between text-brand-grey">
                <span>Subtotal</span>
                <span className="font-mono text-brand-dark">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Privilege Savings</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-brand-grey">
                <span>Express Courier Shipping</span>
                <span className="text-brand-gold uppercase font-medium">Free</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-brand-dark pt-2 border-t border-brand-border">
                <span>Total Amount</span>
                <span className="font-playfair text-base">{formatPrice(order.total)}</span>
              </div>
              <div className="text-[11px] text-brand-grey pt-1">
                Payment Method: <strong className="uppercase">{order.paymentMethod}</strong> ({order.paymentStatus})
              </div>
            </div>

          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/track-order?orderNumber=${order.orderNumber}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-brand-gold font-semibold hover:underline"
            >
              <span>Track Live Delivery Progress</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/shop"
              className="bg-brand-dark text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-brand-gold hover:text-brand-dark transition-colors rounded-sm"
            >
              Explore More Creations
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F5EF] flex items-center justify-center p-8">Loading Order Confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
