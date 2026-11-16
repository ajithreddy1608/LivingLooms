'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedCampaign() {
  const { settings } = useStore();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-brand-dark">
      {/* Background Campaign Image using authentic Living Looms photography */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/products/living-looms-emerald-festive-lehenga-1.jpg"
          alt="Living Looms Grand Campaign"
          fill
          className="object-cover object-top opacity-45 scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark/40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#F8F5EF] space-y-6">
        
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>The Festive Atelier Drop</span>
        </div>

        <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-light tracking-wide leading-tight">
          DRAPED IN REGAL HERITAGE
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#F8F5EF]/85 font-light leading-relaxed">
          From luminous gold tissue sarees to gossamer Jamdani brocades, explore our celebratory curation designed to make every entrance unforgettable.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop?category=festive-collection"
            className="w-full sm:w-auto px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-dark text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>SHOP FESTIVE DROP</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/collections"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#F8F5EF]/60 hover:border-brand-gold hover:text-brand-gold text-[#F8F5EF] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 backdrop-blur-xs flex items-center justify-center"
          >
            <span>VIEW LOOKBOOK</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
