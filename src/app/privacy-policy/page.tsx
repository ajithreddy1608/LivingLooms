import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F8F5EF] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-2 border-b border-brand-border pb-6">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold block">Legal & Privacy</span>
          <h1 className="font-playfair text-3xl sm:text-4xl text-brand-dark font-light">PRIVACY POLICY</h1>
          <p className="text-xs text-brand-grey">Last updated: November 2026 • Client Demonstration Reference</p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-sm border border-brand-border space-y-6 text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">1. Commitment to Patron Privacy</h2>
            <p>
              At Living Looms (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we treat your personal information with the same meticulous care and respect as our handcrafted weaves. This Privacy Policy details how we collect, store, and safeguard your details during your visit to livinglooms.in.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">2. Information We Collect</h2>
            <p>
              When you browse our collections, create a patron account, or complete an acquisition, we collect necessary identifiers: your full name, shipping and billing address, email address, phone number, and measurement specifications for tailored items.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">3. Payment & Gateway Security</h2>
            <p>
              All online payments are securely processed through PCI-DSS Level 1 compliant financial gateways including Razorpay. Living Looms never views, captures, or retains your complete credit/debit card numbers or net banking credentials on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">4. Third-Party Logistics Partners</h2>
            <p>
              Your delivery contact and address are shared solely with authorized domestic and international courier partners (such as BlueDart Express and Delhivery) exclusively to ensure the safe, insured delivery of your consignment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-playfair text-base font-semibold text-brand-dark uppercase tracking-wider">5. Contact Our Privacy Officer</h2>
            <p>
              For inquiries regarding personal data deletion or updates, please reach out to our concierge at concierge@livinglooms.in.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
