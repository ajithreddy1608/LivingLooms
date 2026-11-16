'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/product/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function NewArrivalsPage() {
  const { products } = useStore();
  const newProducts = products.filter(p => p.isNew || p.badge === 'New Arrival');
  const displayList = newProducts.length > 0 ? newProducts : products.slice(0, 6);

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Launch</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-light text-brand-dark">
            NEW ARRIVALS
          </h1>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
          <p className="text-sm md:text-base text-brand-dark/70 font-light">
            The freshest creations fresh from our hereditary master weavers. Handcrafted in limited artisanal editions.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#EFE8DE] p-8 sm:p-12 rounded-sm border border-brand-border text-center space-y-4 max-w-3xl mx-auto">
          <h3 className="font-playfair text-2xl text-brand-dark">
            Looking for something bespoke?
          </h3>
          <p className="text-xs sm:text-sm text-brand-dark/70 max-w-lg mx-auto font-light leading-relaxed">
            Our atelier crafts custom blouse tailoring, bespoke zari borders, and made-to-measure coordinates for celebratory occasions.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-gold hover:text-brand-dark transition-colors"
            >
              <span>Speak with Our Stylist Concierge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
