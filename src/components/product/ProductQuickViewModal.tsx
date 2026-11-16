'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { X, Heart, ShoppingBag, ArrowRight, Check, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function ProductQuickViewModal() {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist 
  } = useStore();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedEffect, setAddedEffect] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);
  const activeSize = selectedSize || product.sizes[0];
  const activeColor = selectedColor || product.colors[0]?.name;

  const handleAddToCart = () => {
    addToCart(product, activeSize, activeColor, quantity);
    setAddedEffect(true);
    setTimeout(() => {
      setAddedEffect(false);
      setQuickViewProduct(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="fixed inset-0" 
        onClick={() => setQuickViewProduct(null)} 
      />

      <div className="relative bg-[#F8F5EF] w-full max-w-4xl rounded-sm shadow-2xl border border-brand-border z-10 overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-1.5 bg-white/80 rounded-full text-brand-dark hover:text-brand-gold shadow transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="md:w-1/2 bg-[#EFE8DE] p-6 flex flex-col justify-between">
          <div className="relative aspect-[3/4] w-full rounded overflow-hidden shadow-inner bg-neutral-200">
            <Image
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-brand-dark text-brand-gold text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-14 h-16 rounded overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImageIdx === idx ? 'border-brand-gold scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Buying */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-brand-gold font-medium">
                {product.category.replace('-', ' ')}
              </span>
              <div className="flex items-center gap-1 text-xs text-brand-dark font-medium">
                <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                <span>{product.rating}</span>
                <span className="text-brand-grey">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-playfair text-xl md:text-2xl font-medium text-brand-dark leading-snug">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-xl font-semibold text-brand-dark font-playfair">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-brand-grey line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount && (
                <span className="text-xs text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded font-medium">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Fabric Highlight */}
            <div className="text-xs bg-[#EFE8DE] p-2.5 rounded text-brand-dark border border-brand-border/60">
              <span className="font-semibold text-brand-gold uppercase tracking-wider block text-[10px]">
                Artisanal Fabric
              </span>
              {product.fabric}
            </div>

            {/* Description Excerpt */}
            <p className="text-xs text-brand-dark/80 line-clamp-3 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Size Options */}
            {product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-brand-dark uppercase tracking-wider">Select Size</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`text-xs px-3 py-1.5 rounded border transition-all ${
                        activeSize === sz
                          ? 'border-brand-dark bg-brand-dark text-white font-medium'
                          : 'border-brand-border bg-white text-brand-dark hover:border-brand-gold'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Options */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-medium text-brand-dark uppercase tracking-wider block">
                  Color: <strong className="font-semibold">{activeColor}</strong>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                        activeColor === c.name ? 'border-brand-dark scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {activeColor === c.name && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs uppercase tracking-wider text-brand-dark font-medium">Quantity</span>
              <div className="flex items-center border border-brand-border bg-white rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-xs text-brand-dark hover:text-brand-gold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-semibold text-brand-dark">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-xs text-brand-dark hover:text-brand-gold"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-brand-border">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={addedEffect}
                className="flex-1 bg-brand-dark text-white py-3 px-4 text-xs font-semibold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 flex items-center justify-center gap-2 rounded-sm shadow"
              >
                {addedEffect ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 border rounded-sm transition-colors ${
                  inWishlist 
                    ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' 
                    : 'border-brand-border bg-white text-brand-dark hover:text-brand-gold'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-brand-gold' : ''}`} />
              </button>
            </div>

            <Link
              href={`/shop/${product.slug}`}
              onClick={() => setQuickViewProduct(null)}
              className="w-full text-center py-2 text-xs uppercase tracking-wider text-brand-dark hover:text-brand-gold transition-colors flex items-center justify-center gap-1 font-medium"
            >
              <span>View Full Product Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
