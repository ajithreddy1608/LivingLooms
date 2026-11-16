'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { Search, X, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.fabric.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-brand-dark/70 backdrop-blur-md animate-fade-in">
      <div 
        className="fixed inset-0" 
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative bg-[#F8F5EF] w-full max-w-2xl rounded-sm shadow-2xl border border-brand-border z-10 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-brand-border bg-white">
          <Search className="w-5 h-5 text-brand-gold flex-shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search handloom sarees, Chanderi kurtas, Jamdani silks..."
            className="w-full text-base bg-transparent text-brand-dark placeholder:text-brand-grey focus:outline-none font-inter"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-brand-dark/60 hover:text-brand-dark transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[65vh] overflow-y-auto p-6">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-brand-gold font-medium">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['Varanasi Silk Saree', 'Chanderi Kurta', 'Jamdani Silk', 'Organza Anarkali', 'Brocade Dupatta', 'Festive Edit'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs bg-[#EFE8DE] hover:bg-brand-gold hover:text-white px-3 py-1.5 rounded-full text-brand-dark transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-brand-grey">
                Found {filteredProducts.length} curated design{filteredProducts.length === 1 ? '' : 's'}
              </p>
              <div className="divide-y divide-brand-border/60">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-4 py-3 group hover:bg-[#EFE8DE]/40 px-2 rounded transition-colors"
                  >
                    <div className="relative w-14 h-16 bg-neutral-100 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-brand-dark truncate font-playfair group-hover:text-brand-gold transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-brand-grey truncate">
                        {product.fabric}
                      </p>
                      <p className="text-xs font-semibold text-brand-dark mt-0.5">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-sm text-brand-grey">
                No matching creations found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-brand-gold mt-1">
                Explore our full catalogue in the Shop section.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#EFE8DE] border-t border-brand-border flex items-center justify-between text-xs text-brand-grey">
          <span>Press ESC or click outside to close</span>
          <Link
            href="/shop"
            onClick={() => setIsSearchOpen(false)}
            className="text-brand-dark font-medium hover:text-brand-gold flex items-center gap-1"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
