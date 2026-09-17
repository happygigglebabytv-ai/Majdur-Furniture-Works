import React from 'react';
import { BusinessSettings } from '../types';
import { MapPin, Navigation, ExternalLink, Clock, Phone } from 'lucide-react';
import { formatIndianPhoneNumber } from '../utils/whatsapp';

interface LocationMapsProps {
  business: BusinessSettings;
}

export const LocationMaps: React.FC<LocationMapsProps> = ({ business }) => {
  return (
    <section id="location" className="py-16 bg-[#f4efe7] border-b border-[#ded3c2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1c3b2d] bg-[#1c3b2d]/10 px-3 py-1 rounded-full border border-[#1c3b2d]/15">
            Motihari Showroom & Workshop
          </span>
          <h2 className="font-serif-craft text-2xl sm:text-3xl md:text-4xl font-bold text-[#14281e]">
            Karyashala Ka Pata (Location)
          </h2>
          <p className="text-sm sm:text-base text-[#615344]">
            Janpul par Smart Bazaar ke bilkul paas aakar aap humare workshop mein kaam dekh sakte hain.
          </p>
        </div>

        {/* Location Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Info Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#dfd3c4] shadow-2xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1c3b2d] text-white flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#88ba9e]" />
              </div>

              <div>
                <h3 className="font-serif-craft text-xl font-bold text-[#14281e]">
                  {business.businessName}
                </h3>
                <p className="text-xs font-semibold text-[#7b4624] mt-0.5">
                  Munawar Hussain & Salahuddin Sahab
                </p>
              </div>

              <div className="pt-2 text-sm text-[#4d4236] leading-relaxed space-y-1">
                <p className="font-semibold text-[#14281e]">{business.address.street}</p>
                <p>{business.address.landmark}</p>
                <p>
                  {business.address.city}, {business.address.district}
                </p>
                <p>
                  {business.address.state} – {business.address.pincode}, {business.address.country}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f0e7db] space-y-2 text-xs text-[#5c5043]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#25503d]" />
                  <span>
                    <strong className="text-[#14281e]">{business.openingHours.days}:</strong>{' '}
                    {business.openingHours.hours}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#7b4624]" />
                  <span>
                    Call: {formatIndianPhoneNumber(business.phoneNumbers[0] || '8292036802')}
                  </span>
                </div>
              </div>
            </div>

            {/* Google Directions Button */}
            <div className="pt-4 border-t border-[#f0e7db]">
              <a
                id="location-get-directions-btn"
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white font-semibold text-sm shadow-xs transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#88ba9e]" />
                <span>Get Directions On Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Right Map Embed */}
          <div className="lg:col-span-7 bg-white rounded-2xl overflow-hidden border border-[#dfd3c4] shadow-2xs min-h-[340px] flex flex-col">
            <div className="p-3 bg-[#ede4d5] border-b border-[#dfd2bf] flex items-center justify-between text-xs text-[#524639]">
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#25503d]" />
                <span>Google Maps • Motihari Janpul</span>
              </div>
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1c3b2d] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Bada Map Kholein</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 w-full relative">
              <iframe
                title="Majdur Furniture Works Location"
                src="https://maps.google.com/maps?q=26.6655929,84.913562&z=17&output=embed"
                className="w-full h-full min-h-[300px] border-0"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
