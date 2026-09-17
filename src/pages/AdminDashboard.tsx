import React, { useState } from 'react';
import { Product, Category, GalleryItem, VideoItem, CustomerReview, BusinessSettings } from '../types';
import { AdminProducts } from '../components/admin/AdminProducts';
import { AdminGallery } from '../components/admin/AdminGallery';
import { AdminVideos } from '../components/admin/AdminVideos';
import { AdminReviews } from '../components/admin/AdminReviews';
import { AdminSettings } from '../components/admin/AdminSettings';
import { AdminPassword } from '../components/admin/AdminPassword';
import { AdminLogo } from '../components/admin/AdminLogo';
import { BrandLogo } from '../components/BrandLogo';
import { Layers, Camera, Film, MessageSquareQuote, Settings, KeyRound, LogOut, ArrowLeft, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface AdminDashboardProps {
  token: string;
  products: Product[];
  categories: Category[];
  gallery: GalleryItem[];
  videos: VideoItem[];
  reviews: CustomerReview[];
  business: BusinessSettings;
  onRefreshData: () => void;
  onLogout: () => void;
  onBackToWebsite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  token,
  products,
  categories,
  gallery,
  videos,
  reviews,
  business,
  onRefreshData,
  onLogout,
  onBackToWebsite,
}) => {
  const [activeTab, setActiveTab] = useState<
    'products' | 'gallery' | 'videos' | 'reviews' | 'logo' | 'settings' | 'password'
  >('products');

  const navItems = [
    { id: 'products', label: 'Furniture Products', icon: <Layers className="w-4 h-4" />, count: products.length },
    { id: 'gallery', label: 'Real Photo Gallery', icon: <Camera className="w-4 h-4" />, count: gallery.length },
    { id: 'videos', label: 'Work Videos', icon: <Film className="w-4 h-4" />, count: videos.length },
    { id: 'reviews', label: 'Customer Reviews', icon: <MessageSquareQuote className="w-4 h-4" />, count: reviews.length },
    { id: 'logo', label: 'Website Logo', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'settings', label: 'Business Settings & Contacts', icon: <Settings className="w-4 h-4" /> },
    { id: 'password', label: 'Security & Credentials', icon: <KeyRound className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f4efe7] flex flex-col">
      
      {/* Top Navbar */}
      <header className="bg-[#14281e] text-white border-b border-[#25503d] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand */}
          <BrandLogo business={business} variant="admin" />

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onBackToWebsite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25503d]/60 hover:bg-[#25503d] text-[#e6dfd5] text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Website Dekhein</span>
            </button>

            <button
              id="admin-logout-btn"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation Scroll Bar */}
        <div className="bg-[#1c3b2d] px-4 sm:px-6 overflow-x-auto border-t border-[#25503d]">
          <div className="max-w-7xl mx-auto flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`admin-tab-${item.id}`}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
                  activeTab === item.id
                    ? 'border-[#88ba9e] text-white bg-[#14281e]/50'
                    : 'border-transparent text-[#b8ab9a] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {typeof item.count === 'number' && (
                  <span className="px-1.5 py-0.2 rounded-full bg-black/30 text-[10px] text-[#ded3c5]">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'products' && (
          <AdminProducts
            products={products}
            categories={categories}
            token={token}
            onRefresh={onRefreshData}
          />
        )}

        {activeTab === 'gallery' && (
          <AdminGallery gallery={gallery} token={token} onRefresh={onRefreshData} />
        )}

        {activeTab === 'videos' && (
          <AdminVideos videos={videos} token={token} onRefresh={onRefreshData} />
        )}

        {activeTab === 'reviews' && (
          <AdminReviews reviews={reviews} token={token} onRefresh={onRefreshData} />
        )}

        {activeTab === 'logo' && (
          <AdminLogo business={business} token={token} onRefresh={onRefreshData} />
        )}

        {activeTab === 'settings' && (
          <AdminSettings business={business} token={token} onRefresh={onRefreshData} />
        )}

        {activeTab === 'password' && <AdminPassword token={token} />}
      </main>

    </div>
  );
};
