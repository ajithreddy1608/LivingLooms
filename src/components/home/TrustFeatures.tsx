'use client';

import React from 'react';
import { Sparkles, Truck, ShieldCheck, Clock, RefreshCw } from 'lucide-react';

export default function TrustFeatures() {
  const features = [
    {
      icon: Sparkles,
      title: "Authentic Handloom",
      description: "Directly procured from master pit-loom clusters across India."
    },
    {
      icon: Truck,
      title: "Complimentary Express",
      description: "Insured courier shipping on every domestic order."
    },
    {
      icon: ShieldCheck,
      title: "Purity Guarantee",
      description: "Tested pure mulberry silks and certified metallic zari weaves."
    },
    {
      icon: RefreshCw,
      title: "Concierge Assistance",
      description: "Bespoke blouse customization & direct WhatsApp styling."
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="flex items-start gap-4 p-2">
                <div className="w-10 h-10 rounded-full bg-[#EFE8DE] flex items-center justify-center flex-shrink-0 text-brand-gold">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-playfair text-sm font-semibold text-brand-dark">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-brand-grey font-light mt-0.5 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
