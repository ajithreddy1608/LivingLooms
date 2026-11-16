'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';

export default function ContactPage() {
  const { settings } = useStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bespoke Sizing / Bridal Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier Concierge</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-light text-brand-dark">
            CONNECT WITH LIVING LOOMS
          </h1>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
          <p className="text-sm md:text-base text-brand-dark/70 font-light">
            We welcome inquiries for bespoke blouse customization, bridal trousseau consultations, and styling guidance.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left: Contact Info & Atelier Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#EFE8DE] p-6 sm:p-8 rounded-sm border border-brand-border space-y-6">
              <h3 className="font-playfair text-xl font-medium text-brand-dark uppercase tracking-wider pb-2 border-b border-brand-border">
                Atelier Headquarters
              </h3>

              <div className="space-y-4 text-xs text-brand-dark/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-dark block text-xs uppercase tracking-wider">Atelier Address</span>
                    <p className="leading-relaxed mt-0.5">{settings.contactAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-dark block text-xs uppercase tracking-wider">Voice Concierge</span>
                    <p className="font-mono mt-0.5">{settings.contactPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-dark block text-xs uppercase tracking-wider">Direct Email</span>
                    <p className="font-mono mt-0.5">{settings.contactEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-dark block text-xs uppercase tracking-wider">Consultation Hours</span>
                    <p className="mt-0.5">Monday – Saturday: 10:30 AM – 7:30 PM IST</p>
                    <p className="text-brand-grey text-[11px]">Sunday: By Prior Appointment</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hello Living Looms Concierge, I would like to inquire about your handloom collections.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1e2a22] text-white py-3.5 px-4 text-xs uppercase tracking-widest font-semibold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 rounded-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Instant WhatsApp Atelier</span>
                </a>
              </div>
            </div>

            {/* Stylist Promise */}
            <div className="bg-white p-6 rounded-sm border border-brand-border text-xs text-brand-dark space-y-1">
              <span className="font-semibold uppercase tracking-wider text-brand-gold block">The Living Looms Promise</span>
              <p className="text-brand-grey font-light leading-relaxed">
                Our in-house design stylists will guide you through blouse measurements, border selection, and saree fall-pico finishing before dispatch.
              </p>
            </div>
          </div>

          {/* Right: Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-sm border border-brand-border shadow-xs">
            <h3 className="font-playfair text-2xl font-light text-brand-dark mb-6">
              Send an Atelier Inquiry
            </h3>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-sm border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-playfair text-xl text-emerald-900">Inquiry Received</h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to Living Looms. Our concierge will respond via email or WhatsApp within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs uppercase tracking-wider text-brand-dark underline font-medium pt-2 block mx-auto"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-medium uppercase tracking-wider text-brand-dark">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Radhika Sen"
                      className="w-full p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium uppercase tracking-wider text-brand-dark">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="radhika@example.com"
                      className="w-full p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-medium uppercase tracking-wider text-brand-dark">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium uppercase tracking-wider text-brand-dark">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                    >
                      <option value="Bespoke Sizing / Bridal Inquiry">Bespoke Sizing / Bridal Inquiry</option>
                      <option value="Product Saree Inquiries">Product Saree Inquiries</option>
                      <option value="Order Tracking Assistance">Order Tracking Assistance</option>
                      <option value="Press & Collaborative Inquiries">Press & Collaborative Inquiries</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-medium uppercase tracking-wider text-brand-dark">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about the occasion, custom blouse preferences, or delivery timeline..."
                    className="w-full p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brand-dark text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold hover:text-brand-dark transition-all rounded-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
