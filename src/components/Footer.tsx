import React from 'react';
import { BusinessSettings } from '../types';
import { formatIndianPhoneNumber, getWhatsAppUrl, getGeneralEnquiryMessage } from '../utils/whatsapp';
import { MapPin, Phone, MessageCircle, Clock, Lock, ShieldCheck, Instagram, Facebook, Youtube, ExternalLink } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  business: BusinessSettings;
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ business, onAdminClick }) => {
  const currentYear = new Date().getFullYear();
  const primaryWA = business.whatsAppNumbers[0]?.number || '8292036802';

  // Check if any genuine social media accounts exist
  const hasSocials = Boolean(
    business.socialMedia?.instagram ||
    business.socialMedia?.facebook ||
    business.socialMedia?.youtube
  );

  return (
    <footer className="bg-[#14281e] text-[#d8cfc4] border-t border-[#25503d]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Craftsmanship */}
          <div className="space-y-4">
            <BrandLogo business={business} variant="footer" />

            <p className="text-xs text-[#b8ab9a] leading-relaxed">
              Munawar Hussain aur Salahuddin Sahab ke netritva mein chalne wala custom furniture manufacturing workshop. Aapki zaroorat, space aur budget ke anusaar mazboot lakdi ka kaam.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#88ba9e]">
              <ShieldCheck className="w-4 h-4" />
              <span>Authentic Local Indian Woodworking</span>
            </div>

            {/* Social Media Links (ONLY if configured by Admin!) */}
            {hasSocials && (
              <div className="pt-2 flex items-center gap-3">
                {business.socialMedia?.instagram && (
                  <a
                    href={business.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#25503d]/50 hover:bg-[#25503d] text-[#88ba9e] hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {business.socialMedia?.facebook && (
                  <a
                    href={business.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#25503d]/50 hover:bg-[#25503d] text-[#88ba9e] hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {business.socialMedia?.youtube && (
                  <a
                    href={business.socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#25503d]/50 hover:bg-[#25503d] text-[#88ba9e] hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Col 2: Workshop Address & Map */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#88ba9e]">
              Workshop Pata (Location)
            </h4>
            
            <div className="text-xs text-[#b8ab9a] space-y-1 leading-relaxed">
              <p className="font-semibold text-white">Majdur Furniture Works</p>
              <p>{business.address.street}</p>
              <p>{business.address.landmark}</p>
              <p>
                {business.address.city}, {business.address.district}
              </p>
              <p>
                {business.address.state} – {business.address.pincode}
              </p>
            </div>

            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#88ba9e] hover:underline font-semibold pt-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Google Maps Par Dekhein</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Col 3: Phone & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#88ba9e]">
              Direct Sampark
            </h4>

            <div className="space-y-2 text-xs">
              <p className="text-[11px] text-[#9c8e7e]">Munawar Hussain / Salahuddin Sahab:</p>
              {business.phoneNumbers.slice(0, 3).map((phone) => (
                <div key={phone} className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#88ba9e]" />
                  <a href={`tel:+91${phone}`} className="hover:text-white transition-colors font-medium">
                    {formatIndianPhoneNumber(phone)}
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#25503d]/40">
              <p className="text-[11px] text-[#9c8e7e] mb-1.5">WhatsApp Inquiry:</p>
              {business.whatsAppNumbers.slice(0, 2).map((wa) => (
                <div key={wa.number} className="flex items-center gap-2 text-xs">
                  <MessageCircle className="w-3.5 h-3.5 text-[#88ba9e]" />
                  <a
                    href={getWhatsAppUrl(wa.number, getGeneralEnquiryMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white font-medium"
                  >
                    {formatIndianPhoneNumber(wa.number)} ({wa.label.split(' ')[0]})
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Timings & Quick Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#88ba9e]">
              Workshop Timings
            </h4>

            <div className="bg-[#1c3b2d]/60 p-3.5 rounded-xl border border-[#25503d] text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-white font-medium">
                <Clock className="w-3.5 h-3.5 text-[#88ba9e]" />
                <span>{business.openingHours.days}</span>
              </div>
              <p className="text-[#b8ab9a] pl-5">{business.openingHours.hours}</p>
            </div>

            <p className="text-[11px] text-[#8e8172] leading-relaxed">
              Workshop aakar lakdi ki quality aur ban rahe furniture ko live dekhna hamesha swagat-yogya hai.
            </p>

            <div className="pt-2">
              <button
                id="footer-admin-login-btn"
                onClick={onAdminClick}
                className="inline-flex items-center gap-1.5 text-xs text-[#88ba9e] hover:text-white transition-colors font-medium border border-[#25503d] px-3 py-1.5 rounded-lg hover:bg-[#25503d]/50"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Owner / Admin Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#25503d]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e8172]">
          <p>© {currentYear} Majdur Furniture Works, Motihari. All rights reserved.</p>
          <p className="text-[11px]">Janpul, Near Smart Bazaar, East Champaran, Bihar – 845401</p>
        </div>
      </div>
    </footer>
  );
};
