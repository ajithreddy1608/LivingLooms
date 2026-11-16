'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  const { settings } = useStore();

  if (!settings.announcementActive) return null;

  return (
    <div className="bg-brand-dark text-[#F8F5EF] text-[11px] md:text-xs py-2 px-4 tracking-widest uppercase transition-all duration-300 border-b border-[#4d3a31]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center font-medium">
        <Sparkles className="w-3 h-3 text-brand-gold animate-pulse-subtle flex-shrink-0" />
        <span className="truncate">{settings.announcementText}</span>
        <Sparkles className="w-3 h-3 text-brand-gold animate-pulse-subtle flex-shrink-0" />
      </div>
    </div>
  );
}
