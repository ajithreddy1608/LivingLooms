import React from 'react';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#F8F5EF] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-2 border-b border-brand-border pb-6">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold block">Fulfilment & Transit</span>
          <h1 className="font-playfair text-3xl sm:text-4xl text-brand-dark font-light">SHIPPING & DELIVERY POLICY</h1>
          <p className="text-xs text-brand-grey">Last updated: November 2026 • Client Demonstration Reference</p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-sm border border-brand-border space-y-6 text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">1. Complimentary Express Domestic Shipping</h2>
            <p>
              Living Looms offers complimentary express shipping on all domestic orders across India. Every parcel is dispatched with transit insurance and protective, moisture-resistant heirloom keepsake packaging.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">2. Dispatch Timelines</h2>
            <p>
              • Ready-to-ship handloom sarees and unstitched silhouettes: Dispatched within 2 to 3 business days.<br />
              • Custom-stitched blouses and tailored coordinates: Require 7 to 10 business days for bespoke artisan completion prior to dispatch.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">3. Courier Partners & Tracking</h2>
            <p>
              We partner with Tier-1 logistics carriers including BlueDart Express, Delhivery, and DTDC. Upon dispatch, your tracking AWB reference and tracking link are transmitted via SMS and email, and can be tracked in real-time through our Order Tracking portal.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
