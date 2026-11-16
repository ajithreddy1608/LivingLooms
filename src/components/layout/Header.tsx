'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { 
    cartCount, 
    wishlistCount, 
    setIsCartDrawerOpen, 
    setIsSearchOpen,
    currentUser 
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/collections' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Our Story', href: '/our-story' },
    { name: 'The World of LL', href: '/#world-of-living-looms' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F8F5EF]/95 backdrop-blur-md shadow-sm border-b border-brand-border py-2.5' 
          : 'bg-[#F8F5EF] border-b border-brand-border/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu Button & Search */}
          <div className="flex items-center gap-3 lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-brand-dark hover:text-brand-gold transition-colors focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-brand-dark hover:text-brand-gold transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Logo (Official Brand Logo: Livinglooms by MANISHA REDDY) */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <Link href="/" className="inline-flex items-center group py-0.5">
              <div className="relative h-11 sm:h-12 md:h-14 w-40 sm:w-48 md:w-56">
                <Image
                  src="/images/living-looms-logo.png"
                  alt="Living Looms by Manisha Reddy"
                  fill
                  priority
                  className="object-contain object-center lg:object-left group-hover:opacity-85 transition-opacity"
                />
              </div>
            </Link>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] tracking-[0.1em] uppercase font-medium transition-all duration-200 relative py-1 ${
                    isActive 
                      ? 'text-brand-gold font-semibold' 
                      : 'text-brand-dark/90 hover:text-brand-gold'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-gold transition-all" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-1.5 p-1.5 text-brand-dark hover:text-brand-gold transition-colors"
              title="Search catalogue"
            >
              <Search className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider hidden xl:inline text-brand-grey">Search</span>
            </button>

            {/* Admin Dashboard Quick Access Badge */}
            <Link 
              href="/admin" 
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 text-[10px] tracking-wider uppercase bg-brand-dark text-brand-gold rounded border border-brand-gold/40 hover:bg-brand-gold hover:text-brand-dark transition-all"
              title="Enter Admin CMS"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Admin CMS</span>
            </Link>

            {/* Account */}
            <Link 
              href="/account"
              className="p-1.5 text-brand-dark hover:text-brand-gold transition-colors relative"
              title={currentUser ? `Account: ${currentUser.name}` : 'Login / Register'}
            >
              <User className="w-5 h-5" />
              {currentUser?.role === 'admin' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-gold rounded-full" />
              )}
            </Link>

            {/* Wishlist */}
            <Link 
              href="/wishlist" 
              className="p-1.5 text-brand-dark hover:text-brand-gold transition-colors relative"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button */}
            <button 
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-1.5 text-brand-dark hover:text-brand-gold transition-colors relative flex items-center"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-1.5 bg-brand-dark text-brand-gold text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-brand-gold">
                  {cartCount}
                </span>
              ) : (
                <span className="text-[11px] font-medium ml-1.5 text-brand-dark hidden sm:inline">
                  (0)
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#F8F5EF] shadow-2xl z-50 flex flex-col justify-between overflow-y-auto">
            <div className="p-6">
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-brand-border">
                <div className="relative h-11 w-44">
                  <Image
                    src="/images/living-looms-logo.png"
                    alt="Living Looms by Manisha Reddy"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-brand-dark hover:text-brand-gold"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation items */}
              <nav className="mt-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-sm uppercase tracking-widest text-brand-dark hover:text-brand-gold py-2 border-b border-brand-border/40 font-medium transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-gold opacity-60" />
                  </Link>
                ))}
                
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs uppercase tracking-widest text-brand-gold bg-brand-dark p-3 rounded font-medium mt-4 border border-brand-gold/30"
                >
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Admin Management CMS
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-widest text-brand-grey hover:text-brand-dark py-2"
                >
                  Track Your Order
                </Link>
              </nav>
            </div>

            {/* Bottom info */}
            <div className="p-6 bg-[#EFE8DE] border-t border-brand-border text-xs text-brand-dark/80 space-y-2">
              <p className="font-serif italic">Bespoke Concierge & WhatsApp Inquiries:</p>
              <p className="font-semibold text-brand-dark">+91 77339 94844</p>
              <p className="text-[11px] text-brand-grey">Client demonstration developed by Cavora Digital</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
