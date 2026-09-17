import React from 'react';
import { BusinessSettings } from '../types';
import { ShieldCheck, Ruler, MessageSquare, Compass, Home, Sparkles } from 'lucide-react';

interface WhyChooseUsProps {
  business: BusinessSettings;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ business }) => {
  const icons = [
    <ShieldCheck key="0" className="w-5 h-5 text-[#25503d]" />,
    <Ruler key="1" className="w-5 h-5 text-[#7b4624]" />,
    <Sparkles key="2" className="w-5 h-5 text-[#25503d]" />,
    <Compass key="3" className="w-5 h-5 text-[#7b4624]" />,
    <MessageSquare key="4" className="w-5 h-5 text-[#25503d]" />,
    <Home key="5" className="w-5 h-5 text-[#7b4624]" />,
  ];

  return (
    <section id="why-choose-us" className="py-16 bg-[#f5efe7] border-b border-[#e2d7c9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#25503d] bg-[#1c3b2d]/10 px-3 py-1 rounded-full border border-[#1c3b2d]/15">
            Sachha Kaam, Pukhta Vishwas
          </span>
          <h2 className="font-serif-craft text-2xl sm:text-3xl md:text-4xl font-bold text-[#14281e]">
            Majdur Furniture Works Hi Kyun?
          </h2>
          <p className="text-sm sm:text-base text-[#615344]">
            Koi hawa-hawaai daawa nahi — humare 20 saal ke anubhav aur imandari par aadharit seedhi baatein:
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.whyChooseUs.map((item, index) => (
            <div
              key={index}
              className="bg-white/85 p-6 rounded-2xl border border-[#dfd3c4] shadow-2xs hover:shadow-sm hover:border-[#1c3b2d]/30 transition-all flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-[#f4efe7] border border-[#e4d9cc] flex items-center justify-center mb-4">
                {icons[index % icons.length]}
              </div>
              <h3 className="font-serif-craft text-lg font-bold text-[#14281e]">
                {item.title}
              </h3>
              <p className="text-sm text-[#5c5043] leading-relaxed mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
