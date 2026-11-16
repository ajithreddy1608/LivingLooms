'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  CreditCard, 
  Banknote, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const router = useRouter();
  const { 
    cart, 
    cartSubtotal, 
    discountAmount, 
    cartTotal, 
    appliedCoupon, 
    createOrder,
    currentUser,
    settings 
  } = useStore();

  // Form State
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || 'Aanya Sharma',
    email: currentUser?.email || 'aanya.sharma@example.com',
    phone: currentUser?.phone || '+91 98765 43210',
    street: currentUser?.addresses[0]?.street || 'Penthouse 14B, Palm Grove Residencies',
    city: currentUser?.addresses[0]?.city || 'Hyderabad',
    state: currentUser?.addresses[0]?.state || 'Telangana',
    pincode: currentUser?.addresses[0]?.pincode || '500034',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (cart.length === 0) {
    return (
      <div className="bg-[#F8F5EF] min-h-screen py-20 flex items-center justify-center">
        <div className="bg-white p-8 max-w-md text-center rounded-sm border border-brand-border space-y-4">
          <h2 className="font-playfair text-xl text-brand-dark">Your bag is empty</h2>
          <p className="text-xs text-brand-grey">Please select your preferred handcrafted pieces before checking out.</p>
          <Link
            href="/shop"
            className="inline-block bg-brand-dark text-white px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-brand-gold transition-colors"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInitiateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.street || !formData.pincode) {
      setErrorMsg('Please complete all mandatory shipping details.');
      return;
    }
    setErrorMsg('');

    if (paymentMethod === 'razorpay') {
      setShowRazorpayModal(true);
    } else {
      processOrderSuccess('cod', 'Pending');
    }
  };

  const processOrderSuccess = (method: 'razorpay' | 'cod', paymentStatus: 'Paid' | 'Pending') => {
    setIsProcessing(true);
    setShowRazorpayModal(false);

    setTimeout(() => {
      const orderItems = cart.map(item => ({
        productId: item.productId,
        name: item.product.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: item.product.images[0],
      }));

      const newOrder = createOrder({
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData,
        items: orderItems,
        subtotal: cartSubtotal,
        shipping: 0,
        discount: discountAmount,
        total: cartTotal,
        couponCode: appliedCoupon?.code,
        paymentMethod: method,
        paymentStatus: paymentStatus,
        orderStatus: 'Placed',
        trackingNumber: `LL-TRACK-${Math.floor(100000 + Math.random() * 900000)}`,
        courierPartner: 'BlueDart Express Air',
      });

      // Celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setIsProcessing(false);
      router.push(`/order-confirmation?orderNumber=${newOrder.orderNumber}`);
    }, 1200);
  };

  return (
    <div className="bg-[#F8F5EF] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Security Header */}
        <div className="border-b border-brand-border/60 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-grey font-medium mb-1">
              <Link href="/cart" className="hover:text-brand-dark">Shopping Bag</Link>
              <span>/</span>
              <span className="text-brand-gold">Secure Checkout</span>
            </div>
            <h1 className="font-playfair text-2xl sm:text-3xl font-light text-brand-dark">
              FINALISE YOUR HEIRLOOM ACQUISITION
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-brand-dark bg-white px-3.5 py-1.5 rounded border border-brand-border shadow-2xs self-start">
            <Lock className="w-3.5 h-3.5 text-brand-gold" />
            <span>256-bit SSL Encrypted Transaction</span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-700 rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleInitiateOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Shipping Address & Payment Selection (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Contact & Shipping Address Form */}
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-brand-border shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-brand-border pb-3">
                <h3 className="font-playfair text-base sm:text-lg font-semibold uppercase tracking-wider text-brand-dark flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-dark text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
                  <span>Shipping Address</span>
                </h3>
                <span className="text-[11px] text-brand-grey font-light">Domestic Express Delivery</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Phone Number (SMS / WhatsApp Updates) *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Address Line / Apartment / Landmark *</label>
                  <input
                    type="text"
                    required
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">City *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">State *</label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">PIN Code *</label>
                  <input
                    type="text"
                    required
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Country</label>
                  <input
                    type="text"
                    disabled
                    value={formData.country}
                    className="w-full text-xs p-2.5 bg-neutral-100 border border-brand-border rounded text-brand-grey cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-brand-border shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-brand-border pb-3">
                <h3 className="font-playfair text-base sm:text-lg font-semibold uppercase tracking-wider text-brand-dark flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-dark text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
                  <span>Payment Method</span>
                </h3>
                <span className="text-[11px] text-brand-grey font-light">Razorpay Ready</span>
              </div>

              <div className="space-y-3">
                {/* Razorpay Online */}
                <label className={`block p-4 rounded border transition-all cursor-pointer ${
                  paymentMethod === 'razorpay' ? 'border-brand-dark bg-[#F8F5EF]/80 shadow-xs' : 'border-brand-border bg-white hover:bg-neutral-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="accent-brand-dark mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs sm:text-sm text-brand-dark uppercase tracking-wider">
                          Razorpay Secure Online Gateway
                        </span>
                        <span className="text-[10px] bg-brand-gold/15 text-brand-dark font-semibold px-2 py-0.5 rounded border border-brand-gold/30">
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs text-brand-grey font-light mt-1">
                        Instant confirmation via UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and NetBanking.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className={`block p-4 rounded border transition-all cursor-pointer ${
                  paymentMethod === 'cod' ? 'border-brand-dark bg-[#F8F5EF]/80 shadow-xs' : 'border-brand-border bg-white hover:bg-neutral-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-brand-dark mt-1"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-xs sm:text-sm text-brand-dark uppercase tracking-wider">
                        Cash on Delivery (Atelier Verification)
                      </span>
                      <p className="text-xs text-brand-grey font-light mt-1">
                        Pay via cash or UPI upon delivery. Our concierge will verify your phone order before dispatch.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-brand-border shadow-sm space-y-6">
              
              <h3 className="font-playfair text-lg font-semibold uppercase tracking-wider text-brand-dark pb-3 border-b border-brand-border">
                Order Review ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>

              {/* Items List Preview */}
              <div className="divide-y divide-brand-border/60 max-h-64 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="py-3 flex gap-3 items-center">
                    <div className="relative w-14 h-18 bg-neutral-100 flex-shrink-0 rounded overflow-hidden border border-brand-border">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-brand-dark truncate font-playfair">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-brand-grey">
                        Qty: {item.quantity} • Size: {item.size}
                      </div>
                      <span className="text-xs font-semibold text-brand-dark font-mono">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2.5 pt-4 border-t border-brand-border text-xs">
                <div className="flex justify-between text-brand-dark/80">
                  <span>Subtotal</span>
                  <span className="font-medium font-mono text-brand-dark">{formatPrice(cartSubtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Privilege Coupon ({appliedCoupon.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-brand-dark/80">
                  <span>Insured Shipping Across India</span>
                  <span className="text-brand-gold font-semibold uppercase tracking-wider">Free</span>
                </div>

                <div className="pt-3 border-t border-brand-border flex justify-between items-baseline text-brand-dark">
                  <span className="text-sm font-semibold uppercase tracking-wider">Total Payable</span>
                  <span className="font-playfair text-2xl font-bold">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white py-4 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-sm shadow-md flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Processing Secure Acquisition...</span>
                  ) : (
                    <>
                      <span>{paymentMethod === 'razorpay' ? 'PAY & PLACE ORDER' : 'CONFIRM COD ORDER'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 pt-2 text-[10px] text-brand-grey border-t border-neutral-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Living Looms guarantees 100% genuine tested handlooms.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>BlueDart / Delhivery insured dispatch with real-time SMS tracking.</span>
                </div>
              </div>

            </div>

          </div>

        </form>

      </div>

      {/* Razorpay Realistic Gateway Interface Simulation Modal */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden border border-neutral-200">
            
            {/* Gateway Brand Header */}
            <div className="bg-[#0c2340] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white text-[#0c2340] font-playfair font-bold flex items-center justify-center text-sm shadow">
                  LL
                </div>
                <div>
                  <h4 className="font-semibold text-sm tracking-wide">Living Looms Atelier</h4>
                  <p className="text-[10px] text-neutral-300">Merchant Key: {settings.razorpayKeyId}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-neutral-300 block uppercase">Amount to Pay</span>
                <span className="text-lg font-bold font-mono">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Test Mode Notification Banner */}
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-[11px] text-amber-800 flex items-center justify-between">
              <span className="font-semibold">⚡ Razorpay Simulation Mode Active</span>
              <span className="text-[10px]">Test Environment</span>
            </div>

            {/* Simulated Payment Options */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-neutral-600">
                Select test payment option to simulate seamless authorization:
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => processOrderSuccess('razorpay', 'Paid')}
                  className="w-full p-3 rounded border border-neutral-200 hover:border-emerald-600 hover:bg-emerald-50/50 flex items-center justify-between text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      UPI
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-neutral-800 block">UPI / QR Code</span>
                      <span className="text-[10px] text-neutral-500">Google Pay, PhonePe, Paytm, BHIM</span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button
                  type="button"
                  onClick={() => processOrderSuccess('razorpay', 'Paid')}
                  className="w-full p-3 rounded border border-neutral-200 hover:border-blue-600 hover:bg-blue-50/50 flex items-center justify-between text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-neutral-800 block">Credit & Debit Cards</span>
                      <span className="text-[10px] text-neutral-500">Visa, Mastercard, RuPay, Amex</span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button
                  type="button"
                  onClick={() => processOrderSuccess('razorpay', 'Paid')}
                  className="w-full p-3 rounded border border-neutral-200 hover:border-indigo-600 hover:bg-indigo-50/50 flex items-center justify-between text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      NB
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-neutral-800 block">NetBanking</span>
                      <span className="text-[10px] text-neutral-500">HDFC, ICICI, SBI, Axis, Kotak</span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowRazorpayModal(false)}
                  className="text-xs text-neutral-500 hover:text-neutral-800"
                >
                  Cancel and return
                </button>
                <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                  <Lock className="w-3 h-3" />
                  <span>Secured by Razorpay</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
