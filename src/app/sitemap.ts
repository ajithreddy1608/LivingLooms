import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://livinglooms.in';

  const staticRoutes = [
    '',
    '/shop',
    '/collections',
    '/new-arrivals',
    '/our-story',
    '/about',
    '/instagram-gallery',
    '/contact',
    '/cart',
    '/wishlist',
    '/track-order',
    '/privacy-policy',
    '/terms-and-conditions',
    '/shipping-policy',
    '/return-and-refund-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const productRoutes = [
    'varanasi-gold-tissue-zari-saree',
    'chandrakala-chanderi-kurta-set',
    'gulmohar-jamdani-silk-saree',
    'noor-organza-embroidered-anarkali',
    'kashmiri-aari-tussar-kurta-set',
    'meenakari-kanjivaram-bridal-saree',
    'sufiana-hand-block-chanderi-coord',
    'surya-kanti-banarasi-dupatta',
  ].map((slug) => ({
    url: `${baseUrl}/shop/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
