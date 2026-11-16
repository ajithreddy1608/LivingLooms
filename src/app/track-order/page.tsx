'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  AlertCircle,
  ExternalLink 
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Order } from '@/types';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderNum = searchParams.get('orderNumber') || '';

  const { orders, getOrderByNumber } = useStore();

  const [orderQuery, setOrderQuery] = useState(initialOrderNum);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialOrderNum) {
      const found = getOrderByNumber(initialOrderNum);
      if (found) {
        setSearchedOrder(found);
      } else if (orders.length > 0) {
        setSearchedOrder(orders[0]);
      }
    } else if (orders.length > 0) {
      setSearchedOrder(orders[0]);
      setOrderQuery(orders[0].orderNumber);
    }
  }, [initialOrderNum, orders, getOrderByNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    const found = getOrderByNumber(orderQuery.trim());
    if (found) {
      setSearchedOrder(found);
      setError(false);
    } else {
      setSearchedOrder(null);
      setError(true);
    }
  };

  const steps = [
    { title: 'Order Placed', desc: 'Atelier received order', key: 'Placed' },
    { title: 'Artisanal Prep', desc: 'Inspection & packaging', key: 'Processing' },
    { title: 'In Transit', desc: 'Dispatched via express', key: 'Shipped' },
    { title: 'Delivered', desc: 'Handed over to patron', key: 'Delivered' },
  ];

  const getStepIndex = (status: Order['orderStatus']) => {
    if (status === 'Placed') return 0;
    if (status === 'Processing') return 1;
    if (status === 'Shipped') return 2;
    if (status === 'Delivered') return 3;
    return 0;
  };

  const currentStep = searchedOrder ? getStepIndex(searchedOrder.orderStatus) : 0;

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold block">
            Atelier Logistics & Delivery
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl font-light text-brand-dark">
            TRACK YOUR HEIRLOOM ORDER
          </h1>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
          <p className="text-xs sm:text-sm text-brand-dark/70 font-light">
            Enter your Living Looms order number (e.g. LL-2026-8941) to monitor live dispatch status.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white p-6 rounded-sm border border-brand-border shadow-xs max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-brand-grey absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Enter Order Number (e.g. LL-2026-8941)"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold font-mono uppercase"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-dark hover:bg-brand-gold text-white text-xs uppercase tracking-widest font-semibold px-6 py-2.5 transition-colors rounded"
            >
              Track
            </button>
          </form>

          {error && (
            <div className="mt-3 p-3 bg-red-50 text-red-700 text-xs rounded flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>No order matched &ldquo;{orderQuery}&rdquo;. Please verify your order number.</span>
            </div>
          )}
        </div>

        {/* Order Tracking Timeline Dossier */}
        {searchedOrder && (
          <div className="bg-white p-6 sm:p-10 rounded-sm border border-brand-border shadow-sm space-y-8">
            
            {/* Header metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-border gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold block">
                  Live Dispatch Dossier
                </span>
                <h3 className="font-playfair text-xl font-medium text-brand-dark">
                  Order Reference: {searchedOrder.orderNumber}
                </h3>
                <p className="text-xs text-brand-grey mt-0.5">
                  Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              <div className="bg-[#EFE8DE] p-3 rounded text-xs space-y-0.5 border border-brand-border">
                <div className="font-semibold text-brand-dark">
                  Courier: {searchedOrder.courierPartner || 'BlueDart Express Air'}
                </div>
                <div className="text-brand-grey font-mono text-[11px]">
                  AWB: {searchedOrder.trackingNumber || 'LL-98234120'}
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                {steps.map((st, idx) => {
                  const isDone = idx <= currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div key={st.key} className="flex flex-col items-center text-center space-y-2 relative z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors shadow-sm ${
                        isDone ? 'bg-brand-dark text-brand-gold' : 'bg-neutral-100 text-brand-grey border border-brand-border'
                      }`}>
                        {isDone ? <CheckCircle2 className="w-5 h-5 text-brand-gold" /> : (idx + 1)}
                      </div>
                      
                      <div>
                        <h4 className={`text-xs uppercase tracking-wider font-semibold ${
                          isCurrent ? 'text-brand-gold font-bold' : isDone ? 'text-brand-dark' : 'text-brand-grey'
                        }`}>
                          {st.title}
                        </h4>
                        <p className="text-[11px] text-brand-grey mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items Summary & Delivery Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-brand-border">
              
              {/* Destination */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-brand-gold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>Consignee Destination</span>
                </span>
                <div className="text-xs space-y-1 text-brand-dark/80 bg-[#F8F5EF] p-4 rounded border border-brand-border">
                  <p className="font-semibold text-brand-dark">{searchedOrder.shippingAddress.fullName}</p>
                  <p>{searchedOrder.shippingAddress.street}</p>
                  <p>{searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} - {searchedOrder.shippingAddress.pincode}</p>
                  <p className="text-brand-grey">Consignee Phone: {searchedOrder.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Items in Consignment */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-brand-gold flex items-center gap-1.5">
                  <Package className="w-4 h-4" />
                  <span>Consignment Package ({searchedOrder.items.length} Items)</span>
                </span>
                
                <div className="divide-y divide-brand-border bg-[#F8F5EF] p-3 rounded border border-brand-border">
                  {searchedOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center gap-3">
                      <div className="relative w-10 h-12 rounded overflow-hidden bg-neutral-200 flex-shrink-0">
                        <Image src={item.image} alt="" fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="font-medium text-brand-dark truncate">{item.name}</p>
                        <p className="text-[11px] text-brand-grey">Qty: {item.quantity} • Size: {item.size}</p>
                      </div>
                      <span className="text-xs font-semibold font-mono text-brand-dark">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F5EF] flex items-center justify-center p-8">Loading Order Tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
