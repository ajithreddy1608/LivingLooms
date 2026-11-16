'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Feather, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function BrandStory() {
  const { settings } = useStore();

  return (
    <section className="py-24 bg-[#EFE8DE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Lifestyle / Artisan Photography */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-xl border border-brand-border bg-neutral-200">
              <Image
                src={settings.brandStoryImage}
                alt="Living Looms Handloom Artisan Weaving"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-dark/10" />
            </div>

            {/* Floating Luxury Accent Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#F8F5EF] p-6 rounded-sm shadow-xl border border-brand-border max-w-xs space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold block">
                Ethical Atelier
              </span>
              <p className="text-xs text-brand-dark font-serif italic leading-relaxed">
                &ldquo;Every weave preserves an heirloom lineage, supporting multigenerational weaver clusters.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold block">
                Artisanal Lineage & Philosophy
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-brand-dark leading-tight whitespace-pre-line">
                {settings.brandStoryTitle}
              </h2>
            </div>

            <div className="w-16 h-[1.5px] bg-brand-gold" />

            <p className="text-sm md:text-base text-brand-dark/80 font-light leading-relaxed">
              {settings.brandStoryText}
            </p>

            <p className="text-xs sm:text-sm text-brand-dark/70 font-light leading-relaxed">
              We reject fleeting industrial trends in favor of enduring poetry: delicate Varanasi zari warp, breathable Chanderi silks, and handcrafted Jamdani textures designed to be treasured across seasons and milestones.
            </p>

            {/* Three Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-brand-border">
              <div className="space-y-1">
                <Feather className="w-5 h-5 text-brand-gold mb-1" />
                <h4 className="font-playfair text-sm font-semibold text-brand-dark">Pure Silks</h4>
                <p className="text-[11px] text-brand-grey font-light">Natural mulberry & wild Tussar fibers.</p>
              </div>

              <div className="space-y-1">
                <HeartHandshake className="w-5 h-5 text-brand-gold mb-1" />
                <h4 className="font-playfair text-sm font-semibold text-brand-dark">Direct Craft</h4>
                <p className="text-[11px] text-brand-grey font-light">Empowering hereditary master looms.</p>
              </div>

              <div className="space-y-1">
                <ShieldCheck className="w-5 h-5 text-brand-gold mb-1" />
                <h4 className="font-playfair text-sm font-semibold text-brand-dark">Bespoke Fit</h4>
                <p className="text-[11px] text-brand-grey font-light">Custom tailored blouse & silhouette sizing.</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/our-story"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md group"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
