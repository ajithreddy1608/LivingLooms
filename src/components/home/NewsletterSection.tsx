'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    // Save subscriber to localStorage or database
    try {
      const existing = JSON.parse(localStorage.getItem('livinglooms_subscribers') || '[]');
      if (!existing.includes(email)) {
        existing.push({ email, subscribedAt: new Date().toISOString() });
        localStorage.setItem('livinglooms_subscribers', JSON.stringify(existing));
      }
    } catch (e) {
      console.error(e);
    }

    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-[#F8F5EF] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Living Looms Gazette</span>
        </div>

        <h2 className="font-playfair text-3xl sm:text-4xl text-brand-dark font-light tracking-wide">
          STAY INSPIRED
        </h2>

        <div className="w-12 h-[1px] bg-brand-gold mx-auto" />

        <p className="text-sm sm:text-base text-brand-dark/70 font-light max-w-lg mx-auto">
          Be the first to discover new arrivals, private collection previews, and artisan stories straight to your inbox.
        </p>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-sm max-w-md mx-auto flex items-center justify-center gap-3 text-emerald-800 text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            <span>Thank you for subscribing. You will receive our next seasonal preview.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-brand-grey absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 bg-white border border-brand-border text-xs text-brand-dark focus:outline-none focus:border-brand-gold rounded-sm placeholder:text-brand-grey font-inter"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-dark hover:bg-brand-gold text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 transition-colors duration-200 rounded-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-brand-grey font-light">
          We respect your privacy. Unsubscribe at any time.
        </p>

      </div>
    </section>
  );
}
