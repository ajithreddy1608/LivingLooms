import React from 'react';

export default function ReturnAndRefundPolicyPage() {
  return (
    <div className="bg-[#F8F5EF] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-2 border-b border-brand-border pb-6">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold block">Client Protection</span>
          <h1 className="font-playfair text-3xl sm:text-4xl text-brand-dark font-light">RETURNS & REFUND POLICY</h1>
          <p className="text-xs text-brand-grey">Last updated: November 2026 • Client Demonstration Reference</p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-sm border border-brand-border space-y-6 text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">1. 7-Day Return Window</h2>
            <p>
              We want every patron to be thoroughly enchanted by their Living Looms creation. If you wish to initiate a return or exchange, please contact our concierge within 7 calendar days of parcel delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">2. Condition of Return</h2>
            <p>
              To qualify for a full refund or exchange:
              <br />• Garments must remain unwashed, unworn, and unstitched.
              <br />• Original security tags and woven certification labels must remain intact.
              <br />• Saree blouse fabrics must not have been severed or altered.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">3. Refund Processing</h2>
            <p>
              Once your returned creation is received and inspected at our atelier, refunds are initiated back to the original source payment method (via Razorpay or bank transfer) within 3 to 5 business days.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
