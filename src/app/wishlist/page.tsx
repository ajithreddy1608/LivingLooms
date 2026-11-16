'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function WishlistPage() {
  const { wishlist, products, toggleWishlist, addToCart } = useStore();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="border-b border-brand-border/60 pb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-grey font-medium mb-2">
            <Link href="/" className="hover:text-brand-dark">Home</Link>
            <span>/</span>
            <span className="text-brand-gold">My Wishlist</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="font-playfair text-3xl sm:text-4xl font-light text-brand-dark">
              SAVED SILHOUETTES
            </h1>
            <span className="text-xs uppercase tracking-widest text-brand-grey">
              {wishlistProducts.length} Saved Design{wishlistProducts.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white p-12 sm:p-20 text-center rounded-sm border border-brand-border space-y-6 max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#EFE8DE] flex items-center justify-center mx-auto text-brand-gold">
              <Heart className="w-10 h-10 opacity-70" />
            </div>

            <div className="space-y-2">
              <h2 className="font-playfair text-2xl text-brand-dark">
                Your Wishlist Is Empty
              </h2>
              <p className="text-xs sm:text-sm text-brand-grey max-w-md mx-auto font-light leading-relaxed">
                Save pieces you love as you browse through our handwoven collections. Return whenever you are ready to make them your own.
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-sm border border-brand-border overflow-hidden shadow-xs flex flex-col justify-between group"
              >
                <div className="relative aspect-[3/4] w-full bg-[#EFE8DE] overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-2 bg-white/90 rounded-full text-brand-gold hover:text-red-700 shadow transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-brand-gold font-medium block">
                      {product.category.replace('-', ' ')}
                    </span>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="font-playfair text-sm font-medium text-brand-dark hover:text-brand-gold line-clamp-1 block transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="font-playfair font-semibold text-sm text-brand-dark">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-1.5 rounded-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move To Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
