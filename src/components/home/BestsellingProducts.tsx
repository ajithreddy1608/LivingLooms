'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/product/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function BestsellingProducts() {
  const { products, categories } = useStore();
  const [selectedCat, setSelectedCat] = useState<string>('all');

  // Filter products
  const bestsellers = products.filter(p => p.isBestseller || p.badge === 'Bestseller');
  const sourceProducts = bestsellers.length >= 4 ? bestsellers : products;

  const filtered = selectedCat === 'all' 
    ? sourceProducts 
    : sourceProducts.filter(p => p.category === selectedCat);

  return (
    <section className="py-20 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold block">
            Client Favorites & Signatures
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl text-brand-dark font-normal tracking-tight">
            OUR MOST LOVED STYLES
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
          <p className="text-sm md:text-base text-brand-dark/70 font-light">
            Timeless masterworks favored for weddings, festive gatherings, and discerning everyday elegance.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full transition-all ${
              selectedCat === 'all'
                ? 'bg-brand-dark text-white font-semibold shadow-xs'
                : 'bg-[#EFE8DE] text-brand-dark hover:bg-brand-gold/20'
            }`}
          >
            All Signatures
          </button>
          {categories.slice(0, 4).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full transition-all ${
                selectedCat === cat.slug
                  ? 'bg-brand-dark text-white font-semibold shadow-xs'
                  : 'bg-[#EFE8DE] text-brand-dark hover:bg-brand-gold/20'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filtered.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Shop All Signatures */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
          >
            <span>VIEW ALL CLIENT SIGNATURES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
