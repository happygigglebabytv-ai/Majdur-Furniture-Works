import React, { useState, useMemo } from 'react';
import { GalleryItem, BusinessSettings } from '../types';
import { Camera, Image as ImageIcon, X, ZoomIn, Sparkles, Filter } from 'lucide-react';

interface GallerySectionProps {
  gallery: GalleryItem[];
  business: BusinessSettings;
  onOpenAdminUpload?: () => void;
  isAdminLoggedIn?: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  gallery,
  business,
  onOpenAdminUpload,
  isAdminLoggedIn,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const groups = ['ALL', 'SHOP', 'FURNITURE', 'WORK PROCESS'];

  const filteredGallery = useMemo(() => {
    if (selectedGroup === 'ALL') return gallery;
    return gallery.filter((item) => item.group === selectedGroup);
  }, [gallery, selectedGroup]);

  return (
    <section id="gallery" className="py-16 bg-[#f5efe7] border-b border-[#ded3c2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#dfd3c4]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1c3b2d] bg-[#1c3b2d]/10 px-3 py-1 rounded-full border border-[#1c3b2d]/15">
              Original Workshop & Showroom
            </span>
            <h2 className="font-serif-craft text-2xl sm:text-3xl md:text-4xl font-bold text-[#14281e] mt-2">
              Photo Gallery
            </h2>
            <p className="text-sm sm:text-base text-[#615344] mt-1">
              Workshop ke asli kaam, karigari aur tayyar furniture ki tasveerein.
            </p>
          </div>

          {/* Group Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {groups.map((group) => (
              <button
                key={group}
                id={`gallery-filter-${group.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedGroup(group)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedGroup === group
                    ? 'bg-[#1c3b2d] text-white shadow-xs'
                    : 'bg-white/80 text-[#4a4036] hover:bg-white border border-[#dfd3c4]'
                }`}
              >
                {group === 'ALL' ? 'All Photos' : group}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Content */}
        <div className="mt-8">
          {filteredGallery.length === 0 ? (
            /* Professional Authentic Empty State */
            <div className="bg-white/80 rounded-2xl border border-dashed border-[#d8cdbd] p-10 text-center max-w-xl mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#ede4d5] text-[#706456] flex items-center justify-center mx-auto">
                <Camera className="w-7 h-7 text-[#7b4624]" />
              </div>
              <h3 className="font-serif-craft text-lg font-bold text-[#14281e]">
                Real Workshop Photos
              </h3>
              <p className="text-sm text-[#615344] leading-relaxed">
                {business.placeholders?.galleryText ||
                  'Real workshop aur furniture photos yahan admin ke dwara add ki jayengi.'}
              </p>
              <p className="text-xs text-[#8c7e6c]">
                Hum internet se uthayi gayi nakli photos ko real bata kar upload nahi karte. Workshop ki original tasveerein owner dwara update ki jayengi.
              </p>

              {isAdminLoggedIn && onOpenAdminUpload && (
                <div className="pt-2">
                  <button
                    onClick={onOpenAdminUpload}
                    className="px-4 py-2 rounded-xl bg-[#1c3b2d] text-white text-xs font-semibold hover:bg-[#14281e]"
                  >
                    Admin: Real Photo Upload Karein
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Grid of Real Photos */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxItem(item)}
                  className="bg-white rounded-2xl overflow-hidden border border-[#dfd3c4] shadow-2xs hover:shadow-md cursor-pointer group transition-all"
                >
                  <div className="relative aspect-4/3 bg-[#ece2d4] overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2 rounded-full bg-white/90 text-[#14281e]">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#14281e]/80 text-[#f4efe7] px-2 py-0.5 rounded backdrop-blur-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5">
                    <h4 className="text-sm font-bold text-[#14281e] truncate">{item.title}</h4>
                    {item.description && (
                      <p className="text-xs text-[#706456] mt-0.5 line-clamp-1">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs">
          <div className="relative max-w-4xl w-full bg-[#14281e] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] flex items-center justify-center bg-black">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="max-h-[75vh] max-w-full object-contain"
              />
            </div>

            <div className="p-4 bg-[#14281e] text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-[#88ba9e] font-semibold uppercase tracking-wider">
                  {activeLightboxItem.group} • {activeLightboxItem.category}
                </span>
                <h3 className="font-serif-craft text-lg font-bold">{activeLightboxItem.title}</h3>
                {activeLightboxItem.description && (
                  <p className="text-xs text-[#ded3c5] mt-0.5">{activeLightboxItem.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
