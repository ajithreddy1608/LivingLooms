'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { Instagram, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const { settings } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-brand-dark text-[#F8F5EF] pt-16 pb-10 border-t border-[#4a3930]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#523f36]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <div className="relative h-12 md:h-14 w-48 md:w-56">
                <Image
                  src="/images/living-looms-logo-light.png"
                  alt="Living Looms by Manisha Reddy"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            
            <p className="text-sm text-[#F8F5EF]/75 leading-relaxed max-w-sm font-light">
              Transforming traditional Indian handloom heritage into timeless contemporary fashion. Each garment celebrates artisanal weavers, pure natural fibers, and modern grace.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <a 
                href={settings.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all"
                title="Follow Living Looms on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={`https://wa.me/${settings.whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 rounded-full border border-brand-gold/40 text-xs tracking-wider uppercase text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all flex items-center gap-2"
              >
                <span>WhatsApp Atelier</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">
              The Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F8F5EF]/75">
              <li>
                <Link href="/shop?category=handloom-sarees" className="hover:text-brand-gold transition-colors">
                  Handloom Sarees
                </Link>
              </li>
              <li>
                <Link href="/shop?category=kurtas-sets" className="hover:text-brand-gold transition-colors">
                  Curated Kurtas & Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=festive-collection" className="hover:text-brand-gold transition-colors">
                  Festive Silhouettes
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ethnic-wear" className="hover:text-brand-gold transition-colors">
                  Ethnic Coordinates
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-brand-gold transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-brand-gold transition-colors">
                  All Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">
              Boutique Concierge
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F8F5EF]/75">
              <li>
                <Link href="/track-order" className="hover:text-brand-gold transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-brand-gold transition-colors">
                  Customer Account
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-brand-gold transition-colors">
                  Our Story & Craft
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-brand-gold transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/return-and-refund-policy" className="hover:text-brand-gold transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-brand-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">
              Connect With Us
            </h4>
            
            <div className="space-y-3 text-xs text-[#F8F5EF]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>{settings.contactAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>{settings.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>{settings.contactEmail}</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest text-brand-gold font-medium mb-2">
                Newsletter
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-brand-gold bg-brand-gold/10 p-2.5 rounded border border-brand-gold/30">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Welcome to Living Looms journal.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="bg-[#2a1d17] border border-[#5a463c] text-xs px-3 py-2 text-[#F8F5EF] focus:outline-none focus:border-brand-gold w-full placeholder:text-neutral-500 rounded-l"
                  />
                  <button
                    type="submit"
                    className="bg-brand-gold text-brand-dark px-3 py-2 text-xs font-semibold hover:bg-brand-gold-light transition-colors rounded-r flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Lower Bar: Copyright & Agency Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#F8F5EF]/60 gap-4">
          <div>
            © {new Date().getFullYear()} LIVING LOOMS by MANISHA REDDY. All Rights Reserved.
          </div>

          <div className="flex items-center gap-2 text-center md:text-right">
            <span className="text-brand-gold font-medium">PROJECT BY CAVORA DIGITAL</span>
            <span className="text-brand-grey">|</span>
            <span className="italic tracking-wider text-[#F8F5EF]/80 font-serif">YOUR VISION. OUR EXECUTION.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
