import React, { useState } from 'react';
import { BusinessSettings } from '../types';
import { Sparkles } from 'lucide-react';

interface BrandLogoProps {
  business: BusinessSettings;
  variant?: 'header' | 'footer' | 'mobile' | 'admin';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  business,
  variant = 'header',
  showText = true,
  className = '',
  onClick,
}) => {
  const [imgError, setImgError] = useState(false);

  const logoSettings = business.logo;
  const customLogoUrl = logoSettings?.imageUrl?.trim();

  // Check visibility toggles
  const isCustomLogoVisible =
    Boolean(customLogoUrl) &&
    !imgError &&
    (variant === 'header'
      ? logoSettings?.showInHeader !== false
      : variant === 'footer'
      ? logoSettings?.showInFooter !== false
      : variant === 'mobile'
      ? logoSettings?.showInMobile !== false
      : true);

  const displayName = logoSettings?.displayName?.trim() || business.businessName;
  const altText = logoSettings?.altText?.trim() || `${business.businessName} Logo`;

  // Render when custom logo is active and visible
  if (isCustomLogoVisible && customLogoUrl) {
    if (variant === 'footer') {
      return (
        <div
          onClick={onClick}
          className={`flex items-center gap-3 ${onClick ? 'cursor-pointer select-none' : ''} ${className}`}
        >
          <div className="h-11 max-w-[170px] flex items-center justify-start py-0.5">
            <img
              src={customLogoUrl}
              alt={altText}
              onError={() => setImgError(true)}
              className="max-h-11 w-auto max-w-[170px] object-contain rounded-md"
              loading="lazy"
            />
          </div>
          {showText && (
            <div>
              <h3 className="font-serif-craft text-lg font-bold text-white tracking-wide">
                {displayName}
              </h3>
              <p className="text-[11px] text-[#88ba9e]">Janpul, Motihari • Since 20+ Years</p>
            </div>
          )}
        </div>
      );
    }

    if (variant === 'admin') {
      return (
        <div
          onClick={onClick}
          className={`flex items-center gap-2.5 ${onClick ? 'cursor-pointer select-none' : ''} ${className}`}
        >
          <div className="h-9 max-w-[130px] flex items-center justify-start">
            <img
              src={customLogoUrl}
              alt={altText}
              onError={() => setImgError(true)}
              className="max-h-9 w-auto max-w-[130px] object-contain rounded-md"
              loading="lazy"
            />
          </div>
          {showText && (
            <div>
              <h1 className="font-serif-craft text-sm sm:text-base font-bold text-white tracking-wide leading-tight">
                {displayName}
              </h1>
              <p className="text-[10px] text-[#88ba9e]">Admin & Workshop Control Panel</p>
            </div>
          )}
        </div>
      );
    }

    // Default header / mobile
    const isMobile = variant === 'mobile';
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-2.5 sm:gap-3 ${onClick ? 'cursor-pointer select-none' : ''} ${className}`}
      >
        <div className={`${isMobile ? 'h-9 max-w-[130px]' : 'h-11 max-w-[170px]'} flex items-center justify-start py-0.5`}>
          <img
            src={customLogoUrl}
            alt={altText}
            onError={() => setImgError(true)}
            className={`${isMobile ? 'max-h-9 max-w-[130px]' : 'max-h-11 max-w-[170px]'} w-auto object-contain rounded-md`}
            loading="eager"
          />
        </div>
        {showText && (
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-craft text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#14281e] group-hover:text-[#25503d] transition-colors leading-tight">
                {displayName}
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[#25503d]/10 text-[#1c3b2d] px-2 py-0.5 rounded-full border border-[#25503d]/20">
                <Sparkles className="w-2.5 h-2.5" /> 20+ Yrs Exp
              </span>
            </div>
            <p className="text-xs text-[#706456] font-medium tracking-wide leading-tight hidden xs:block">
              Custom Furniture Manufacturer • Janpul, Motihari
            </p>
          </div>
        )}
      </div>
    );
  }

  // Fallback: Default Majdur Furniture Works emblem & branding
  if (variant === 'footer') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3 ${onClick ? 'cursor-pointer select-none' : ''} ${className}`}
      >
        <div className="w-10 h-10 rounded-xl bg-[#25503d] border border-[#88ba9e]/30 flex items-center justify-center text-white font-serif-craft font-bold text-lg shadow-2xs">
          M
        </div>
        {showText && (
          <div>
            <h3 className="font-serif-craft text-lg font-bold text-white tracking-wide">
              {displayName}
            </h3>
            <p className="text-[11px] text-[#88ba9e]">Janpul, Motihari • Since 20+ Years</p>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'admin') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-2.5 ${onClick ? 'cursor-pointer select-none' : ''} ${className}`}
      >
        <div className="w-9 h-9 rounded-xl bg-[#25503d] flex items-center justify-center font-serif-craft font-bold text-base text-white">
          M
        </div>
        {showText && (
          <div>
            <h1 className="font-serif-craft text-sm sm:text-base font-bold text-white tracking-wide leading-tight">
              {displayName}
            </h1>
            <p className="text-[10px] text-[#88ba9e]">Admin & Workshop Control Panel</p>
          </div>
        )}
      </div>
    );
  }

  // Header and Mobile default
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 ${onClick ? 'cursor-pointer select-none' : ''} ${className}`}
    >
      <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl bg-gradient-to-br from-[#1c3b2d] to-[#422514] flex items-center justify-center text-white shadow-sm border border-[#5c341b]/30 transition-transform">
        <span className="font-serif-craft text-lg sm:text-xl font-bold text-[#e6d0b5]">M</span>
      </div>
      {showText && (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif-craft text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#14281e] group-hover:text-[#25503d] transition-colors leading-tight">
              {displayName}
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[#25503d]/10 text-[#1c3b2d] px-2 py-0.5 rounded-full border border-[#25503d]/20">
              <Sparkles className="w-2.5 h-2.5" /> 20+ Yrs Exp
            </span>
          </div>
          <p className="text-xs text-[#706456] font-medium tracking-wide leading-tight">
            Custom Furniture Manufacturer • Janpul, Motihari
          </p>
        </div>
      )}
    </div>
  );
};
