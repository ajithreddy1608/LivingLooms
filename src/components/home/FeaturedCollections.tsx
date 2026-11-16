'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { ArrowRight } from 'lucide-react';

export default function FeaturedCollections() {
  const { categories } = useStore();
  const featuredCategories = categories.filter(c => c.featured);

  return (
    <section className="py-20 bg-[#F8F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold block">
            Curated Artisanal Edits
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl text-brand-dark font-normal tracking-tight">
            EXPLORE OUR COLLECTIONS
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
          <p className="text-sm md:text-base text-brand-dark/70 font-light">
            Find the styles that speak to your grace, woven with centuries of Indian handloom lineage.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative h-[420px] rounded-sm overflow-hidden shadow-sm flex flex-col justify-end p-6 border border-brand-border/60"
            >
              {/* Category Background Image with Smooth Hover Zoom */}
              <div className="absolute inset-0 z-0 bg-neutral-200">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                {/* Soft gradient from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent group-hover:from-brand-dark/95 transition-colors duration-300" />
              </div>

              {/* Category Content */}
              <div className="relative z-10 space-y-2 text-[#F8F5EF] transform group-hover:-translate-y-1 transition-transform duration-300">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-medium block">
                  {category.itemCount || 12} Exclusive Designs
                </span>
                
                <h3 className="font-playfair text-xl md:text-2xl font-medium tracking-wide">
                  {category.name}
                </h3>
                
                <p className="text-xs text-[#F8F5EF]/75 font-light line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100">
                  {category.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold font-semibold">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Collections Link */}
        <div className="text-center mt-12">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-dark hover:text-brand-gold font-semibold border-b border-brand-dark hover:border-brand-gold pb-1 transition-colors"
          >
            <span>VIEW ALL CURATED SILHOUETTES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
