import React, { useState } from 'react';
import { BusinessSettings } from '../types';
import { getWhatsAppUrl, getGeneralEnquiryMessage, formatIndianPhoneNumber } from '../utils/whatsapp';
import { MessageCircle, X, ChevronUp, UserCheck } from 'lucide-react';

interface FloatingWhatsAppProps {
  business: BusinessSettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ business }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Quick Contact Drawer */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-[#fbf9f5] rounded-2xl border border-[#dfd3c4] shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-5 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-[#dfd3c4]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#1c3b2d] flex items-center justify-center text-white">
                <MessageCircle className="w-4 h-4 text-[#88ba9e]" />
              </div>
              <span className="font-serif-craft font-bold text-sm text-[#14281e]">
                WhatsApp Karigari Chat
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-[#786c5f] hover:bg-[#ede5d8]"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-[#6e6050] my-2.5">
            Munawar Hussain ya Salahuddin Sahab se WhatsApp par seedhe baat karein:
          </p>

          <div className="space-y-2">
            {business.whatsAppNumbers.map((item, idx) => {
              const link = getWhatsAppUrl(item.number, getGeneralEnquiryMessage());
              const isProminent = idx < 2;

              return (
                <a
                  key={item.number}
                  id={`floating-wa-item-${idx}`}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`block p-2.5 rounded-xl border transition-all ${
                    isProminent
                      ? 'bg-white border-[#25503d]/40 shadow-xs hover:border-[#1c3b2d] hover:bg-[#f4f8f5]'
                      : 'bg-[#f4efe7] border-[#dfd3c4] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#14281e]">
                      {formatIndianPhoneNumber(item.number)}
                    </span>
                    {isProminent && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-[#25503d]/10 text-[#1c3b2d] px-1.5 py-0.5 rounded">
                        Priority {item.priority}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#706456] block mt-0.5">{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        id="floating-whatsapp-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#1c3b2d] text-white shadow-lg hover:shadow-xl hover:bg-[#14281e] border-2 border-[#88ba9e]/40 transition-all duration-200 group"
        aria-label="WhatsApp quick chat"
      >
        <MessageCircle className="w-6 h-6 text-[#88ba9e] group-hover:scale-110 transition-transform" />
        <span className="font-semibold text-sm hidden sm:inline">WhatsApp Chat</span>
        {isOpen ? (
          <X className="w-4 h-4 text-[#88ba9e]" />
        ) : (
          <ChevronUp className="w-4 h-4 text-[#88ba9e]" />
        )}
      </button>
    </div>
  );
};
