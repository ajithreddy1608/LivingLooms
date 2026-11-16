'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Product, Category, InstagramReel, Order } from '@/types';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Layers, 
  Instagram, 
  Home as HomeIcon, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Search, 
  DollarSign, 
  ExternalLink,
  Save,
  Upload,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboardPage() {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    categories,
    addCategory,
    deleteCategory,
    instagramReels,
    addInstagramReel,
    updateInstagramReel,
    deleteInstagramReel,
    uploadReelCover,
    orders,
    updateOrderStatus,
    settings,
    updateSettings 
  } = useStore();

  const [activeSection, setActiveSection] = useState<
    'overview' | 'products' | 'orders' | 'categories' | 'reels' | 'homepage' | 'customers' | 'settings'
  >('overview');

  // Search in tabs
  const [productSearch, setProductSearch] = useState('');

  // Modals
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [newReelModal, setNewReelModal] = useState(false);
  const [newCategoryModal, setNewCategoryModal] = useState(false);

  // New Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    price: 24000,
    originalPrice: 28000,
    discount: 14,
    description: '',
    fabric: '',
    sizes: 'Free Size (6.3m)',
    colors: 'Ivory Pearl:#F8F5EF, Antique Gold:#D4AF37',
    images: '/images/products/living-looms-ivory-tissue-saree-1.jpg',
    category: 'handloom-sarees',
    badge: 'New Arrival',
    stock: 10,
    featured: true,
    isNew: true,
    isBestseller: false,
  });

  // Reel Form State
  const [reelForm, setReelForm] = useState({
    title: '',
    url: '',
    coverImage: '',
    order: 1,
    isActive: true,
  });

  const [uploadFeedback, setUploadFeedback] = useState<{ [key: string]: string }>({});

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...settings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Calculations for Overview
  const totalSales = orders.reduce((acc, o) => acc + (o.paymentStatus === 'Paid' ? o.total : 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.orderStatus === 'Placed' || o.orderStatus === 'Processing').length;
  const totalProducts = products.length;

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const sizesArray = productForm.sizes.split(',').map(s => s.trim()).filter(Boolean);
    const colorsArray = productForm.colors.split(',').map(pair => {
      const [name, hex] = pair.split(':');
      return { name: (name || 'Natural').trim(), hex: (hex || '#B59A68').trim() };
    });
    const imagesArray = productForm.images.split('\n').map(u => u.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productForm.name,
        slug: productForm.slug || productForm.name.toLowerCase().replace(/\s+/g, '-'),
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        discount: Number(productForm.discount),
        description: productForm.description,
        fabric: productForm.fabric,
        sizes: sizesArray,
        colors: colorsArray,
        images: imagesArray.length > 0 ? imagesArray : [editingProduct.images[0]],
        category: productForm.category,
        badge: productForm.badge as any,
        stock: Number(productForm.stock),
        featured: productForm.featured,
        isNew: productForm.isNew,
        isBestseller: productForm.isBestseller,
      });
      setEditingProduct(null);
    } else {
      addProduct({
        name: productForm.name,
        slug: productForm.slug || productForm.name.toLowerCase().replace(/\s+/g, '-'),
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        discount: Number(productForm.discount),
        description: productForm.description,
        fabric: productForm.fabric,
        care: ['Dry Clean Only', 'Store wrapped in pure cotton', 'Steam iron with care'],
        sizes: sizesArray,
        colors: colorsArray,
        images: imagesArray.length > 0 ? imagesArray : ['/images/products/living-looms-ivory-tissue-saree-1.jpg'],
        category: productForm.category,
        badge: productForm.badge as any,
        stock: Number(productForm.stock),
        featured: productForm.featured,
        isNew: productForm.isNew,
        isBestseller: productForm.isBestseller,
        rating: 5.0,
        reviewCount: 1,
      });
      setIsAddProductOpen(false);
    }
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      slug: prod.slug,
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price,
      discount: prod.discount || 0,
      description: prod.description,
      fabric: prod.fabric,
      sizes: prod.sizes.join(', '),
      colors: prod.colors.map(c => `${c.name}:${c.hex}`).join(', '),
      images: prod.images.join('\n'),
      category: prod.category,
      badge: prod.badge || 'New Arrival',
      stock: prod.stock,
      featured: Boolean(prod.featured),
      isNew: Boolean(prod.isNew),
      isBestseller: Boolean(prod.isBestseller),
    });
  };

  const handleFileUpload = async (reelId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadReelCover(reelId, file);
      setUploadFeedback(prev => ({ ...prev, [reelId]: 'Cover photo uploaded and saved!' }));
      setTimeout(() => {
        setUploadFeedback(prev => {
          const next = { ...prev };
          delete next[reelId];
          return next;
        });
      }, 3500);
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="bg-[#1f1612] text-[#F8F5EF] min-h-screen flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#2b1f1a] border-r border-[#403028] flex-shrink-0 p-6 space-y-8">
        <div>
          <Link href="/" className="block">
            <div className="relative h-11 w-44 mb-1">
              <Image
                src="/images/living-looms-logo-light.png"
                alt="Living Looms by Manisha Reddy"
                fill
                className="object-contain object-left"
              />
            </div>
            <span className="text-[9px] tracking-[0.25em] text-brand-gold uppercase block">
              ATELIER MANAGEMENT CMS
            </span>
          </Link>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] bg-brand-gold/20 text-brand-gold border border-brand-gold/40">
            <span>● Official Client Console</span>
          </div>
        </div>

        <nav className="space-y-1.5 text-xs uppercase tracking-wider font-medium">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'products', label: 'Products (12)', icon: ShoppingBag, count: products.length },
            { id: 'reels', label: 'Instagram Reels', icon: Instagram, count: instagramReels.length },
            { id: 'orders', label: 'Orders', icon: Package, count: orders.length },
            { id: 'categories', label: 'Categories', icon: Layers, count: categories.length },
            { id: 'homepage', label: 'Homepage Content', icon: HomeIcon },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'settings', label: 'Store Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-all text-left ${
                  active 
                    ? 'bg-brand-gold text-brand-dark font-bold shadow' 
                    : 'text-[#F8F5EF]/80 hover:bg-[#3b2b24] hover:text-brand-gold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    active ? 'bg-brand-dark text-brand-gold' : 'bg-black/30 text-white/70'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-[#403028] space-y-2 text-xs">
          <Link
            href="/"
            className="flex items-center gap-2 text-brand-gold hover:underline font-semibold"
          >
            <span>← Return to Boutique Front</span>
          </Link>
          <p className="text-[10px] text-neutral-400 font-serif italic">
            Developed by Cavora Digital
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#F8F5EF] text-brand-dark min-h-screen">
        
        {/* SECTION 1: OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <div>
                <h2 className="font-playfair text-2xl sm:text-3xl font-light text-brand-dark">
                  DASHBOARD OVERVIEW
                </h2>
                <p className="text-xs text-brand-grey mt-0.5">
                  Real-time sales, order progression, and inventory metrics for Living Looms.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsAddProductOpen(true);
                  setEditingProduct(null);
                }}
                className="bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-sm border border-brand-border shadow-xs space-y-2">
                <div className="flex items-center justify-between text-brand-grey text-xs uppercase tracking-wider">
                  <span>Total Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="font-playfair text-2xl font-bold text-brand-dark">
                  {formatPrice(totalSales)}
                </div>
                <p className="text-[11px] text-emerald-700 font-medium">
                  Verified acquisitions via Razorpay
                </p>
              </div>

              <div className="bg-white p-6 rounded-sm border border-brand-border shadow-xs space-y-2">
                <div className="flex items-center justify-between text-brand-grey text-xs uppercase tracking-wider">
                  <span>Total Orders</span>
                  <Package className="w-4 h-4 text-brand-gold" />
                </div>
                <div className="font-playfair text-2xl font-bold text-brand-dark">
                  {totalOrders}
                </div>
                <p className="text-[11px] text-brand-grey">
                  {pendingOrders} awaiting dispatch
                </p>
              </div>

              <div className="bg-white p-6 rounded-sm border border-brand-border shadow-xs space-y-2">
                <div className="flex items-center justify-between text-brand-grey text-xs uppercase tracking-wider">
                  <span>Living Looms Products</span>
                  <ShoppingBag className="w-4 h-4 text-brand-gold" />
                </div>
                <div className="font-playfair text-2xl font-bold text-brand-dark">
                  {totalProducts}
                </div>
                <p className="text-[11px] text-brand-grey">
                  12 authentic catalogue silhouettes
                </p>
              </div>

              <div className="bg-white p-6 rounded-sm border border-brand-border shadow-xs space-y-2">
                <div className="flex items-center justify-between text-brand-grey text-xs uppercase tracking-wider">
                  <span>Instagram Reel Slots</span>
                  <Instagram className="w-4 h-4 text-purple-600" />
                </div>
                <div className="font-playfair text-2xl font-bold text-brand-dark">
                  3 Slots
                </div>
                <p className="text-[11px] text-brand-gold font-medium">
                  Dedicated cover photo upload slots
                </p>
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="bg-white p-6 rounded-sm border border-brand-border shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                <h3 className="font-playfair text-lg font-semibold uppercase tracking-wider text-brand-dark">
                  Recent Atelier Orders
                </h3>
                <button
                  onClick={() => setActiveSection('orders')}
                  className="text-xs uppercase tracking-wider text-brand-gold hover:underline font-semibold"
                >
                  View All Orders →
                </button>
              </div>

              <div className="divide-y divide-brand-border">
                {orders.slice(0, 5).map((ord) => (
                  <div key={ord.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-mono font-bold text-brand-dark">{ord.orderNumber}</span>
                      <span className="text-brand-grey ml-3">{ord.customerName} ({ord.customerEmail})</span>
                      <p className="text-brand-dark/70 text-[11px] mt-0.5">
                        {ord.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-semibold text-brand-dark">{formatPrice(ord.total)}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EFE8DE] text-brand-dark uppercase">
                        {ord.orderStatus}
                      </span>
                      <button
                        onClick={() => setViewingOrder(ord)}
                        className="text-brand-gold hover:underline font-semibold"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: PRODUCTS */}
        {activeSection === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-border gap-4">
              <div>
                <h2 className="font-playfair text-2xl font-light text-brand-dark">
                  NEW LIVING LOOMS PRODUCT CATALOGUE (12 ITEMS)
                </h2>
                <p className="text-xs text-brand-grey">
                  Managing the authentic 12 Living Looms sample product catalogue. All stock images removed.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddProductOpen(true);
                }}
                className="bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Creation</span>
              </button>
            </div>

            {/* Filter Input */}
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-brand-grey absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter products by title or fabric..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-sm border border-brand-border overflow-x-auto shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFE8DE] text-brand-dark uppercase tracking-wider font-semibold border-b border-brand-border">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Badge</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {products
                    .filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()))
                    .map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#F8F5EF]/60 transition-colors">
                        <td className="p-3 flex items-center gap-3">
                          <div className="relative w-10 h-14 rounded bg-neutral-100 overflow-hidden flex-shrink-0 border border-brand-border">
                            <Image src={prod.images[0]} alt="" fill className="object-cover" />
                          </div>
                          <div>
                            <span className="font-playfair font-semibold text-brand-dark block truncate max-w-xs">{prod.name}</span>
                            <span className="text-[10px] text-brand-grey font-mono">/{prod.slug}</span>
                          </div>
                        </td>
                        <td className="p-3 capitalize">{prod.category.replace('-', ' ')}</td>
                        <td className="p-3 font-mono font-medium">{formatPrice(prod.price)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${prod.stock <= 5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                            {prod.stock} in atelier
                          </span>
                        </td>
                        <td className="p-3">
                          {prod.badge ? (
                            <span className="text-[10px] bg-brand-dark text-brand-gold px-2 py-0.5 rounded">
                              {prod.badge}
                            </span>
                          ) : '—'}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditProduct(prod)}
                            className="p-1 text-brand-dark hover:text-brand-gold"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1 text-brand-grey hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 3: INSTAGRAM REEL SLOTS MANAGEMENT */}
        {activeSection === 'reels' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-border gap-4">
              <div>
                <h2 className="font-playfair text-2xl font-light text-brand-dark">
                  INSTAGRAM REELS MANAGEMENT (3 SLOTS)
                </h2>
                <p className="text-xs text-brand-grey">
                  Upload cover photographs for each reel slot. Videos are not played or embedded. When clicked by patrons, the card opens the reel URL on Instagram.
                </p>
              </div>
            </div>

            {/* Three Reel Management Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {instagramReels.slice(0, 3).map((reel, idx) => (
                <div key={reel.id} className="bg-white rounded-sm border border-brand-border p-6 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-brand-border pb-2">
                      <span className="text-xs uppercase tracking-wider font-semibold text-brand-gold flex items-center gap-1.5">
                        <Instagram className="w-3.5 h-3.5" />
                        <span>Reel Slot 0{idx + 1}</span>
                      </span>
                      <label className="flex items-center gap-1.5 text-[11px] text-brand-grey cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reel.isActive}
                          onChange={(e) => updateInstagramReel(reel.id, { isActive: e.target.checked })}
                          className="accent-brand-dark"
                        />
                        <span>Active</span>
                      </label>
                    </div>

                    {/* Cover Photo Preview & Upload */}
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-wider font-medium text-brand-dark block">
                        Reel Cover Photograph
                      </span>

                      <div className="relative aspect-[4/5] rounded overflow-hidden bg-[#EFE8DE] border border-brand-border flex items-center justify-center">
                        {reel.coverImage ? (
                          <>
                            <Image src={reel.coverImage} alt={reel.title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors flex items-center justify-center">
                              <span className="text-[10px] text-white bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs">
                                Click below to replace
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="p-4 text-center space-y-2">
                            <ImageIcon className="w-8 h-8 text-brand-gold/60 mx-auto" />
                            <p className="text-xs text-brand-grey font-serif italic">
                              No cover uploaded yet.
                            </p>
                            <span className="text-[10px] text-brand-dark font-medium block">
                              (A clean branded Living Looms card is currently displayed to patrons)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* File Upload Button */}
                      <label className="w-full py-2.5 px-3 bg-[#F8F5EF] hover:bg-brand-gold/20 text-brand-dark border border-brand-border rounded text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors">
                        <Upload className="w-4 h-4 text-brand-gold" />
                        <span>Upload Reel Cover Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(reel.id, e)}
                        />
                      </label>

                      {uploadFeedback[reel.id] && (
                        <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded flex items-center gap-1.5 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{uploadFeedback[reel.id]}</span>
                        </div>
                      )}
                    </div>

                    {/* Reel Title */}
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Reel Title</label>
                      <input
                        type="text"
                        value={reel.title}
                        onChange={(e) => updateInstagramReel(reel.id, { title: e.target.value })}
                        className="w-full text-xs p-2 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    {/* Instagram URL */}
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Instagram URL</label>
                      <input
                        type="url"
                        value={reel.url}
                        onChange={(e) => updateInstagramReel(reel.id, { url: e.target.value })}
                        className="w-full text-xs p-2 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold font-mono text-[11px]"
                      />
                      <a
                        href={reel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-brand-gold hover:underline flex items-center gap-1 mt-1"
                      >
                        <span>Test Instagram Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Display Order */}
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Display Order</label>
                      <select
                        value={reel.order}
                        onChange={(e) => updateInstagramReel(reel.id, { order: Number(e.target.value) })}
                        className="w-full text-xs p-2 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none"
                      >
                        <option value={1}>Position 1 (Left)</option>
                        <option value={2}>Position 2 (Center)</option>
                        <option value={3}>Position 3 (Right)</option>
                      </select>
                    </div>

                  </div>

                  <div className="pt-3 border-t border-brand-border flex justify-between items-center text-xs">
                    {reel.coverImage && (
                      <button
                        type="button"
                        onClick={() => updateInstagramReel(reel.id, { coverImage: '' })}
                        className="text-[11px] text-red-600 hover:underline"
                      >
                        Remove Cover Image
                      </button>
                    )}
                    <span className="text-[10px] text-brand-grey ml-auto">Saved in Supabase & LocalStorage</span>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: ORDERS */}
        {activeSection === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <div>
                <h2 className="font-playfair text-2xl font-light text-brand-dark">
                  ORDER FULFILMENT & INVOICING
                </h2>
                <p className="text-xs text-brand-grey">
                  Track payments, update dispatch status, assign courier tracking numbers.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-brand-border overflow-x-auto shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFE8DE] text-brand-dark uppercase tracking-wider font-semibold border-b border-brand-border">
                  <tr>
                    <th className="p-3">Order #</th>
                    <th className="p-3">Patron</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Fulfilment Status</th>
                    <th className="p-3">Courier AWB</th>
                    <th className="p-3 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#F8F5EF]/60 transition-colors">
                      <td className="p-3 font-mono font-bold text-brand-dark">{ord.orderNumber}</td>
                      <td className="p-3">
                        <span className="font-medium text-brand-dark block">{ord.customerName}</span>
                        <span className="text-[10px] text-brand-grey">{ord.customerPhone}</span>
                      </td>
                      <td className="p-3 font-mono font-semibold">{formatPrice(ord.total)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          ord.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.paymentMethod}: {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-[#F8F5EF] border border-brand-border p-1 rounded text-xs uppercase tracking-wider font-semibold"
                        >
                          <option value="Placed">Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-brand-grey">
                        {ord.trackingNumber || 'Pending AWB'}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setViewingOrder(ord)}
                          className="text-xs uppercase tracking-wider font-semibold text-brand-gold hover:underline"
                        >
                          Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 5: CATEGORIES */}
        {activeSection === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <div>
                <h2 className="font-playfair text-2xl font-light text-brand-dark">
                  COLLECTION CATEGORIES
                </h2>
                <p className="text-xs text-brand-grey">
                  Create, reorder, and configure featured showcases for homepage cards.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-sm border border-brand-border overflow-hidden shadow-xs flex flex-col justify-between">
                  <div className="relative aspect-video w-full bg-neutral-200">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                    {cat.featured && (
                      <span className="absolute top-2 left-2 bg-brand-dark text-brand-gold text-[10px] uppercase font-semibold px-2 py-0.5 rounded">
                        Featured on Home
                      </span>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-playfair text-base font-semibold text-brand-dark">{cat.name}</h4>
                    <p className="text-xs text-brand-grey line-clamp-2">{cat.description}</p>
                    <div className="pt-2 flex items-center justify-between border-t border-neutral-100 text-xs text-brand-gold">
                      <span>Slug: /{cat.slug}</span>
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="text-brand-grey hover:text-red-700"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: HOMEPAGE CONTENT */}
        {activeSection === 'homepage' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <div>
                <h2 className="font-playfair text-2xl font-light text-brand-dark">
                  HOMEPAGE CONTENT EDITOR
                </h2>
                <p className="text-xs text-brand-grey">
                  Edit the announcement bar, hero campaign banners, brand story narrative, and promotional headlines.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-sm border border-brand-border shadow-xs space-y-6 max-w-3xl">
              
              {/* Announcement Bar */}
              <div className="space-y-2 border-b border-brand-border pb-6">
                <h3 className="font-playfair text-base font-semibold uppercase tracking-wider text-brand-dark">
                  1. Announcement Banner
                </h3>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Text</label>
                  <input
                    type="text"
                    value={settingsForm.announcementText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Hero Campaign */}
              <div className="space-y-3 border-b border-brand-border pb-6">
                <h3 className="font-playfair text-base font-semibold uppercase tracking-wider text-brand-dark">
                  2. Hero Campaign
                </h3>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Headline</label>
                  <textarea
                    rows={2}
                    value={settingsForm.heroTitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Subtitle</label>
                  <textarea
                    rows={2}
                    value={settingsForm.heroSubtitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Hero Image URL</label>
                  <input
                    type="text"
                    value={settingsForm.heroImage}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroImage: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
              </div>

              {/* Brand Story */}
              <div className="space-y-3 border-b border-brand-border pb-6">
                <h3 className="font-playfair text-base font-semibold uppercase tracking-wider text-brand-dark">
                  3. Brand Story
                </h3>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Story Headline</label>
                  <input
                    type="text"
                    value={settingsForm.brandStoryTitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, brandStoryTitle: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Narrative Text</label>
                  <textarea
                    rows={3}
                    value={settingsForm.brandStoryText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, brandStoryText: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {settingsSaved && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200">
                  Homepage updates applied successfully.
                </div>
              )}

              <button
                type="submit"
                className="bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded-sm shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Homepage Content</span>
              </button>
            </form>
          </div>
        )}

        {/* SECTION 7: CUSTOMERS */}
        {activeSection === 'customers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <div>
                <h2 className="font-playfair text-2xl font-light text-brand-dark">
                  PATRON DIRECTORY
                </h2>
                <p className="text-xs text-brand-grey">
                  View registered customer profiles, phone numbers, and past purchase counts.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-brand-border overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFE8DE] text-brand-dark uppercase tracking-wider font-semibold border-b border-brand-border">
                  <tr>
                    <th className="p-3">Patron Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Total Orders</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  <tr className="hover:bg-[#F8F5EF]/60">
                    <td className="p-3 font-semibold text-brand-dark">Aanya Sharma</td>
                    <td className="p-3 font-mono text-brand-grey">aanya.sharma@example.com</td>
                    <td className="p-3">+91 98765 43210</td>
                    <td className="p-3 font-bold text-brand-gold">1 Order (₹23,850)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 8: SETTINGS */}
        {activeSection === 'settings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <div>
                <h2 className="font-playfair text-2xl font-light text-brand-dark">
                  WEBSITE & PAYMENT GATEWAY SETTINGS
                </h2>
                <p className="text-xs text-brand-grey">
                  Configure Razorpay merchant keys, WhatsApp concierge, and atelier address.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-sm border border-brand-border shadow-xs space-y-6 max-w-2xl">
              <div className="space-y-4">
                <h3 className="font-playfair text-base font-semibold uppercase tracking-wider text-brand-dark border-b border-brand-border pb-2">
                  Atelier Contact & Social Links
                </h3>
                
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Concierge Email</label>
                  <input
                    type="email"
                    value={settingsForm.contactEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Concierge Phone</label>
                  <input
                    type="text"
                    value={settingsForm.contactPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">WhatsApp Number (e.g. 919845012345)</label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Instagram Profile URL</label>
                  <input
                    type="url"
                    value={settingsForm.instagramUrl}
                    onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-brand-border">
                <h3 className="font-playfair text-base font-semibold uppercase tracking-wider text-brand-dark border-b border-brand-border pb-2">
                  Razorpay Payment Gateway Integration
                </h3>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-dark font-medium">Razorpay Key ID</label>
                  <input
                    type="text"
                    value={settingsForm.razorpayKeyId}
                    onChange={(e) => setSettingsForm({ ...settingsForm, razorpayKeyId: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>
              </div>

              {settingsSaved && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200">
                  Settings persisted successfully.
                </div>
              )}

              <button
                type="submit"
                className="bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded-sm shadow-md"
              >
                Save All Settings
              </button>
            </form>
          </div>
        )}

      </main>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {(isAddProductOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto border border-brand-border space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <h3 className="font-playfair text-xl font-semibold text-brand-dark">
                {editingProduct ? 'Edit Silhouette Creation' : 'Add New Handcrafted Creation'}
              </h3>
              <button 
                onClick={() => {
                  setIsAddProductOpen(false);
                  setEditingProduct(null);
                }}
                className="p-1 text-brand-grey hover:text-brand-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-medium text-brand-dark uppercase tracking-wider">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-brand-dark uppercase tracking-wider">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-brand-dark uppercase tracking-wider">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-brand-dark uppercase tracking-wider">Original Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold font-mono"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-medium text-brand-dark uppercase tracking-wider">Fabric Specification *</label>
                  <input
                    type="text"
                    required
                    value={productForm.fabric}
                    onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                    placeholder="e.g. Pure Tissue Mulberry Silk with Antique Gold Zari"
                    className="w-full p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-medium text-brand-dark uppercase tracking-wider">Editorial Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold leading-relaxed"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-medium text-brand-dark uppercase tracking-wider">Product Image Path / URLs</label>
                  <textarea
                    rows={2}
                    value={productForm.images}
                    onChange={(e) => setProductForm({ ...productForm, images: e.target.value })}
                    className="w-full p-2.5 bg-[#F8F5EF] border border-brand-border rounded focus:outline-none focus:border-brand-gold font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddProductOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-5 py-2.5 border border-brand-border rounded uppercase tracking-wider font-semibold hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-dark text-white rounded uppercase tracking-wider font-semibold hover:bg-brand-gold hover:text-brand-dark transition-colors shadow"
                >
                  {editingProduct ? 'Save Updates' : 'Add to Catalogue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW INVOICE */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white w-full max-w-xl rounded-sm shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto border border-brand-border space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold block">Living Looms Tax Invoice</span>
                <h3 className="font-mono text-base font-bold text-brand-dark">Ref: {viewingOrder.orderNumber}</h3>
              </div>
              <button onClick={() => setViewingOrder(null)} className="p-1 text-brand-grey hover:text-brand-dark">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-4">
              <div className="grid grid-cols-2 gap-4 bg-[#F8F5EF] p-4 rounded border border-brand-border">
                <div>
                  <span className="font-semibold text-brand-dark block">Patron:</span>
                  <p>{viewingOrder.customerName}</p>
                  <p className="text-brand-grey">{viewingOrder.customerEmail}</p>
                  <p className="text-brand-grey">{viewingOrder.customerPhone}</p>
                </div>
                <div>
                  <span className="font-semibold text-brand-dark block">Deliver To:</span>
                  <p>{viewingOrder.shippingAddress.street}</p>
                  <p>{viewingOrder.shippingAddress.city}, {viewingOrder.shippingAddress.state} - {viewingOrder.shippingAddress.pincode}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold uppercase tracking-wider text-brand-dark mb-2">Creations Summary</h4>
                <div className="divide-y divide-neutral-100 border border-brand-border rounded p-2">
                  {viewingOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-medium text-brand-dark">{item.name}</p>
                        <p className="text-[10px] text-brand-grey">Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</p>
                      </div>
                      <span className="font-mono font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-right space-y-1 font-mono text-xs">
                <div>Subtotal: {formatPrice(viewingOrder.subtotal)}</div>
                {viewingOrder.discount > 0 && <div className="text-emerald-700">Privilege: -{formatPrice(viewingOrder.discount)}</div>}
                <div>Shipping: Free</div>
                <div className="text-sm font-bold text-brand-dark pt-1 border-t border-brand-border">Total: {formatPrice(viewingOrder.total)}</div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-brand-border">
                <span className="text-[11px] text-brand-grey">Courier: {viewingOrder.courierPartner} (AWB: {viewingOrder.trackingNumber})</span>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-brand-dark text-white rounded text-xs uppercase tracking-wider font-semibold hover:bg-brand-gold hover:text-brand-dark"
                >
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
