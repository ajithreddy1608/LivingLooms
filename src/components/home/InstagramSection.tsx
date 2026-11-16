'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { Instagram, Play, Sparkles } from 'lucide-react';

export default function InstagramSection() {
  const { instagramReels, settings } = useStore();

  // Filter only active reels and sort by order, taking exactly 3 slots
  const activeReels = instagramReels
    .filter(reel => reel.isActive)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return (
    <section id="world-of-living-looms" className="py-24 bg-[#F8F5EF] border-t border-brand-border/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
            <Instagram className="w-4 h-4" />
            <span>@livinglooms.in</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-brand-dark font-normal tracking-tight">
            THE WORLD OF LIVING LOOMS
          </h2>

          <div className="w-12 h-[1px] bg-brand-gold mx-auto" />

          <p className="text-sm md:text-base text-brand-dark/70 font-light">
            Discover our latest styles, stories, and inspirations.
          </p>
        </div>

        {/* Three Reel Cards Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {activeReels.map((reel) => {
            const hasCover = Boolean(reel.coverImage && reel.coverImage.trim() !== '');

            return (
              <a
                key={reel.id}
                href={reel.url || settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-lg overflow-hidden bg-[#EFE8DE] shadow-sm hover:shadow-xl border border-brand-border/80 transition-all duration-500 ease-out cursor-pointer block"
                title={`Watch ${reel.title} on Instagram`}
              >
                {/* 4:5 / 9:16 Portrait Image Presentation Frame */}
                <div className="relative aspect-[4/5] sm:aspect-[9/14] w-full overflow-hidden bg-[#EFE8DE]">
                  {hasCover ? (
                    <Image
                      src={reel.coverImage!}
                      alt={reel.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    /* Clean Branded Editorial Placeholder when cover photo is awaiting upload */
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#F4EFEA] to-[#EFE8DE] border border-dashed border-brand-gold/40 relative">
                      <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 transition-transform">
                        <Instagram className="w-7 h-7" />
                      </div>
                      <span className="font-playfair text-lg text-brand-dark font-medium tracking-wide">
                        LIVING LOOMS
                      </span>
                      <span className="text-[10px] tracking-[0.25em] text-brand-gold uppercase mt-1">
                        INSTAGRAM REEL
                      </span>
                      <p className="text-xs text-brand-grey font-serif italic mt-3 line-clamp-2 max-w-[200px]">
                        {reel.title}
                      </p>
                    </div>
                  )}

                  {/* Soft Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Small Instagram / Reels Icon in Top Right */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/20 shadow-xs group-hover:bg-brand-dark group-hover:text-brand-gold transition-colors">
                      <Instagram className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Optional Subtle Play Icon Overlay in Center */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-xs text-brand-dark flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-300 opacity-80 group-hover:opacity-100">
                      <Play className="w-5 h-5 fill-brand-dark ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Minimal Title Pill */}
                  <div className="absolute bottom-0 inset-x-0 p-4 z-10 text-[#F8F5EF] space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-brand-gold font-medium block">
                      Watch Reel
                    </span>
                    <h3 className="font-playfair text-sm sm:text-base font-medium text-white line-clamp-1 group-hover:text-brand-gold transition-colors">
                      {reel.title}
                    </h3>
                  </div>

                </div>
              </a>
            );
          })}
        </div>

        {/* Follow on Instagram Button */}
        <div className="text-center mt-14 space-y-3">
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-brand-dark text-brand-gold hover:bg-brand-gold hover:text-brand-dark text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md border border-brand-gold/40 group rounded-sm"
          >
            <Instagram className="w-4 h-4 text-brand-gold group-hover:text-brand-dark transition-colors" />
            <span>FOLLOW @LIVINGLOOMS.IN ON INSTAGRAM</span>
          </a>
          <p className="text-xs text-brand-grey font-light">
            Stay tuned for daily weaver chronicles, draping masterclasses, and exclusive drops.
          </p>
        </div>

      </div>
    </section>
  );
}
