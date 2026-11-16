'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Sparkles, Feather, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';

export default function OurStoryPage() {
  const { settings } = useStore();

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Living Looms Chronicles</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-light text-brand-dark leading-tight">
            MORE THAN FASHION. A WAY OF EXPRESSION.
          </h1>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto" />
          <p className="text-sm sm:text-base text-brand-dark/75 font-light leading-relaxed">
            Living Looms was born from an unyielding devotion to India&apos;s sublime handloom traditions and a contemporary desire for relaxed, editorial grace.
          </p>
        </div>

        {/* Split Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-xl border border-brand-border bg-neutral-200">
            <Image
              src={settings.brandStoryImage}
              alt="Living Looms Master Weaver"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold block">
              The Loom & The Thread
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl text-brand-dark font-light leading-snug">
              Preserving Centuries of Pit-Loom Virtuosity
            </h2>
            <p className="text-xs sm:text-sm text-brand-dark/80 font-light leading-relaxed">
              Every warp and weft across our handloom sarees and sets is calibrated by human touch. We collaborate directly with hereditary master artisan clusters across Varanasi, Chanderi, and Bengal—honoring centuries of intricate supplementary weft techniques, tested metallic zari, and hand-twisted mulberry silks.
            </p>
            <p className="text-xs sm:text-sm text-brand-dark/80 font-light leading-relaxed">
              In a world flooded by fast synthetic fabrics, we embrace the patient luxury of pure natural fibers. The gentle slubs, the soft lustre, and the fluid drape are genuine hallmarks of authentic handcrafting.
            </p>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-dark text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold hover:text-brand-dark transition-all rounded-sm shadow"
              >
                <span>EXPLORE THE CURRENT WEAVES</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="bg-[#EFE8DE] p-8 sm:p-12 rounded-sm border border-brand-border space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-playfair text-2xl text-brand-dark">Our Atelier Ethos</h3>
            <p className="text-xs text-brand-dark/70 font-light">The principles guiding every creation at Living Looms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <Feather className="w-6 h-6 text-brand-gold mb-1" />
              <h4 className="font-playfair text-base font-semibold text-brand-dark">100% Pure Natural Fibers</h4>
              <p className="text-xs text-brand-dark/75 leading-relaxed font-light">
                We select certified mulberry silks, hand-spun cottons, organzas, and raw Tussar silks without artificial synthetic blending.
              </p>
            </div>

            <div className="space-y-2">
              <HeartHandshake className="w-6 h-6 text-brand-gold mb-1" />
              <h4 className="font-playfair text-base font-semibold text-brand-dark">Artisan Empowerment</h4>
              <p className="text-xs text-brand-dark/75 leading-relaxed font-light">
                Direct relationships ensure fair compensation and generational continuity for family-run pit looms.
              </p>
            </div>

            <div className="space-y-2">
              <ShieldCheck className="w-6 h-6 text-brand-gold mb-1" />
              <h4 className="font-playfair text-base font-semibold text-brand-dark">Bespoke Fitting & Finish</h4>
              <p className="text-xs text-brand-dark/75 leading-relaxed font-light">
                Each order undergoes rigorous three-stage hand inspection, custom blouse sizing, and breathable heirloom wrapping.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
