import React from 'react';

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-[#F8F5EF] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-2 border-b border-brand-border pb-6">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold block">Legal & Guidelines</span>
          <h1 className="font-playfair text-3xl sm:text-4xl text-brand-dark font-light">TERMS & CONDITIONS</h1>
          <p className="text-xs text-brand-grey">Last updated: November 2026 • Client Demonstration Reference</p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-sm border border-brand-border space-y-6 text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Living Looms e-commerce boutique platform, you agree to be bound by these terms. All products featured are handcrafted using genuine handloom techniques.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">2. Handloom Authenticity & Characteristic Variations</h2>
            <p>
              Hand-spun yarns, authentic metallic zari weft, and manual hand-block prints inherently carry subtle variations in weave density, slub texture, and dye tone. These natural characteristics are not flaws, but authentic hallmarks certifying that the garment was crafted by human hands on an artisanal loom.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">3. Pricing & Taxes</h2>
            <p>
              All prices displayed on livinglooms.in are inclusive of applicable Indian Goods and Services Tax (GST). Delivery across India is provided on a complimentary insured basis.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">4. Intellectual Property</h2>
            <p>
              All brand marks, editorial photography, reel narratives, and design silhouettes are the exclusive property of Living Looms and protected by copyright law.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
