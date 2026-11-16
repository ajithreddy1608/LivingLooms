'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

export default function CustomerTestimonials() {
  const { testimonials } = useStore();
  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = testimonials[currentIdx];

  return (
    <section className="py-24 bg-[#EFE8DE] border-t border-brand-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold block">
            Client Words & Experiences
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl text-brand-dark font-normal tracking-tight">
            LOVE FROM OUR CUSTOMERS
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
          <p className="text-[11px] text-brand-grey uppercase tracking-widest">
            (Demonstration Sample Testimonials)
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-[#F8F5EF] p-8 sm:p-12 rounded-sm shadow-md border border-brand-border text-center space-y-6">
          
          <Quote className="w-10 h-10 text-brand-gold/40 mx-auto" />

          {/* Rating */}
          <div className="flex items-center justify-center gap-1">
            {[...Array(activeTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
            ))}
          </div>

          {/* Review Text */}
          <p className="font-playfair text-base sm:text-xl text-brand-dark leading-relaxed font-light italic max-w-2xl mx-auto">
            &ldquo;{activeTestimonial.review}&rdquo;
          </p>

          {/* Customer Metadata */}
          <div className="pt-2 space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <h4 className="font-semibold text-sm text-brand-dark">
                {activeTestimonial.customerName}
              </h4>
              <span className="text-xs text-brand-grey">• {activeTestimonial.location}</span>
              {activeTestimonial.verified && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Patron</span>
                </span>
              )}
            </div>

            <p className="text-xs text-brand-gold font-medium">
              Acquired: {activeTestimonial.productPurchased}
            </p>
          </div>

          {/* Prev / Next Controls */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-brand-border hover:border-brand-gold text-brand-dark hover:text-brand-gold transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs text-brand-grey font-medium tracking-widest">
              0{currentIdx + 1} / 0{testimonials.length}
            </span>

            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-brand-border hover:border-brand-gold text-brand-dark hover:text-brand-gold transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
