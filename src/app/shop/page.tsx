'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/product/ProductCard';
import { 
  SlidersHorizontal, 
  X, 
  Search, 
  ChevronDown, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const { products, categories } = useStore();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category param if URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Extract all available sizes and colors
  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => p.sizes.forEach(s => set.add(s)));
    return Array.from(set);
  }, [products]);

  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach(p => p.colors.forEach(c => map.set(c.name, c.hex)));
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = 
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.fabric.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Price Range
      if (priceRange === 'under-15000' && product.price >= 15000) return false;
      if (priceRange === '15000-25000' && (product.price < 15000 || product.price > 25000)) return false;
      if (priceRange === '25000-40000' && (product.price < 25000 || product.price > 40000)) return false;
      if (priceRange === 'above-40000' && product.price <= 40000) return false;

      // Size
      if (selectedSize !== 'all' && !product.sizes.includes(selectedSize)) {
        return false;
      }

      // Color
      if (selectedColor !== 'all' && !product.colors.some(c => c.name === selectedColor)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'bestseller') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, searchQuery, selectedCategory, priceRange, selectedSize, selectedColor, sortBy]);

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (selectedSize !== 'all' ? 1 : 0) +
    (selectedColor !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setSortBy('featured');
  };

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-brand-border/60 pb-8 mb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-grey font-medium">
            <span>Home</span>
            <span>/</span>
            <span className="text-brand-gold">Artisanal Shop</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-brand-dark">
                THE ATELIER CATALOGUE
              </h1>
              <p className="text-sm text-brand-dark/70 font-light mt-1">
                Handcrafted pure silk sarees, Chanderi sets, and modern ethnic coordinates.
              </p>
            </div>

            <p className="text-xs uppercase tracking-widest text-brand-grey">
              Showing <strong className="text-brand-dark">{filteredProducts.length}</strong> handcrafted creation{filteredProducts.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        {/* Toolbar: Search, Filter Toggle, Sort */}
        <div className="bg-white p-4 rounded-sm border border-brand-border flex flex-col md:flex-row items-center justify-between gap-4 mb-8 shadow-xs">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-brand-grey absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by weave, fabric, or title..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold font-inter"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-grey hover:text-brand-dark"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 border border-brand-border rounded text-xs uppercase tracking-wider text-brand-dark font-medium hover:border-brand-gold"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-brand-grey hidden sm:inline uppercase tracking-wider">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F8F5EF] border border-brand-border text-brand-dark py-2 px-3 rounded focus:outline-none focus:border-brand-gold font-medium uppercase tracking-wider text-xs"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">Newest Arrivals</option>
                <option value="bestseller">Client Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block space-y-8 pr-4">
            
            {/* Header / Reset */}
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <h3 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">
                Refine Weaves
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] text-brand-gold hover:underline flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-[0.15em] text-brand-dark font-semibold">
                Categories
              </h4>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-brand-dark text-white font-medium'
                      : 'text-brand-dark/80 hover:bg-[#EFE8DE]'
                  }`}
                >
                  <span>All Creations</span>
                  <span className="text-[11px] opacity-70">({products.length})</span>
                </button>
                {categories.map((cat) => {
                  const count = products.filter(p => p.category === cat.slug).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? 'bg-brand-dark text-white font-medium'
                          : 'text-brand-dark/80 hover:bg-[#EFE8DE]'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span className="text-[11px] opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pt-4 border-t border-brand-border">
              <h4 className="text-xs uppercase tracking-[0.15em] text-brand-dark font-semibold">
                Price Range
              </h4>
              <div className="space-y-1.5 text-xs text-brand-dark/80">
                {[
                  { id: 'all', label: 'All Price Tiers' },
                  { id: 'under-15000', label: 'Under ₹15,000' },
                  { id: '15000-25000', label: '₹15,000 – ₹25,000' },
                  { id: '25000-40000', label: '₹25,000 – ₹40,000' },
                  { id: 'above-40000', label: 'Above ₹40,000' },
                ].map((tier) => (
                  <label key={tier.id} className="flex items-center gap-2 cursor-pointer hover:text-brand-gold py-1">
                    <input
                      type="radio"
                      name="priceTier"
                      checked={priceRange === tier.id}
                      onChange={() => setPriceRange(tier.id)}
                      className="accent-brand-dark"
                    />
                    <span>{tier.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            {availableSizes.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-brand-border">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-[0.15em] text-brand-dark font-semibold">
                    Size
                  </h4>
                  {selectedSize !== 'all' && (
                    <button onClick={() => setSelectedSize('all')} className="text-[10px] text-brand-gold">Clear</button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedSize('all')}
                    className={`text-xs px-2.5 py-1 rounded border transition-all ${
                      selectedSize === 'all'
                        ? 'border-brand-dark bg-brand-dark text-white font-medium'
                        : 'border-brand-border bg-white text-brand-dark hover:border-brand-gold'
                    }`}
                  >
                    All
                  </button>
                  {availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`text-xs px-2.5 py-1 rounded border transition-all ${
                        selectedSize === sz
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

            {/* Color Filter */}
            {availableColors.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-brand-border">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-[0.15em] text-brand-dark font-semibold">
                    Palette
                  </h4>
                  {selectedColor !== 'all' && (
                    <button onClick={() => setSelectedColor('all')} className="text-[10px] text-brand-gold">Clear</button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(selectedColor === c.name ? 'all' : c.name)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        selectedColor === c.name ? 'border-brand-dark scale-125 shadow' : 'border-neutral-300'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-sm border border-brand-border space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE8DE] flex items-center justify-center mx-auto text-brand-gold">
                  <Sparkles className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-playfair text-xl text-brand-dark">
                  No matching silhouettes found
                </h3>
                <p className="text-xs text-brand-grey max-w-sm mx-auto">
                  Try clearing your filters or exploring another handcrafted category.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="bg-brand-dark text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-brand-gold transition-colors inline-block"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-xs bg-[#F8F5EF] h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto p-6">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <h3 className="font-playfair text-lg font-semibold text-brand-dark">Filters</h3>
                <button 
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-brand-dark hover:text-brand-gold"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-brand-gold font-bold">Category</h4>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`block w-full text-left py-1.5 px-2 rounded ${
                      selectedCategory === 'all' ? 'bg-brand-dark text-white font-medium' : 'text-brand-dark'
                    }`}
                  >
                    All Creations
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`block w-full text-left py-1.5 px-2 rounded ${
                        selectedCategory === c.slug ? 'bg-brand-dark text-white font-medium' : 'text-brand-dark'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2 pt-3 border-t border-brand-border text-xs">
                <h4 className="text-xs uppercase tracking-wider text-brand-gold font-bold">Price Range</h4>
                {[
                  { id: 'all', label: 'All Price Tiers' },
                  { id: 'under-15000', label: 'Under ₹15,000' },
                  { id: '15000-25000', label: '₹15,000 – ₹25,000' },
                  { id: '25000-40000', label: '₹25,000 – ₹40,000' },
                  { id: 'above-40000', label: 'Above ₹40,000' },
                ].map((tier) => (
                  <label key={tier.id} className="flex items-center gap-2 py-1">
                    <input
                      type="radio"
                      name="mPriceTier"
                      checked={priceRange === tier.id}
                      onChange={() => setPriceRange(tier.id)}
                    />
                    <span>{tier.label}</span>
                  </label>
                ))}
              </div>

            </div>

            <div className="pt-6 border-t border-brand-border space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-brand-dark text-white py-3 text-xs uppercase tracking-widest font-semibold hover:bg-brand-gold transition-colors"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                onClick={resetAllFilters}
                className="w-full py-2 text-xs uppercase tracking-wider text-brand-grey hover:text-brand-dark"
              >
                Clear All
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F5EF] flex items-center justify-center p-8">Loading Atelier Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
