export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  fabric: string;
  care: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  category: string;
  collection?: string;
  badge?: 'New Arrival' | 'Bestseller' | 'Handloom Heritage' | 'Festive Special' | 'Limited Edition';
  stock: number;
  featured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  itemCount?: number;
  order: number;
  featured: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  image: string;
  banner?: string;
  description: string;
  productCount?: number;
}

export interface InstagramReel {
  id: string;
  title: string;
  url: string;
  coverImage?: string;
  order: number;
  isActive: boolean;
  caption?: string;
}

// Kept for backward compatibility
export interface InstagramItem {
  id: string;
  type: 'reel' | 'post';
  url: string;
  embedUrl?: string;
  previewUrl: string;
  caption: string;
  tag?: string;
  order: number;
  featured: boolean;
  views?: string;
  likes?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode?: string;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  orderStatus: 'Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  courierPartner?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  review: string;
  rating: number;
  productPurchased: string;
  date: string;
  verified: boolean;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend: number;
  description: string;
}

export interface WebsiteSettings {
  announcementText: string;
  announcementActive: boolean;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroButtonText: string;
  heroButtonLink: string;
  brandStoryTitle: string;
  brandStoryText: string;
  brandStoryImage: string;
  campaignTitle: string;
  campaignSubtitle: string;
  campaignImage: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  instagramUrl: string;
  whatsappNumber: string;
  razorpayKeyId: string;
  razorpayEnabled: boolean;
  currency: string;
}
