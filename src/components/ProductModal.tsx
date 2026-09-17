import React, { useState } from 'react';
import { Product, BusinessSettings } from '../types';
import { getWhatsAppUrl, getProductEnquiryMessage, getPriceEnquiryMessage, formatIndianPhoneNumber } from '../utils/whatsapp';
import { MessageCircle, Phone, X, Sparkles, Layers, Maximize2, Video, CheckCircle, Info } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  business: BusinessSettings;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, business, onClose }) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const primaryWhatsApp = business.whatsAppNumbers[0]?.number || '8292036802';

  const enquiryMessage = product.price || product.startingPrice
    ? getProductEnquiryMessage(product.name)
    : getPriceEnquiryMessage(product.name);

  const whatsappLink = getWhatsAppUrl(primaryWhatsApp, enquiryMessage);
  const callNumber = business.phoneNumbers[0] || '8292036802';

  // Render price badge
  const renderPrice = () => {
    if (product.priceType === 'fixed' && product.price) {
      return (
        <div>
          <span className="text-xs text-[#706456] block uppercase tracking-wider font-semibold">Fixed Price</span>
          <span className="text-2xl font-bold text-[#14281e]">₹ {product.price.toLocaleString('en-IN')}</span>
        </div>
      );
    }
    if (product.priceType === 'starting_from' && product.startingPrice) {
      return (
        <div>
          <span className="text-xs text-[#706456] block uppercase tracking-wider font-semibold">Starting From</span>
          <span className="text-2xl font-bold text-[#14281e]">₹ {product.startingPrice.toLocaleString('en-IN')}</span>
        </div>
      );
    }
    return (
      <div className="bg-[#ede4d5] px-3.5 py-2 rounded-xl border border-[#ded1c0]">
        <span className="text-xs text-[#635547] block font-medium">Price On Discussion:</span>
        <span className="text-sm font-bold text-[#14281e]">Price ke liye WhatsApp karein</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6 overflow-y-auto backdrop-blur-xs">
      <div className="bg-[#fbf9f5] rounded-2xl max-w-3xl w-full border border-[#dfd3c4] shadow-2xl relative my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/90 text-[#4a4036] hover:bg-white hover:text-black shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Media & Thumbnails */}
          <div className="bg-[#ece3d5] p-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#ded3c2]">
            <div className="space-y-3">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#ded1bf] border border-[#d2c4b0]">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#706456]">
                    <Layers className="w-10 h-10 text-[#a39482] mb-2" />
                    <p className="text-xs font-semibold">Real photo jald update ki jayegi</p>
                    <p className="text-[11px] text-[#8c7e6c] mt-1">Admin panel se real photo upload karein</p>
                  </div>
                )}
              </div>

              {/* Thumbnails if multiple images */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === i ? 'border-[#1c3b2d] ring-2 ring-[#1c3b2d]/20' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Product Video Link if available */}
              {product.videoUrl && (
                <a
                  href={product.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/80 hover:bg-white text-xs font-semibold text-[#1c3b2d] border border-[#d6c9b6] transition-colors"
                >
                  <Video className="w-4 h-4 text-[#25503d]" />
                  <span>Is Product Ka Video Dekhein</span>
                </a>
              )}
            </div>

            {/* Quality Note */}
            <div className="mt-4 pt-3 border-t border-[#d8ccb8] text-[11px] text-[#6e6050] flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#25503d] shrink-0" />
              <span>Har order customer ki space & preference ke anusar banaya jata hai.</span>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Category & Subcategory Tag */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#1c3b2d]/10 text-[#14281e] px-2.5 py-0.5 rounded-md border border-[#1c3b2d]/15">
                  {product.category}
                </span>
                {product.subcategory && (
                  <span className="text-[11px] font-medium text-[#7b4624] bg-[#7b4624]/10 px-2 py-0.5 rounded-md">
                    {product.subcategory}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-serif-craft text-xl sm:text-2xl font-bold text-[#14281e] leading-snug">
                {product.name}
              </h3>

              {/* Price */}
              <div className="py-2 border-y border-[#e6ded3]">{renderPrice()}</div>

              {/* Description */}
              <p className="text-sm text-[#4d4236] leading-relaxed">
                {product.description}
              </p>

              {/* Specifications */}
              <div className="space-y-2 text-xs bg-[#f4efe7] p-3.5 rounded-xl border border-[#e4d9cc]">
                {product.material && (
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[#786c5f] font-medium">Material / Wood:</span>
                    <span className="text-[#14281e] font-semibold text-right">{product.material}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex items-start justify-between gap-2 pt-1.5 border-t border-[#e8dfd3]">
                    <span className="text-[#786c5f] font-medium">Size / Dimensions:</span>
                    <span className="text-[#14281e] font-semibold text-right">{product.dimensions}</span>
                  </div>
                )}
                {product.customizationInfo && (
                  <div className="flex items-start justify-between gap-2 pt-1.5 border-t border-[#e8dfd3]">
                    <span className="text-[#786c5f] font-medium">Customization:</span>
                    <span className="text-[#14281e] font-semibold text-right">{product.customizationInfo}</span>
                  </div>
                )}
              </div>

              {/* Pricing policy note */}
              <div className="p-3 bg-[#f3ede3] rounded-xl border border-[#dfd2c0] flex items-start gap-2 text-[11px] text-[#635547] leading-relaxed">
                <Info className="w-3.5 h-3.5 text-[#7b4624] shrink-0 mt-0.5" />
                <span>
                  Furniture ki final price size, design, material, finishing aur requirement ke according change ho sakti hai. Price ke liye WhatsApp par baat karke requirement discuss karein aur quotation/price decide karein.
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 border-t border-[#e6ded3] flex flex-col sm:flex-row gap-2.5">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white font-semibold text-sm shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#88ba9e]" />
                <span>
                  {product.price || product.startingPrice ? 'WhatsApp Enquiry' : 'WhatsApp Par Price Poochhein'}
                </span>
              </a>

              <a
                href={`tel:+91${callNumber}`}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-[#ede5d8] text-[#332920] font-semibold text-sm border border-[#d6c7b5] shadow-2xs transition-colors"
              >
                <Phone className="w-4 h-4 text-[#7b4624]" />
                <span>Call Now ({formatIndianPhoneNumber(callNumber)})</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
