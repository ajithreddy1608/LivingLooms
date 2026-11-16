'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/product/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CollectionsPage() {
  const { collections, products } = useStore();

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Living Looms Capsules</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-light text-brand-dark">
            ALL COLLECTIONS
          </h1>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
          <p className="text-sm md:text-base text-brand-dark/70 font-light">
            Thematic seasonal capsules celebrating heirloom techniques, seasonal silks, and artisanal mastery.
          </p>
        </div>

        {/* Collections Loop */}
        <div className="space-y-20">
          {collections.map((col, idx) => {
            const colProducts = products.filter(p => p.collection === col.slug);

            return (
              <div key={col.id} className="space-y-8">
                
                {/* Hero Banner for Collection */}
                <div className="relative h-[320px] sm:h-[400px] rounded-sm overflow-hidden shadow-md flex items-end p-8 bg-brand-dark">
                  <Image
                    src={col.banner || col.image}
                    alt={col.name}
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
                  
                  <div className="relative z-10 text-[#F8F5EF] max-w-xl space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-semibold block">
                      Capsule Edit 0{idx + 1}
                    </span>
                    <h2 className="font-playfair text-2xl sm:text-4xl font-light">
                      {col.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#F8F5EF]/85 font-light leading-relaxed">
                      {col.description}
                    </p>
                  </div>
                </div>

                {/* Collection Products Grid */}
                {colProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {colProducts.map((prod) => (
                      <ProductCard key={prod.id} product={prod} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-xs text-brand-grey bg-white p-6 rounded border border-brand-border">
                    Curating additional pieces for this capsule. Explore our other signatures in the shop.
                  </div>
                )}

                <div className="text-right">
                  <Link
                    href={`/shop?collection=${col.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-dark hover:text-brand-gold font-semibold transition-colors pb-1 border-b border-brand-dark hover:border-brand-gold"
                  >
                    <span>EXPLORE ALL {col.name.toUpperCase()} PIECES</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
