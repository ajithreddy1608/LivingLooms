'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { ArrowRight } from 'lucide-react';

export default function EditorialBanner() {
  const { settings } = useStore();

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden bg-brand-dark">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={settings.campaignImage}
          alt="Living Looms Editorial Fashion Expression"
          fill
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl space-y-6 text-[#F8F5EF]">
          
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold block">
              Editorial Dossier
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light tracking-wide leading-tight">
              {settings.campaignTitle}
            </h2>
          </div>

          <div className="w-16 h-[1.5px] bg-brand-gold" />

          <p className="text-sm sm:text-base text-[#F8F5EF]/85 font-light leading-relaxed">
            {settings.campaignSubtitle}
          </p>

          <div className="pt-2">
            <Link
              href="/shop?category=handloom-sarees"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-dark text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md group"
            >
              <span>EXPLORE THE DOSSIER</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
