'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroCampaign() {
  const { settings } = useStore();

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Image with subtle Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src={settings.heroImage}
          alt="Living Looms Editorial Fashion Collection"
          fill
          priority
          className="object-cover object-top opacity-75 scale-100 hover:scale-105 transition-transform duration-[12000ms] ease-out"
        />
        {/* Soft Vignette / Editorial Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-black/30" />
        <div className="absolute inset-0 bg-[#392A23]/25 mix-blend-multiply" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center text-[#F8F5EF] space-y-6">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-brand-gold/60 bg-brand-dark/60 backdrop-blur-md text-brand-gold text-[11px] md:text-xs tracking-[0.25em] uppercase font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Handwoven Luxury • Living Looms '26</span>
        </div>

        {/* Headline */}
        <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide text-[#F8F5EF] leading-[1.1] whitespace-pre-line drop-shadow-md">
          {settings.heroTitle}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#F8F5EF]/90 font-light leading-relaxed tracking-wide font-inter">
          {settings.heroSubtitle}
        </p>

        {/* Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={settings.heroButtonLink || "/shop"}
            className="w-full sm:w-auto px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-dark text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>{settings.heroButtonText || "SHOP COLLECTION"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/our-story"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#F8F5EF]/60 hover:border-brand-gold hover:text-brand-gold text-[#F8F5EF] text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-xs flex items-center justify-center"
          >
            <span>DISCOVER OUR STORY</span>
          </Link>
        </div>

      </div>

      {/* Bottom Editorial Scroll indicator */}
      <div className="absolute bottom-6 inset-x-0 z-10 flex flex-col items-center justify-center text-[#F8F5EF]/60 text-[10px] tracking-[0.25em] uppercase pointer-events-none">
        <span className="mb-2">Scroll To Explore</span>
        <div className="w-[1px] h-8 bg-brand-gold/60 animate-pulse" />
      </div>
    </section>
  );
}
