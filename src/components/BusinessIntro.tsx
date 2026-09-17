import React from 'react';
import { BusinessSettings } from '../types';
import { Sparkles, Hammer, Shield, MapPin, Users, HeartHandshake } from 'lucide-react';

interface BusinessIntroProps {
  business: BusinessSettings;
}

export const BusinessIntro: React.FC<BusinessIntroProps> = ({ business }) => {
  return (
    <section id="about-intro" className="py-16 bg-[#fbf9f5] border-b border-[#e8dfd3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header Badge */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5c341b]/10 text-[#5c341b] text-xs font-semibold uppercase tracking-wider border border-[#5c341b]/20">
            <Sparkles className="w-3 h-3" />
            <span>20+ Saal Ki Parampara</span>
          </div>
          
          <h2 className="font-serif-craft text-2xl sm:text-3xl md:text-4xl font-bold text-[#14281e] tracking-tight">
            Asli Karigari, Seedha Workshop Se Aapke Ghar Tak
          </h2>
        </div>

        {/* Introduction Narrative Card */}
        <div className="mt-8 bg-[#f4efe7] rounded-2xl p-6 sm:p-8 md:p-10 border border-[#dfd3c4] shadow-2xs space-y-5">
          <p className="text-base sm:text-lg text-[#3b3228] leading-relaxed">
            {business.introduction}
          </p>

          <div className="pt-4 border-t border-[#dfd3c4] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 bg-white/70 p-4 rounded-xl border border-[#e4d9cc]">
              <Users className="w-5 h-5 text-[#25503d] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#14281e]">Kaarigar-Run Business</h4>
                <p className="text-xs text-[#635547] mt-0.5">
                  Munawar Hussain aur Salahuddin Sahab khud har furniture ke structure aur finishing par dhyan dete hain.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/70 p-4 rounded-xl border border-[#e4d9cc]">
              <HeartHandshake className="w-5 h-5 text-[#7b4624] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#14281e]">Aapki Zaroorat Ke Hisaab Se</h4>
                <p className="text-xs text-[#635547] mt-0.5">
                  Chahe ready model ho ya custom size aur drawing, hum customer ki space aur budget ke anusaar kaam karte hain.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
