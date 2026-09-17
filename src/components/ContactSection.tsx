import React from 'react';
import { BusinessSettings } from '../types';
import { getWhatsAppUrl, getGeneralEnquiryMessage, formatIndianPhoneNumber } from '../utils/whatsapp';
import { Phone, MessageCircle, MapPin, Clock, Mail, Navigation, ExternalLink, User } from 'lucide-react';

interface ContactSectionProps {
  business: BusinessSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ business }) => {
  const primaryPhone = business.phoneNumbers[0] || '8292036802';
  const primaryWhatsApp = business.whatsAppNumbers[0]?.number || '8292036802';
  const defaultWhatsAppLink = getWhatsAppUrl(primaryWhatsApp, getGeneralEnquiryMessage());

  return (
    <section id="contact" className="py-16 bg-[#fbf9f5] border-b border-[#e6ded3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#25503d] bg-[#1c3b2d]/10 px-3 py-1 rounded-full border border-[#1c3b2d]/15">
            Sampark Karein
          </span>
          <h2 className="font-serif-craft text-2xl sm:text-3xl md:text-4xl font-bold text-[#14281e]">
            Contact & Workshop Details
          </h2>
          <p className="text-sm sm:text-base text-[#615344]">
            Aap phone call, WhatsApp ya seedha workshop aakar humse baat kar sakte hain.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Phone Numbers */}
          <div className="bg-[#f4efe7] p-6 rounded-2xl border border-[#dfd3c4] shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1c3b2d] text-white flex items-center justify-center mb-3">
                <Phone className="w-5 h-5 text-[#88ba9e]" />
              </div>
              <h3 className="font-serif-craft text-lg font-bold text-[#14281e]">Phone Numbers</h3>
              <p className="text-xs text-[#706456] mt-0.5">Seedha call par requirement batayein:</p>

              <div className="mt-4 space-y-2">
                {business.phoneNumbers.map((phone, i) => (
                  <a
                    key={phone}
                    id={`contact-phone-${i}`}
                    href={`tel:+91${phone}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e4d9cc] hover:border-[#1c3b2d] transition-colors"
                  >
                    <span className="font-semibold text-sm text-[#14281e]">
                      {formatIndianPhoneNumber(phone)}
                    </span>
                    <span className="text-[11px] font-bold text-[#25503d] bg-[#25503d]/10 px-2 py-0.5 rounded">
                      Call
                    </span>
                  </a>
                ))}
              </div>

              {business.alternativeNumbers && business.alternativeNumbers.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#dfd3c4] text-xs text-[#706456]">
                  <span className="font-semibold block mb-1">Alternative Numbers:</span>
                  <div className="flex flex-wrap gap-2">
                    {business.alternativeNumbers.map((alt) => (
                      <a
                        key={alt}
                        href={`tel:+91${alt}`}
                        className="text-[#5c341b] hover:underline font-medium"
                      >
                        {formatIndianPhoneNumber(alt)}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              id="contact-call-now-main-cta"
              href={`tel:+91${primaryPhone}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-[#ede5d8] text-[#14281e] font-semibold text-sm border border-[#d6c7b5] shadow-2xs transition-colors"
            >
              <Phone className="w-4 h-4 text-[#7b4624]" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Card 2: WhatsApp Contacts (Priority 1 & 2 highlighted) */}
          <div className="bg-[#f4efe7] p-6 rounded-2xl border border-[#dfd3c4] shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#25503d] text-white flex items-center justify-center mb-3">
                <MessageCircle className="w-5 h-5 text-[#88ba9e]" />
              </div>
              <h3 className="font-serif-craft text-lg font-bold text-[#14281e]">WhatsApp Chat</h3>
              <p className="text-xs text-[#706456] mt-0.5">Photo, size aur quotation ke liye:</p>

              <div className="mt-4 space-y-2">
                {business.whatsAppNumbers.map((item, idx) => {
                  const link = getWhatsAppUrl(item.number, getGeneralEnquiryMessage());
                  const isProminent = idx < 2;

                  return (
                    <a
                      key={item.number}
                      id={`contact-whatsapp-${idx}`}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                        isProminent
                          ? 'bg-white border-[#25503d]/40 shadow-2xs hover:border-[#1c3b2d]'
                          : 'bg-white/70 border-[#e4d9cc] hover:bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-sm text-[#14281e] block">
                          {formatIndianPhoneNumber(item.number)}
                        </span>
                        <span className="text-[10px] text-[#706456]">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#1c3b2d] bg-[#1c3b2d]/10 px-2 py-1 rounded-md">
                        Chat
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            <a
              id="contact-whatsapp-main-cta"
              href={defaultWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white font-semibold text-sm shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#88ba9e]" />
              <span>WhatsApp Par Baat Karein</span>
            </a>
          </div>

          {/* Card 3: Address & Working Hours */}
          <div className="bg-[#f4efe7] p-6 rounded-2xl border border-[#dfd3c4] shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#5c341b] text-white flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-[#e6d0b5]" />
              </div>
              <h3 className="font-serif-craft text-lg font-bold text-[#14281e]">Workshop Location</h3>
              <p className="text-xs text-[#706456] mt-0.5">Showroom & Workshop Visit:</p>

              <div className="mt-4 bg-white p-3 rounded-xl border border-[#e4d9cc] text-xs space-y-1 text-[#42372d]">
                <p className="font-bold text-sm text-[#14281e]">{business.businessName}</p>
                <p className="text-[#7b4624] font-semibold">
                  Munawar Hussain & Salahuddin Sahab
                </p>
                <p>{business.address.street}</p>
                <p>{business.address.landmark}</p>
                <p>
                  {business.address.city}, {business.address.state} – {business.address.pincode}
                </p>
              </div>

              <div className="mt-3 bg-white p-3 rounded-xl border border-[#e4d9cc] text-xs space-y-1.5 text-[#5c5043]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#25503d]" />
                  <span>
                    <strong>Timings:</strong> {business.openingHours.days} ({business.openingHours.hours})
                  </span>
                </div>

                {/* Email (ONLY displayed if Admin adds it) */}
                {business.email && business.email.trim() !== '' && (
                  <div className="flex items-center gap-2 pt-1 border-t border-[#f0e7db]">
                    <Mail className="w-3.5 h-3.5 text-[#7b4624]" />
                    <a href={`mailto:${business.email}`} className="text-[#1c3b2d] hover:underline">
                      {business.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <a
              id="contact-get-directions-cta"
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#7b4624] hover:bg-[#5c341b] text-white font-semibold text-sm shadow-2xs transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
