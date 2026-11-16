'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  KeyRound, 
  ShieldCheck, 
  CheckCircle2, 
  SlidersHorizontal,
  ArrowRight,
  ExternalLink 
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AccountPage() {
  const { 
    currentUser, 
    login, 
    register, 
    logout, 
    orders, 
    wishlist, 
    products, 
    updateUserProfile 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'settings'>('orders');

  // Auth form states
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  // Profile edit states
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [profileSaved, setProfileSaved] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(emailInput, passwordInput, false);
    setAuthSuccessMsg('Welcome back to Living Looms Atelier.');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(nameInput, emailInput, phoneInput);
    setAuthSuccessMsg('Your Living Looms patron account has been created.');
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name: profileName, phone: profilePhone });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  // Filter orders for current user
  const userOrders = orders.filter(
    o => o.customerEmail.toLowerCase() === (currentUser?.email || '').toLowerCase()
  );

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  // If user is not logged in, show luxury authentication form
  if (!currentUser) {
    return (
      <div className="bg-[#F8F5EF] min-h-screen py-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white p-8 sm:p-10 rounded-sm border border-brand-border shadow-sm space-y-6">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold block">
              Patron Portal
            </span>
            <h1 className="font-playfair text-2xl font-light text-brand-dark">
              {isLoginMode ? 'SIGN IN TO LIVING LOOMS' : 'CREATE PATRON ACCOUNT'}
            </h1>
            <p className="text-xs text-brand-grey font-light">
              Access your order history, tracked parcels, and saved silhouettes.
            </p>
          </div>

          {/* Toggle between Login and Register */}
          <div className="flex border-b border-brand-border text-xs uppercase tracking-wider font-semibold">
            <button
              onClick={() => setIsLoginMode(true)}
              className={`flex-1 pb-2.5 text-center border-b-2 transition-colors ${
                isLoginMode ? 'border-brand-gold text-brand-dark' : 'border-transparent text-brand-grey'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLoginMode(false)}
              className={`flex-1 pb-2.5 text-center border-b-2 transition-colors ${
                !isLoginMode ? 'border-brand-gold text-brand-dark' : 'border-transparent text-brand-grey'
              }`}
            >
              Create Account
            </button>
          </div>

          {authSuccessMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200">
              {authSuccessMsg}
            </div>
          )}

          {isLoginMode ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="patron@example.com"
                  className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <label className="uppercase tracking-wider text-brand-dark font-medium">Password</label>
                  <button type="button" className="text-[11px] text-brand-gold hover:underline">Forgot?</button>
                </div>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded-sm shadow-sm"
              >
                Sign In
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => login('aanya.sharma@example.com', '', false)}
                  className="text-xs text-brand-gold hover:underline font-medium"
                >
                  ⚡ One-Click Demo Patron Sign In
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Your Name"
                  className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="+91 98450 12345"
                  className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded-sm shadow-sm"
              >
                Create Account
              </button>
            </form>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Welcome Header */}
        <div className="bg-white p-6 sm:p-8 rounded-sm border border-brand-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#EFE8DE] flex items-center justify-center text-brand-gold font-playfair text-xl font-bold border border-brand-border">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold block">
                Living Looms Patron
              </span>
              <h1 className="font-playfair text-xl sm:text-2xl font-light text-brand-dark">
                Welcome back, {currentUser.name}
              </h1>
              <p className="text-xs text-brand-grey font-mono mt-0.5">
                {currentUser.email} • {currentUser.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider bg-brand-dark text-brand-gold rounded border border-brand-gold/40 hover:bg-brand-gold hover:text-brand-dark transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Admin CMS</span>
            </Link>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider border border-brand-border hover:border-red-600 hover:text-red-700 rounded transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-brand-border text-xs uppercase tracking-wider font-semibold space-x-8 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-colors flex-shrink-0 ${
              activeTab === 'orders' ? 'border-brand-gold text-brand-dark' : 'border-transparent text-brand-grey'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-colors flex-shrink-0 ${
              activeTab === 'addresses' ? 'border-brand-gold text-brand-dark' : 'border-transparent text-brand-grey'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-colors flex-shrink-0 ${
              activeTab === 'wishlist' ? 'border-brand-gold text-brand-dark' : 'border-transparent text-brand-grey'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Silhouettes ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-colors flex-shrink-0 ${
              activeTab === 'settings' ? 'border-brand-gold text-brand-dark' : 'border-transparent text-brand-grey'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account Settings</span>
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {/* TAB 1: Order History */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {userOrders.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-sm border border-brand-border space-y-4">
                  <Package className="w-12 h-12 text-brand-gold/60 mx-auto" />
                  <h3 className="font-playfair text-lg text-brand-dark">No orders placed yet</h3>
                  <p className="text-xs text-brand-grey max-w-sm mx-auto">
                    Once you place an order, its complete status, tracking number, and invoice will appear here.
                  </p>
                  <Link
                    href="/shop"
                    className="inline-block bg-brand-dark text-white px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-brand-gold transition-colors"
                  >
                    Explore Shop
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.map((ord) => (
                    <div 
                      key={ord.id}
                      className="bg-white p-6 rounded-sm border border-brand-border shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-brand-border gap-2">
                        <div>
                          <span className="font-mono text-xs font-semibold text-brand-dark">
                            {ord.orderNumber}
                          </span>
                          <span className="text-xs text-brand-grey ml-3">
                            {new Date(ord.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#EFE8DE] text-brand-dark uppercase tracking-wider">
                            {ord.orderStatus}
                          </span>
                          <span className="text-xs font-bold text-brand-dark font-playfair">
                            {formatPrice(ord.total)}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-neutral-100">
                        {ord.items.map((item, i) => (
                          <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-12 rounded bg-neutral-100 overflow-hidden flex-shrink-0">
                                <Image src={item.image} alt="" fill className="object-cover" />
                              </div>
                              <div>
                                <p className="font-medium text-brand-dark">{item.name}</p>
                                <p className="text-[11px] text-brand-grey">Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-mono font-medium">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 border-t border-brand-border flex items-center justify-between text-xs">
                        <Link
                          href={`/track-order?orderNumber=${ord.orderNumber}`}
                          className="text-brand-gold hover:underline font-semibold flex items-center gap-1"
                        >
                          <span>Track Live Delivery Progress</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          href={`/order-confirmation?orderNumber=${ord.orderNumber}`}
                          className="text-brand-grey hover:text-brand-dark"
                        >
                          View Receipt
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentUser.addresses.map((addr, idx) => (
                <div key={idx} className="bg-white p-6 rounded-sm border border-brand-border shadow-xs space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-semibold text-brand-gold">
                      Primary Delivery Address
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                      Default
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-brand-dark/80">
                    <p className="font-semibold text-brand-dark text-sm">{addr.fullName}</p>
                    <p>{addr.street}</p>
                    <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                    <p>{addr.country}</p>
                    <p className="text-brand-grey pt-1">Phone: {addr.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Wishlist */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-sm border border-brand-border">
                  <Heart className="w-10 h-10 text-brand-gold/60 mx-auto mb-2" />
                  <p className="text-xs text-brand-grey">Your wishlist is currently empty.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {wishlistProducts.map((p) => (
                    <Link 
                      key={p.id}
                      href={`/shop/${p.slug}`}
                      className="bg-white p-3 rounded border border-brand-border hover:border-brand-gold group"
                    >
                      <div className="relative aspect-[3/4] w-full rounded overflow-hidden mb-2 bg-[#EFE8DE]">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <h4 className="text-xs font-semibold text-brand-dark truncate font-playfair">{p.name}</h4>
                      <p className="text-xs font-bold text-brand-dark mt-1">{formatPrice(p.price)}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Account Settings */}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-brand-border shadow-xs max-w-xl space-y-6">
              <h3 className="font-playfair text-lg font-semibold uppercase tracking-wider text-brand-dark pb-2 border-b border-brand-border">
                Personal Information
              </h3>

              {profileSaved && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200">
                  Profile updated successfully.
                </div>
              )}

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Email Address (Immutable)</label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full text-xs p-2.5 bg-neutral-100 border border-brand-border rounded text-brand-grey cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Phone Number</label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brand-dark text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-brand-gold hover:text-brand-dark transition-colors rounded-sm"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
