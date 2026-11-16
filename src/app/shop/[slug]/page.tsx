'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/product/ProductCard';
import { 
  Heart, 
  ShoppingBag, 
  Share2, 
  Check, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  MessageCircle,
  Clock,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { 
    products, 
    getProductBySlug, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    settings 
  } = useStore();

  const product = getProductBySlug(slug) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Natural');
  const [quantity, setQuantity] = useState(1);
  const [addedEffect, setAddedEffect] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');

  const inWishlist = isInWishlist(product.id);

  // Related products from same category or collection
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedEffect(true);
    setTimeout(() => setAddedEffect(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  const whatsappInquiryUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hello Living Looms Concierge, I would like to inquire about the "${product.name}" (Price: ${formatPrice(product.price)}). Is this piece available for customization?`
  )}`;

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-grey font-medium">
          <Link href="/" className="hover:text-brand-dark">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-brand-dark">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-brand-dark">
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-gold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero: Two-column layout (Gallery & Specs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Gallery (7 Cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnails Stack (Desktop/Tablet left column) */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[640px] pb-2 md:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-20 md:w-20 md:h-24 rounded-sm overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImageIdx === idx ? 'border-brand-gold shadow' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Featured Photograph with Zoom Frame */}
            <div className="relative aspect-[3/4] flex-1 rounded-sm overflow-hidden bg-neutral-200 border border-brand-border shadow-sm group">
              <Image
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-110 cursor-crosshair"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 bg-brand-dark text-brand-gold text-[10px] tracking-widest uppercase font-semibold px-3 py-1 shadow">
                  {product.badge}
                </span>
              )}

              <div className="absolute bottom-3 right-3 bg-brand-dark/70 backdrop-blur-xs text-white p-2 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1 text-[10px]">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Hover to zoom</span>
              </div>
            </div>

          </div>

          {/* Right Product Purchase Dossier (5 Cols on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Category & Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">
                {product.category.replace('-', ' ')}
              </span>
              <span className="text-xs text-brand-grey font-mono">
                SKU: LL-{product.id.toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-light text-brand-dark leading-tight">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 pb-2 border-b border-brand-border">
              <span className="font-playfair text-2xl sm:text-3xl font-semibold text-brand-dark">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-brand-grey line-through font-light">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount && (
                <span className="text-xs text-emerald-800 bg-emerald-100/90 font-medium px-2 py-0.5 rounded">
                  Save {product.discount}%
                </span>
              )}
              <span className="text-[11px] text-brand-grey ml-auto">
                Taxes included • Free Express Shipping
              </span>
            </div>

            {/* Fabric Highlight Box */}
            <div className="bg-[#EFE8DE] p-3 rounded-sm border border-brand-border/70 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-brand-gold font-semibold block">
                  Artisanal Weave Specification
                </span>
                <p className="text-xs text-brand-dark font-medium mt-0.5">
                  {product.fabric}
                </p>
              </div>
            </div>

            {/* Short Narrative */}
            <p className="text-xs sm:text-sm text-brand-dark/80 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Available Sizes */}
            {product.sizes.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-brand-dark">
                    Select Size: <strong className="text-brand-gold">{selectedSize}</strong>
                  </span>
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gold hover:underline text-[11px]"
                  >
                    Need Custom Sizing?
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`text-xs px-3.5 py-2 rounded-sm border transition-all ${
                        selectedSize === sz
                          ? 'border-brand-dark bg-brand-dark text-white font-medium shadow-xs'
                          : 'border-brand-border bg-white text-brand-dark hover:border-brand-gold'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Available Colors */}
            {product.colors.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-dark block">
                  Colorway: <strong className="text-brand-gold">{selectedColor}</strong>
                </span>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === c.name ? 'border-brand-dark scale-110 shadow' : 'border-neutral-300'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Availability */}
            <div className="flex items-center gap-2 text-xs text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Available in Atelier — Handcrafted batch ({product.stock} units remain)</span>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-brand-border bg-white rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs text-brand-dark hover:text-brand-gold"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-semibold text-brand-dark">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs text-brand-dark hover:text-brand-gold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  disabled={addedEffect}
                  className="flex-1 bg-brand-dark text-white py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 flex items-center justify-center gap-2 rounded-sm shadow"
                >
                  {addedEffect ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added To Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add To Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 border rounded-sm transition-colors ${
                    inWishlist 
                      ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' 
                      : 'border-brand-border bg-white text-brand-dark hover:text-brand-gold'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-brand-gold' : ''}`} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-dark py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-sm shadow-md flex items-center justify-center gap-2"
              >
                <span>Buy Now • Express Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* WhatsApp Concierge Inquiry */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 border border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 rounded-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Ask Atelier via WhatsApp</span>
              </a>
            </div>

            {/* Informational Tabs (Details / Care / Delivery) */}
            <div className="pt-6 border-t border-brand-border space-y-4">
              <div className="flex border-b border-brand-border text-xs uppercase tracking-wider font-semibold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 mr-6 transition-colors border-b-2 ${
                    activeTab === 'details' ? 'border-brand-gold text-brand-dark' : 'border-transparent text-brand-grey'
                  }`}
                >
                  Craft & Weave
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 mr-6 transition-colors border-b-2 ${
                    activeTab === 'care' ? 'border-brand-gold text-brand-dark' : 'border-transparent text-brand-grey'
                  }`}
                >
                  Care Guide
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 transition-colors border-b-2 ${
                    activeTab === 'shipping' ? 'border-brand-gold text-brand-dark' : 'border-transparent text-brand-grey'
                  }`}
                >
                  Shipping & Returns
                </button>
              </div>

              {/* Tab Contents */}
              <div className="text-xs text-brand-dark/80 font-light leading-relaxed">
                {activeTab === 'details' && (
                  <div className="space-y-2">
                    <p>• <strong>Primary Material:</strong> {product.fabric}</p>
                    <p>• <strong>Authenticity:</strong> Sourced directly from authentic weaver guild clusters in India.</p>
                    <p>• <strong>Artisanal Note:</strong> Minor irregular slubs in yarn or zari threads reflect genuine hand-loom origin.</p>
                  </div>
                )}

                {activeTab === 'care' && (
                  <ul className="list-disc pl-4 space-y-1">
                    {product.care.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <p>• <strong>Domestic Dispatch:</strong> Dispatched in 2–4 business days via insured express courier (BlueDart / Delhivery).</p>
                    <p>• <strong>Delivery Time:</strong> 3–6 business days across all major Indian metro & tier-1 cities.</p>
                    <p>• <strong>Returns:</strong> 7-day seamless return window for unstitched & unused pieces with security tags intact.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-brand-border space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold block">
                Harmonious Pairings
              </span>
              <h3 className="font-playfair text-2xl sm:text-3xl text-brand-dark font-light">
                COMPLETE THE LIVING LOOMS LOOK
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
