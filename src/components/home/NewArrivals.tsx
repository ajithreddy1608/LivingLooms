'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/product/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function NewArrivals() {
  const { products } = useStore();
  
  // Show products marked isNew or top 4
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const displayProducts = newProducts.length > 0 ? newProducts : products.slice(0, 4);

  return (
    <section className="py-20 bg-[#EFE8DE]/50 border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh Off The Pit Looms</span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl text-brand-dark font-normal tracking-tight">
              NEW ARRIVALS
            </h2>
            <p className="text-sm text-brand-dark/70 font-light">
              Discover the latest masterworks crafted in limited artisanal batches.
            </p>
          </div>

          <Link
            href="/new-arrivals"
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-dark hover:text-brand-gold font-semibold transition-colors pb-1 border-b border-brand-border hover:border-brand-gold"
          >
            <span>VIEW ALL NEW ARRIVALS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-10 md:hidden">
          <Link
            href="/new-arrivals"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-brand-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-gold transition-colors"
          >
            <span>VIEW ALL NEW ARRIVALS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
