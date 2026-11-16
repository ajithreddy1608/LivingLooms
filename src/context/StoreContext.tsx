'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Category, 
  Collection, 
  InstagramReel, 
  CartItem, 
  Order, 
  WebsiteSettings, 
  Testimonial, 
  Coupon,
  ShippingAddress 
} from '@/types';
import { 
  initialProducts, 
  initialCategories, 
  initialCollections, 
  initialInstagramReels, 
  initialSettings, 
  initialTestimonials, 
  initialCoupons 
} from '@/data/initialData';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: ShippingAddress[];
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Collections
  collections: Collection[];

  // Instagram Reels (Three Slots)
  instagramReels: InstagramReel[];
  addInstagramReel: (reel: Omit<InstagramReel, 'id'>) => void;
  updateInstagramReel: (id: string, reel: Partial<InstagramReel>) => void;
  deleteInstagramReel: (id: string) => void;
  uploadReelCover: (id: string, file: File) => Promise<string>;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingCharge: number;
  discountAmount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (
    id: string, 
    status: Order['orderStatus'], 
    paymentStatus?: Order['paymentStatus'], 
    trackingNumber?: string,
    courierPartner?: string
  ) => void;
  getOrderById: (id: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;

  // Settings
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;

  // UI state
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // User Auth
  currentUser: CustomerUser | null;
  login: (email: string, password?: string, asAdmin?: boolean) => boolean;
  register: (name: string, email: string, phone: string, password?: string) => boolean;
  logout: () => void;
  updateUserProfile: (data: Partial<CustomerUser>) => void;
  testimonials: Testimonial[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // States initialized with fresh Living Looms assets
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [instagramReels, setInstagramReels] = useState<InstagramReel[]>(initialInstagramReels);
  const [settings, setSettings] = useState<WebsiteSettings>(initialSettings);
  const [testimonials] = useState<Testimonial[]>(initialTestimonials);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // UI State
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Auth State
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>({
    id: 'cust-demo-1',
    name: 'Aanya Sharma',
    email: 'aanya.sharma@example.com',
    phone: '+91 98765 43210',
    role: 'customer',
    addresses: [
      {
        fullName: 'Aanya Sharma',
        email: 'aanya.sharma@example.com',
        phone: '+91 98765 43210',
        street: 'Penthouse 14B, Palm Grove Residencies',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500034',
        country: 'India',
      }
    ]
  });

  // Load from LocalStorage & purge any old unsplash caches
  useEffect(() => {
    setMounted(true);
    try {
      const storedProducts = localStorage.getItem('livinglooms_products_v2');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        localStorage.setItem('livinglooms_products_v2', JSON.stringify(initialProducts));
      }

      const storedCategories = localStorage.getItem('livinglooms_categories_v2');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      } else {
        localStorage.setItem('livinglooms_categories_v2', JSON.stringify(initialCategories));
      }

      const storedReels = localStorage.getItem('livinglooms_reels_v2');
      if (storedReels) {
        setInstagramReels(JSON.parse(storedReels));
      } else {
        localStorage.setItem('livinglooms_reels_v2', JSON.stringify(initialInstagramReels));
      }

      const storedSettings = localStorage.getItem('livinglooms_settings_v3');
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      } else {
        localStorage.setItem('livinglooms_settings_v3', JSON.stringify(initialSettings));
      }

      const storedCart = localStorage.getItem('livinglooms_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem('livinglooms_wishlist');
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

      const storedOrders = localStorage.getItem('livinglooms_orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        const demoOrders: Order[] = [
          {
            id: 'ord-1001',
            orderNumber: 'LL-2026-8941',
            customerName: 'Aanya Sharma',
            customerEmail: 'aanya.sharma@example.com',
            customerPhone: '+91 98765 43210',
            shippingAddress: {
              fullName: 'Aanya Sharma',
              email: 'aanya.sharma@example.com',
              phone: '+91 98765 43210',
              street: 'Penthouse 14B, Palm Grove Residencies',
              city: 'Hyderabad',
              state: 'Telangana',
              pincode: '500034',
              country: 'India',
            },
            items: [
              {
                productId: 'prod-1',
                name: 'Varanasi Ivory Embroidered Tissue Saree',
                price: 26500,
                quantity: 1,
                size: 'Free Size (6.3m)',
                color: 'Ivory Pearl',
                image: '/images/products/living-looms-ivory-tissue-saree-1.jpg',
              }
            ],
            subtotal: 26500,
            shipping: 0,
            discount: 2650,
            total: 23850,
            couponCode: 'WELCOME10',
            paymentMethod: 'razorpay',
            paymentStatus: 'Paid',
            orderStatus: 'Shipped',
            trackingNumber: 'BLUEDART-89230149',
            courierPartner: 'BlueDart Express',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          }
        ];
        setOrders(demoOrders);
        localStorage.setItem('livinglooms_orders', JSON.stringify(demoOrders));
      }

      const storedUser = localStorage.getItem('livinglooms_user');
      if (storedUser) setCurrentUser(JSON.parse(storedUser));
    } catch (e) {
      console.error('LocalStorage hydration error:', e);
    }
  }, []);

  // Sync state to LocalStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('livinglooms_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('livinglooms_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('livinglooms_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('livinglooms_products_v2', JSON.stringify(products));
    } catch (e) {}
  }, [products, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('livinglooms_categories_v2', JSON.stringify(categories));
    } catch (e) {}
  }, [categories, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('livinglooms_reels_v2', JSON.stringify(instagramReels));
    } catch (e) {}
  }, [instagramReels, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('livinglooms_settings_v3', JSON.stringify(settings));
    } catch (e) {}
  }, [settings, mounted]);

  // Product Actions
  const addProduct = (prodData: Omit<Product, 'id'>): Product => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = { ...prodData, id };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProductBySlug = (slug: string) => {
    return products.find(p => p.slug === slug);
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  // Category Actions
  const addCategory = (catData: Omit<Category, 'id'>) => {
    const id = `cat-${Date.now()}`;
    setCategories(prev => [...prev, { ...catData, id }]);
  };

  const updateCategory = (id: string, catData: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...catData } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Instagram Reel Actions (Three Slots)
  const addInstagramReel = (reelData: Omit<InstagramReel, 'id'>) => {
    const id = `reel-${Date.now()}`;
    setInstagramReels(prev => [...prev, { ...reelData, id }]);
  };

  const updateInstagramReel = (id: string, reelData: Partial<InstagramReel>) => {
    setInstagramReels(prev => prev.map(reel => reel.id === id ? { ...reel, ...reelData } : reel));
  };

  const deleteInstagramReel = (id: string) => {
    setInstagramReels(prev => prev.filter(reel => reel.id !== id));
  };

  const uploadReelCover = async (id: string, file: File): Promise<string> => {
    return new Promise((resolve) => {
      // If Supabase Storage is configured:
      if (isSupabaseConfigured) {
        const fileExt = file.name.split('.').pop();
        const fileName = `reel-${id}-${Date.now()}.${fileExt}`;
        supabase.storage
          .from('instagram-reels')
          .upload(fileName, file)
          .then(({ data, error }) => {
            if (!error && data) {
              const { data: publicUrlData } = supabase.storage.from('instagram-reels').getPublicUrl(fileName);
              const url = publicUrlData.publicUrl;
              updateInstagramReel(id, { coverImage: url });
              resolve(url);
              return;
            }
            // Fallback to FileReader Base64
            readAsDataURL(id, file, resolve);
          })
          .catch(() => readAsDataURL(id, file, resolve));
      } else {
        readAsDataURL(id, file, resolve);
      }
    });
  };

  const readAsDataURL = (id: string, file: File, resolve: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      updateInstagramReel(id, { coverImage: dataUrl });
      resolve(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Cart Actions
  const addToCart = (product: Product, size?: string, color?: string, quantity: number = 1) => {
    const selectedSize = size || (product.sizes.length > 0 ? product.sizes[0] : 'Standard');
    const selectedColor = color || (product.colors.length > 0 ? product.colors[0].name : 'Default');

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.size === selectedSize && item.color === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            product,
            size: selectedSize,
            color: selectedColor,
            quantity,
            price: product.price,
          }
        ];
      }
    });

    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart(prev => prev.filter(
      item => !(item.productId === productId && item.size === size && item.color === color)
    ));
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.productId === productId && item.size === size && item.color === color) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingCharge = cartSubtotal > 0 ? 0 : 0; // Complimentary express shipping across India

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discountAmount = appliedCoupon.discountAmount;
    }
  }
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingCharge);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = initialCoupons.find(c => c.code === trimmed);

    if (!found) {
      return { success: false, message: 'Invalid promo code. Please check and try again.' };
    }

    if (cartSubtotal < found.minSpend) {
      return { 
        success: false, 
        message: `This coupon requires a minimum cart value of ₹${found.minSpend.toLocaleString('en-IN')}.` 
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Promo code ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Wishlist Actions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const wishlistCount = wishlist.length;

  // Order Actions
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const id = `ord-${Date.now()}`;
    const orderNumber = `LL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      createdAt: new Date().toISOString(),
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    id: string, 
    status: Order['orderStatus'], 
    paymentStatus?: Order['paymentStatus'], 
    trackingNumber?: string,
    courierPartner?: string
  ) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        return {
          ...order,
          orderStatus: status,
          ...(paymentStatus ? { paymentStatus } : {}),
          ...(trackingNumber ? { trackingNumber } : {}),
          ...(courierPartner ? { courierPartner } : {}),
        };
      }
      return order;
    }));
  };

  const getOrderById = (id: string) => {
    return orders.find(o => o.id === id);
  };

  const getOrderByNumber = (orderNumber: string) => {
    return orders.find(o => o.orderNumber.toLowerCase() === orderNumber.toLowerCase().trim());
  };

  // Settings Action
  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Auth Actions
  const login = (email: string, _password?: string, asAdmin = false): boolean => {
    const user: CustomerUser = {
      id: asAdmin ? 'admin-1' : `cust-${Date.now()}`,
      name: asAdmin ? 'Living Looms Administrator' : (email.split('@')[0] || 'Customer'),
      email,
      phone: '+91 77339 94844',
      role: asAdmin ? 'admin' : 'customer',
      addresses: [
        {
          fullName: asAdmin ? 'Admin Concierge' : 'Customer',
          email,
          phone: '+91 77339 94844',
          street: '42 Heritage Boulevard',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500034',
          country: 'India',
        }
      ]
    };
    setCurrentUser(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('livinglooms_user', JSON.stringify(user));
    }
    return true;
  };

  const register = (name: string, email: string, phone: string): boolean => {
    const user: CustomerUser = {
      id: `cust-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      addresses: []
    };
    setCurrentUser(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('livinglooms_user', JSON.stringify(user));
    }
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('livinglooms_user');
    }
  };

  const updateUserProfile = (data: Partial<CustomerUser>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('livinglooms_user', JSON.stringify(updated));
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        getProductById,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        collections,
        instagramReels,
        addInstagramReel,
        updateInstagramReel,
        deleteInstagramReel,
        uploadReelCover,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingCharge,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getOrderByNumber,
        settings,
        updateSettings,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        currentUser,
        login,
        register,
        logout,
        updateUserProfile,
        testimonials,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
