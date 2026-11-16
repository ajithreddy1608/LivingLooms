import HeroCampaign from '@/components/home/HeroCampaign';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import NewArrivals from '@/components/home/NewArrivals';
import EditorialBanner from '@/components/home/EditorialBanner';
import BestsellingProducts from '@/components/home/BestsellingProducts';
import BrandStory from '@/components/home/BrandStory';
import FeaturedCampaign from '@/components/home/FeaturedCampaign';
import InstagramSection from '@/components/home/InstagramSection';
import TrustFeatures from '@/components/home/TrustFeatures';
import CustomerTestimonials from '@/components/home/CustomerTestimonials';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Campaign */}
      <HeroCampaign />

      {/* 2. Trust Badges */}
      <TrustFeatures />

      {/* 3. Featured Collections */}
      <FeaturedCollections />

      {/* 4. New Arrivals */}
      <NewArrivals />

      {/* 5. Editorial Fashion Banner */}
      <EditorialBanner />

      {/* 6. Bestselling Products */}
      <BestsellingProducts />

      {/* 7. Brand Story */}
      <BrandStory />

      {/* 8. Featured Campaign */}
      <FeaturedCampaign />

      {/* 9. Instagram Reels & Photo Gallery: "THE WORLD OF LIVING LOOMS" */}
      <InstagramSection />

      {/* 10. Customer Testimonials */}
      <CustomerTestimonials />

      {/* 11. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
}
