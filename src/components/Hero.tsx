import React, { useState } from 'react';
import { BusinessSettings } from '../types';
import { getWhatsAppUrl, getGeneralEnquiryMessage, formatIndianPhoneNumber } from '../utils/whatsapp';
import { MessageCircle, ArrowRight, ShieldCheck, Hammer, MapPin, Phone, Users, CheckCircle2, X } from 'lucide-react';

interface HeroProps {
  business: BusinessSettings;
  onBrowseClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ business, onBrowseClick }) => {
  const [showWhatsAppSelector, setShowWhatsAppSelector] = useState(false);

  const primaryPhone = business.whatsAppNumbers[0]?.number || '8292036802';
  const defaultWhatsAppLink = getWhatsAppUrl(primaryPhone, getGeneralEnquiryMessage());

  return (
    <section id="home" className="relative bg-[#f5efe7] border-b border-[#e2d7c9] overflow-hidden">
      {/* Decorative Wood & Forest Warmth Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#25503d]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#7b4624]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c3b2d]/10 border border-[#1c3b2d]/20 text-[#14281e] text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#25503d] animate-pulse"></span>
              <span>20+ Saal Ka Bharosa • Janpul, Motihari</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-craft text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-[#14281e] leading-[1.18]">
              {business.slogan || 'Apni Zaroorat, Apna Design — Furniture Apne Andaaz Mein.'}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#524639] leading-relaxed max-w-2xl">
              {business.sloganSubtext ||
                '20+ saal ke anubhav ke saath Majdur Furniture Works mein aapki zaroorat, space, design aur budget ke according furniture tayyar kiya jata hai.'}
            </p>

            {/* Value Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white/80 p-3.5 rounded-xl border border-[#e4d9cc] shadow-2xs">
                <div className="flex items-center gap-1.5 text-[#1c3b2d] font-bold text-sm sm:text-base">
                  <ShieldCheck className="w-4 h-4 text-[#25503d]" />
                  <span>20+ Years</span>
                </div>
                <p className="text-xs text-[#706456] mt-0.5">Woodworking Exp.</p>
              </div>

              <div className="bg-white/80 p-3.5 rounded-xl border border-[#e4d9cc] shadow-2xs">
                <div className="flex items-center gap-1.5 text-[#5c341b] font-bold text-sm sm:text-base">
                  <Hammer className="w-4 h-4 text-[#7b4624]" />
                  <span>Custom Made</span>
                </div>
                <p className="text-xs text-[#706456] mt-0.5">Aapke Size Ke Hisaab Se</p>
              </div>

              <div className="bg-white/80 p-3.5 rounded-xl border border-[#e4d9cc] shadow-2xs">
                <div className="flex items-center gap-1.5 text-[#14281e] font-bold text-sm sm:text-base">
                  <MapPin className="w-4 h-4 text-[#1c3b2d]" />
                  <span>Motihari</span>
                </div>
                <p className="text-xs text-[#706456] mt-0.5">Janpul, East Champaran</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                id="hero-whatsapp-main-cta"
                onClick={() => setShowWhatsAppSelector(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all border border-[#25503d]"
              >
                <MessageCircle className="w-5 h-5 text-[#88ba9e]" />
                <span>WhatsApp Par Baat Karein</span>
              </button>

              <button
                id="hero-browse-catalogue-cta"
                onClick={onBrowseClick}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#ede5d8] text-[#332920] font-semibold text-sm sm:text-base border border-[#d6c7b5] shadow-2xs transition-colors"
              >
                <span>Furniture Dekhein</span>
                <ArrowRight className="w-4 h-4 text-[#7b4624]" />
              </button>
            </div>

            {/* Direct Calling Quick Hint */}
            <div className="flex items-center gap-2 text-xs text-[#635547] pt-1">
              <Phone className="w-3.5 h-3.5 text-[#7b4624]" />
              <span>Direct call bhi kar sakte hain:</span>
              <a href="tel:+918292036802" className="font-semibold text-[#1c3b2d] hover:underline">
                82920 36802
              </a>
              <span>/</span>
              <a href="tel:+918789414357" className="font-semibold text-[#1c3b2d] hover:underline">
                8789414357
              </a>
            </div>

          </div>

          {/* Right Visual Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-[#dfd3c4] shadow-sm p-4 sm:p-5">
              
              {/* Image Preview */}
              <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden bg-[#e8decb]">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&auto=format&fit=crop&q=80"
                  alt="Majdur Furniture Works Showroom & Workshop"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14281e]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#e6d0b5] bg-[#14281e]/80 px-2 py-0.5 rounded">
                    Workshop & Showroom
                  </span>
                  <p className="font-serif-craft text-base sm:text-lg font-bold mt-1">
                    Majdur Furniture Works
                  </p>
                  <p className="text-xs text-[#d8cfc4]">Janpul, Near Smart Bazaar, Motihari</p>
                </div>
              </div>

              {/* Owner Badge */}
              <div className="mt-4 pt-3 border-t border-[#ece2d6] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#1c3b2d]/10 flex items-center justify-center text-[#1c3b2d]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#14281e]">Munawar Hussain & Salahuddin Sahab</p>
                    <p className="text-[11px] text-[#706456]">Proprietors & Lead Craftsmen</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#25503d] font-bold bg-[#25503d]/10 px-2.5 py-1 rounded-full border border-[#25503d]/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Workshop</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* WhatsApp Selector Modal */}
      {showWhatsAppSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-[#fbf9f5] rounded-2xl max-w-md w-full p-6 border border-[#dfd3c4] shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowWhatsAppSelector(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#706456] hover:bg-[#ede5d8]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1c3b2d] flex items-center justify-center text-white">
                <MessageCircle className="w-5 h-5 text-[#88ba9e]" />
              </div>
              <div>
                <h3 className="font-serif-craft text-lg font-bold text-[#14281e]">WhatsApp Par Baat Karein</h3>
                <p className="text-xs text-[#706456]">Kis contact number par message bhejna chahte hain?</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {business.whatsAppNumbers.map((item, idx) => {
                const link = getWhatsAppUrl(item.number, getGeneralEnquiryMessage());
                const isProminent = idx < 2; // Prompt: "Make the first two WhatsApp contacts visually more prominent"

                return (
                  <a
                    key={item.number}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowWhatsAppSelector(false)}
                    className={`block p-3.5 rounded-xl border transition-all ${
                      isProminent
                        ? 'bg-white border-[#25503d]/40 shadow-xs hover:border-[#1c3b2d] hover:bg-[#f4f8f5]'
                        : 'bg-white/60 border-[#dfd3c4] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className={`w-4 h-4 ${isProminent ? 'text-[#25503d]' : 'text-[#706456]'}`} />
                        <span className="font-semibold text-sm text-[#14281e]">
                          {formatIndianPhoneNumber(item.number)}
                        </span>
                      </div>
                      {isProminent && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#25503d]/10 text-[#1c3b2d] px-2 py-0.5 rounded-md">
                          Priority {item.priority}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#706456] mt-1 pl-6">{item.label}</p>
                  </a>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-[#e8dfd3] text-center">
              <p className="text-xs text-[#786c5f]">
                Design photo, size ya price quotation ke liye direct WhatsApp par baat karein.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
