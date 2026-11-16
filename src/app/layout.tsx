import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import SearchModal from '@/components/layout/SearchModal';
import ProductQuickViewModal from '@/components/product/ProductQuickViewModal';

export const metadata: Metadata = {
  metadataBase: new URL('https://livinglooms.in'),
  title: 'Living Looms | Premium Handwoven Fashion & Ethnic Wear Atelier',
  description: 'Discover handcrafted Varanasi silk sarees, Chanderi sets, and modern ethnic coordinates from Living Looms. Handcrafted luxury woven with modern grace.',
  keywords: ['Living Looms', 'handloom sarees', 'ethnic wear', 'Chanderi silk', 'Banarasi saree', 'Indian boutique', 'luxury fashion', 'designer kurtas'],
  openGraph: {
    title: 'Living Looms | Premium Handwoven Fashion Atelier',
    description: 'Timeless style. Beautifully woven. Discover the world of Living Looms handcrafted collections.',
    url: 'https://livinglooms.in',
    siteName: 'Living Looms',
    images: [
      {
        url: '/images/products/living-looms-ivory-tissue-saree-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Living Looms Handwoven Atelier',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F8F5EF] text-brand-dark selection:bg-brand-gold selection:text-white">
        <StoreProvider>
          <AnnouncementBar />
          <Header />
          
          <main className="flex-grow">
            {children}
          </main>

          <Footer />

          {/* Interactive Drawers & Modals */}
          <CartDrawer />
          <SearchModal />
          <ProductQuickViewModal />
        </StoreProvider>
      </body>
    </html>
  );
}
