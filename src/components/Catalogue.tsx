import React, { useState, useMemo } from 'react';
import { Product, Category, BusinessSettings } from '../types';
import { getWhatsAppUrl, getProductEnquiryMessage, getPriceEnquiryMessage, formatIndianPhoneNumber } from '../utils/whatsapp';
import { Search, Filter, MessageCircle, Phone, ArrowUpRight, Sparkles, Layers, Info } from 'lucide-react';

interface CatalogueProps {
  products: Product[];
  categories: Category[];
  business: BusinessSettings;
  onSelectProduct: (product: Product) => void;
  onNavigateToCustom: () => void;
}

export const Catalogue: React.FC<CatalogueProps> = ({
  products,
  categories,
  business,
  onSelectProduct,
  onNavigateToCustom,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const primaryWhatsApp = business.whatsAppNumbers[0]?.number || '8292036802';
  const callPhone = business.phoneNumbers[0] || '8292036802';

  // Available subcategories for the selected category
  const activeSubcategories = useMemo(() => {
    if (selectedCategory === 'ALL') return [];
    const cat = categories.find(
      (c) => c.name.toLowerCase() === selectedCategory.toLowerCase() || c.slug === selectedCategory.toLowerCase()
    );
    return cat ? cat.subcategories : [];
  }, [selectedCategory, categories]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category match
      if (selectedCategory !== 'ALL') {
        const matchesCat =
          item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase();
        if (!matchesCat) return false;
      }

      // Subcategory match
      if (selectedSubcategory !== 'ALL') {
        if (!item.subcategory || item.subcategory.toLowerCase() !== selectedSubcategory.toLowerCase()) {
          return false;
        }
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = item.name.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inMaterial = item.material?.toLowerCase().includes(q);
        const inSub = item.subcategory?.toLowerCase().includes(q);
        if (!inName && !inDesc && !inMaterial && !inSub) return false;
      }

      return true;
    });
  }, [products, selectedCategory, selectedSubcategory, searchQuery]);

  return (
    <section id="catalogue" className="py-16 bg-[#fbf9f5] border-b border-[#e6ded3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#e8dfd3]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#25503d] bg-[#1c3b2d]/10 px-3 py-1 rounded-full border border-[#1c3b2d]/15">
              Showroom & Workshop Showcase
            </span>
            <h2 className="font-serif-craft text-2xl sm:text-3xl md:text-4xl font-bold text-[#14281e] mt-2">
              Furniture Catalogue
            </h2>
            <p className="text-sm sm:text-base text-[#615344] mt-1 max-w-xl">
              Har item aapki zaroorat, space aur budget ke hisaab se customized banaya ja sakta hai.
            </p>
          </div>

          {/* Custom Furniture Promo Pill */}
          <div className="bg-[#f4efe7] p-3.5 rounded-2xl border border-[#dfd3c4] flex items-center justify-between gap-4">
            <div className="text-xs">
              <span className="font-bold text-[#14281e] block">Apna Koi Naya Design Hai?</span>
              <span className="text-[#706456]">Photo ya drawing bhejkar quotation lijiye.</span>
            </div>
            <button
              onClick={onNavigateToCustom}
              className="px-3.5 py-2 rounded-xl bg-[#7b4624] hover:bg-[#5c341b] text-white text-xs font-semibold shrink-0 transition-colors"
            >
              Custom Order
            </button>
          </div>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="py-6 space-y-4">
          
          {/* Top row: Search input + Category Pills */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-[#786c5f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bed, sofa, wardrobe, dining, table..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#dfd3c4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1c3b2d]/30 text-[#26221f]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#706456] hover:text-black font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <button
                id="cat-tab-all"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedSubcategory('ALL');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'ALL'
                    ? 'bg-[#1c3b2d] text-white shadow-xs'
                    : 'bg-[#f4efe7] text-[#4a4036] hover:bg-[#ede5d8] border border-[#e2d7c9]'
                }`}
              >
                All Furniture ({products.length})
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`cat-tab-${cat.slug}`}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSelectedSubcategory('ALL');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? 'bg-[#1c3b2d] text-white shadow-xs'
                      : 'bg-[#f4efe7] text-[#4a4036] hover:bg-[#ede5d8] border border-[#e2d7c9]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Pills (if category selected) */}
          {activeSubcategories.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 pl-1">
              <span className="text-xs text-[#706456] font-medium mr-1 shrink-0">Sub-categories:</span>
              <button
                onClick={() => setSelectedSubcategory('ALL')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedSubcategory === 'ALL'
                    ? 'bg-[#7b4624] text-white'
                    : 'bg-[#ede5d8] text-[#524639] hover:bg-[#e2d7c9]'
                }`}
              >
                All in {selectedCategory}
              </button>
              {activeSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedSubcategory === sub
                      ? 'bg-[#7b4624] text-white'
                      : 'bg-[#ede5d8] text-[#524639] hover:bg-[#e2d7c9]'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Pricing Policy Banner (Mandatory Notice) */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-xl bg-[#f3ede3] border border-[#dfd2c0] flex items-start gap-2.5 text-xs text-[#524639]">
          <Info className="w-4 h-4 text-[#7b4624] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold text-[#14281e]">Important Note: </span>
            Furniture ki final price size, design, material, finishing aur requirement ke according change ho sakti hai. Price ke liye WhatsApp par baat karke requirement discuss karein aur quotation/price decide karein.
          </p>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#f4efe7] rounded-2xl border border-dashed border-[#d8cdbd] p-8">
            <Layers className="w-12 h-12 text-[#a39482] mx-auto mb-3" />
            <h3 className="font-serif-craft text-lg font-bold text-[#14281e]">Koi Furniture Nahi Mila</h3>
            <p className="text-sm text-[#706456] mt-1 max-w-md mx-auto">
              Aapke search ya filter ke hisaab se koi product match nahi hua. Humse WhatsApp par custom requirement discuss karein!
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedSubcategory('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-white rounded-xl text-xs font-semibold text-[#14281e] border border-[#dfd3c4]"
              >
                Reset Filters
              </button>
              <button
                onClick={onNavigateToCustom}
                className="px-4 py-2 bg-[#1c3b2d] rounded-xl text-xs font-semibold text-white"
              >
                Custom Order Karein
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const hasExplicitPrice = Boolean(
                (product.priceType === 'fixed' && product.price) ||
                  (product.priceType === 'starting_from' && product.startingPrice)
              );

              const enquiryMsg = hasExplicitPrice
                ? getProductEnquiryMessage(product.name)
                : getPriceEnquiryMessage(product.name);

              const whatsappLink = getWhatsAppUrl(primaryWhatsApp, enquiryMsg);

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-[#dfd3c4] shadow-2xs hover:shadow-md hover:border-[#1c3b2d]/30 transition-all flex flex-col group"
                >
                  {/* Image Container with click to view details */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-4/3 bg-[#ede4d7] overflow-hidden cursor-pointer select-none"
                  >
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-[#8c7e6c]">
                        <Layers className="w-8 h-8 mb-1" />
                        <span className="text-xs">Real photo jald upload ki jayegi</span>
                      </div>
                    )}

                    {/* Category pill */}
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#14281e]/85 text-[#f4efe7] px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {product.category}
                      </span>
                      {product.subcategory && (
                        <span className="text-[10px] font-medium bg-[#7b4624]/85 text-white px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                          {product.subcategory}
                        </span>
                      )}
                    </div>

                    {/* View Details Hover hint */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1">
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-serif-craft text-lg font-bold text-[#14281e] hover:text-[#25503d] transition-colors cursor-pointer leading-tight line-clamp-2"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#5c5043] line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Material & Size quick badges */}
                      {(product.material || product.dimensions) && (
                        <div className="pt-2 flex flex-col gap-1 text-[11px] text-[#706456]">
                          {product.material && (
                            <span className="truncate">
                              <strong className="text-[#3b3228]">Wood/Material:</strong> {product.material}
                            </span>
                          )}
                          {product.dimensions && (
                            <span className="truncate">
                              <strong className="text-[#3b3228]">Size:</strong> {product.dimensions}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Pricing Display */}
                    <div className="pt-3 border-t border-[#f0e8dc] flex items-center justify-between">
                      {product.priceType === 'fixed' && product.price ? (
                        <div>
                          <span className="text-[10px] text-[#786c5f] uppercase tracking-wider block font-semibold">
                            Fixed Price
                          </span>
                          <span className="text-lg font-bold text-[#14281e]">
                            ₹ {product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ) : product.priceType === 'starting_from' && product.startingPrice ? (
                        <div>
                          <span className="text-[10px] text-[#786c5f] uppercase tracking-wider block font-semibold">
                            Starting From
                          </span>
                          <span className="text-lg font-bold text-[#14281e]">
                            ₹ {product.startingPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-[10px] text-[#7b4624] font-semibold uppercase tracking-wider block">
                            Requirement Based
                          </span>
                          <span className="text-xs font-bold text-[#14281e]">
                            Price ke liye WhatsApp karein
                          </span>
                        </div>
                      )}

                      <button
                        onClick={() => onSelectProduct(product)}
                        className="text-xs font-semibold text-[#25503d] hover:text-[#14281e] flex items-center gap-0.5"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs font-semibold shadow-2xs transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#88ba9e]" />
                        <span>{hasExplicitPrice ? 'WhatsApp' : 'Price Poochhein'}</span>
                      </a>

                      <a
                        href={`tel:+91${callPhone}`}
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#f4efe7] hover:bg-[#ede5d8] text-[#332920] text-xs font-semibold border border-[#dfd3c4] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#7b4624]" />
                        <span>Call</span>
                      </a>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
