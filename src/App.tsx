import React, { useState, useEffect, useCallback } from 'react';
import { api } from './api';
import {
  Product,
  Category,
  GalleryItem,
  VideoItem,
  CustomerReview,
  BusinessSettings,
} from './types';

// Public Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BusinessIntro } from './components/BusinessIntro';
import { Catalogue } from './components/Catalogue';
import { ProductModal } from './components/ProductModal';
import { CustomFurniture } from './components/CustomFurniture';
import { Materials } from './components/Materials';
import { GallerySection } from './components/GallerySection';
import { VideoSection } from './components/VideoSection';
import { ReviewsSection } from './components/ReviewsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutUs } from './components/AboutUs';
import { LocationMaps } from './components/LocationMaps';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Admin Pages
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<'public' | 'admin-login' | 'admin-dashboard'>('public');
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('majdur_admin_token'));
  
  // Data States
  const [business, setBusiness] = useState<BusinessSettings | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  
  // UI States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch all live data
  const loadAllData = useCallback(async () => {
    try {
      const [b, p, c, g, v, r] = await Promise.all([
        api.getSettings(),
        api.getProducts(),
        api.getCategories(),
        api.getGallery(),
        api.getVideos(),
        api.getReviews(),
      ]);
      setBusiness(b);
      setProducts(p);
      setCategories(c);
      setGallery(g);
      setVideos(v);
      setReviews(r);
    } catch (err) {
      console.error('Error fetching website data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Handle Admin Login Success
  const handleLoginSuccess = (token: string) => {
    setAdminToken(token);
    localStorage.setItem('majdur_admin_token', token);
    setCurrentView('admin-dashboard');
  };

  // Handle Admin Logout
  const handleLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('majdur_admin_token');
    setCurrentView('public');
  };

  // Open Admin View with auto-login check
  const handleOpenAdmin = () => {
    if (adminToken) {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('admin-login');
    }
  };

  const handleScrollToSection = (id: string) => {
    if (currentView !== 'public') {
      setCurrentView('public');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Loading Screen with artisan theme
  if (loading || !business) {
    return (
      <div className="min-h-screen bg-[#f4efe7] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#1c3b2d] flex items-center justify-center text-white font-serif-craft font-bold text-2xl shadow-md animate-pulse">
          M
        </div>
        <h2 className="font-serif-craft text-xl font-bold text-[#14281e] mt-4">
          Majdur Furniture Works
        </h2>
        <p className="text-xs text-[#706456] mt-1">
          Janpul, Motihari • Workshop & Catalogue load ho raha hai...
        </p>
      </div>
    );
  }

  // Admin Login View
  if (currentView === 'admin-login') {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToWebsite={() => setCurrentView('public')}
      />
    );
  }

  // Admin Dashboard View
  if (currentView === 'admin-dashboard' && adminToken) {
    return (
      <AdminDashboard
        token={adminToken}
        products={products}
        categories={categories}
        gallery={gallery}
        videos={videos}
        reviews={reviews}
        business={business}
        onRefreshData={loadAllData}
        onLogout={handleLogout}
        onBackToWebsite={() => setCurrentView('public')}
      />
    );
  }

  // Public Showroom & Workshop Website View
  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#26221f] flex flex-col selection:bg-[#1c3b2d]/20 selection:text-[#14281e]">
      
      {/* Primary Header & Navigation */}
      <Header
        business={business}
        onAdminClick={handleOpenAdmin}
        isAdminLoggedIn={Boolean(adminToken)}
        onNavigate={handleScrollToSection}
      />

      {/* Hero Section with WhatsApp priority contact */}
      <Hero
        business={business}
        onBrowseClick={() => handleScrollToSection('catalogue')}
      />

      {/* Authentic Introduction */}
      <BusinessIntro business={business} />

      {/* Furniture Catalogue (Bedroom, Living, Dining, Study/Office, Custom) */}
      <Catalogue
        products={products.filter((p) => p.published !== false)}
        categories={categories}
        business={business}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
        onNavigateToCustom={() => handleScrollToSection('custom-furniture')}
      />

      {/* Dedicated Custom Furniture Section */}
      <CustomFurniture business={business} />

      {/* Material & Wood Selection Guidance */}
      <Materials business={business} />

      {/* Real Photo Gallery with Lightbox */}
      <GallerySection
        gallery={gallery.filter((g) => g.published !== false)}
        business={business}
        onOpenAdminUpload={handleOpenAdmin}
        isAdminLoggedIn={Boolean(adminToken)}
      />

      {/* Videos / Work Process */}
      <VideoSection
        videos={videos.filter((v) => v.published !== false)}
        business={business}
      />

      {/* Customer Reviews (Genuine only, zero fake reviews) */}
      <ReviewsSection
        reviews={reviews.filter((r) => r.published !== false)}
        business={business}
      />

      {/* Why Choose Us (Supported facts only) */}
      <WhyChooseUs business={business} />

      {/* About Us (20+ years history, humble and genuine) */}
      <AboutUs business={business} />

      {/* Workshop Location & Interactive Google Maps */}
      <LocationMaps business={business} />

      {/* Contact Section with phone numbers, WhatsApp priority, address */}
      <ContactSection business={business} />

      {/* Footer with copyright and admin portal link */}
      <Footer
        business={business}
        onAdminClick={handleOpenAdmin}
      />

      {/* Permanent Floating WhatsApp Quick Drawer */}
      <FloatingWhatsApp business={business} />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          business={business}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </div>
  );
}
