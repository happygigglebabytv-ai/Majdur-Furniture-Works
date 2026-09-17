import React, { useState } from 'react';
import { BusinessSettings } from '../types';
import { getWhatsAppUrl, getGeneralEnquiryMessage, formatIndianPhoneNumber } from '../utils/whatsapp';
import { Phone, MessageCircle, Clock, MapPin, Menu, X, Lock, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  business: BusinessSettings;
  onNavigate: (sectionId: string) => void;
  onOpenAdminLogin?: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdminDashboard?: () => void;
  onAdminClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  business,
  onNavigate,
  onOpenAdminLogin,
  isAdminLoggedIn,
  onOpenAdminDashboard,
  onAdminClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAdminAction = () => {
    if (onAdminClick) {
      onAdminClick();
    } else if (isAdminLoggedIn && onOpenAdminDashboard) {
      onOpenAdminDashboard();
    } else if (onOpenAdminLogin) {
      onOpenAdminLogin();
    }
  };

  const primaryWhatsApp = business.whatsAppNumbers[0]?.number || '8292036802';
  const whatsappLink = getWhatsAppUrl(primaryWhatsApp, getGeneralEnquiryMessage());

  const navLinks = [
    { label: 'Home', target: 'home' },
    { label: 'Catalogue', target: 'catalogue' },
    { label: 'Custom Orders', target: 'custom-furniture' },
    { label: 'Materials', target: 'materials' },
    { label: 'Gallery', target: 'gallery' },
    { label: 'Videos', target: 'videos' },
    { label: 'Reviews', target: 'reviews' },
    { label: 'About Us', target: 'about' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f5] border-b border-[#e6ded3] shadow-xs">
      {/* Top Contact Bar */}
      <div className="bg-[#14281e] text-[#e8dfd5] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-[#d8c3ad]">
              <MapPin className="w-3.5 h-3.5 text-[#88ba9e]" />
              <span className="font-medium">Janpul, Near Smart Bazaar, Motihari, Bihar</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[#d8c3ad]">
              <Clock className="w-3.5 h-3.5 text-[#88ba9e]" />
              <span>{business.openingHours.days}: {business.openingHours.hours}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto text-xs">
            <span className="hidden md:inline text-[#a19688]">Call Direct:</span>
            {business.phoneNumbers.slice(0, 2).map((num, i) => (
              <a
                key={num}
                id={`topbar-phone-${i}`}
                href={`tel:+91${num}`}
                className="inline-flex items-center gap-1 hover:text-white font-medium transition-colors"
              >
                <Phone className="w-3 h-3 text-[#88ba9e]" />
                <span>{formatIndianPhoneNumber(num)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Details */}
        <div id="brand-logo-button">
          <BrandLogo
            business={business}
            variant="header"
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer group"
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-[#4a4036]">
          {navLinks.map((link) => (
            <button
              key={link.target}
              id={`nav-${link.target}`}
              onClick={() => handleLinkClick(link.target)}
              className="px-3 py-1.5 rounded-lg hover:text-[#14281e] hover:bg-[#ede5d8]/60 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            id="header-whatsapp-cta"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all border border-[#25503d]"
          >
            <MessageCircle className="w-4 h-4 text-[#88ba9e]" />
            <span className="hidden sm:inline">WhatsApp Enquiry</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          {isAdminLoggedIn ? (
            <button
              id="header-admin-dashboard-btn"
              onClick={handleAdminAction}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#5c341b] hover:bg-[#422514] text-[#faedd9] text-xs font-semibold shadow-xs transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          ) : (
            <button
              id="header-admin-login-btn"
              onClick={handleAdminAction}
              title="Admin Login"
              className="p-2 rounded-xl text-[#786c5f] hover:text-[#14281e] hover:bg-[#ede5d8]/70 transition-colors"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-[#4a4036] hover:bg-[#ede5d8] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="xl:hidden bg-[#f7f2ea] border-b border-[#e6ded3] px-4 py-4 shadow-md animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#e2d7c9]">
            {navLinks.map((link) => (
              <button
                key={link.target}
                id={`mobile-nav-${link.target}`}
                onClick={() => handleLinkClick(link.target)}
                className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#4a4036] hover:bg-[#e8decb] hover:text-[#14281e] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 flex flex-col gap-2">
            <div className="text-xs text-[#706456]">
              <span className="font-semibold text-[#14281e]">Call for instant consultation:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {business.phoneNumbers.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:+91${phone}`}
                    className="inline-flex items-center gap-1 text-xs bg-white px-2.5 py-1 rounded-md border border-[#dfd2c0] font-medium text-[#1c3b2d]"
                  >
                    <Phone className="w-3 h-3 text-[#25503d]" />
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
