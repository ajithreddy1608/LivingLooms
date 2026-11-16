'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      className="group relative flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EFE8DE] rounded-sm shadow-sm border border-brand-border/40">
        
        {/* Main & Secondary Image on hover */}
        <Link href={`/shop/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              isHovered && product.images.length > 1 ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {product.images.length > 1 && (
            <Image
              src={secondaryImage}
              alt={`${product.name} Alternate View`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-all duration-700 ease-in-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-brand-dark/90 backdrop-blur-xs text-brand-gold text-[9px] md:text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-xs">
              {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="bg-white/95 text-brand-dark text-[9px] md:text-[10px] tracking-wider font-semibold px-2 py-0.5 rounded-xs shadow-xs">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full transition-all duration-300 shadow-sm ${
            inWishlist 
              ? 'bg-white text-brand-gold scale-110' 
              : 'bg-white/80 text-brand-dark hover:bg-white hover:text-brand-gold opacity-90 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-4 h-4 transition-colors ${inWishlist ? 'fill-brand-gold text-brand-gold' : ''}`} />
        </button>

        {/* Bottom Floating Quick Actions Bar (Slides up on Hover) */}
        <div className="absolute bottom-0 inset-x-0 p-2.5 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex gap-2">
          <button
            onClick={handleQuickAdd}
            disabled={justAdded}
            className="flex-1 bg-brand-dark/95 hover:bg-brand-gold text-white text-[11px] font-semibold tracking-widest uppercase py-2.5 px-3 rounded-xs flex items-center justify-center gap-1.5 shadow-md backdrop-blur-xs transition-colors duration-200"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>

          <button
            onClick={handleQuickView}
            aria-label="Quick View"
            className="bg-white/95 hover:bg-brand-gold hover:text-white text-brand-dark p-2.5 rounded-xs shadow-md transition-colors duration-200"
            title="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Product Details Section */}
      <div className="pt-3 pb-2 flex flex-col flex-1 justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-medium block mb-1">
            {product.category.replace('-', ' ')}
          </span>

          {/* Product Name */}
          <Link href={`/shop/${product.slug}`} className="block">
            <h3 className="font-playfair text-sm md:text-base font-medium text-brand-dark hover:text-brand-gold line-clamp-1 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Fabric Subline */}
          <p className="text-[11px] text-brand-grey line-clamp-1 mt-0.5 font-light">
            {product.fabric}
          </p>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-playfair font-semibold text-sm md:text-base text-brand-dark">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-brand-grey line-through font-light">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
