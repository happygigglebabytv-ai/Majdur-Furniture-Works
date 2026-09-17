import React from 'react';
import { BusinessSettings } from '../types';
import { TreePine, Layers, HelpCircle, Check, Sparkles } from 'lucide-react';

interface MaterialsProps {
  business: BusinessSettings;
}

export const Materials: React.FC<MaterialsProps> = ({ business }) => {
  return (
    <section id="materials" className="py-16 bg-[#fbf9f5] border-b border-[#e6ded3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#25503d] bg-[#1c3b2d]/10 px-3 py-1 rounded-full border border-[#1c3b2d]/15">
            Imandar Paramarsh • Wood & Board
          </span>
          <h2 className="font-serif-craft text-2xl sm:text-3xl md:text-4xl font-bold text-[#14281e]">
            Material & Wood Selection
          </h2>
          <p className="text-sm sm:text-base text-[#524639] leading-relaxed">
            {business.materialIntro ||
              'Furniture ke liye material aur wood ka selection customer ki requirement, design, use aur budget ke according discuss kiya ja sakta hai. Agar customer ko material select karne ki jankari na ho, to furniture ki zaroorat aur budget ke hisaab se suitable material choose karne mein guidance di ja sakti hai.'}
          </p>
        </div>

        {/* Guidance Callout Box */}
        <div className="mt-10 max-w-4xl mx-auto bg-[#f4efe7] rounded-2xl p-5 sm:p-6 border border-[#dfd3c4] flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#1c3b2d] text-white flex items-center justify-center shrink-0 mt-0.5">
            <HelpCircle className="w-5 h-5 text-[#88ba9e]" />
          </div>
          <div className="text-xs sm:text-sm text-[#4d4236] leading-relaxed">
            <strong className="text-[#14281e] block text-sm sm:text-base font-serif-craft mb-1">
              Material Chun-ne Mein Uljhan Hai?
            </strong>
            Hum kisi ek brand ya mehengi lakdi par force nahi karte. Aapka furniture kahan rakha jayega (e.g. moisture wala area ya dry master bedroom), kitna heavy use hoga aur aapka budget kya hai — in teeno baaton ko dhyan mein rakh kar hum sahi material suggest karte hain.
          </div>
        </div>

        {/* Materials List Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {business.materialsList.map((mat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-[#dfd3c4] shadow-2xs hover:border-[#1c3b2d]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <TreePine className="w-4 h-4 text-[#7b4624]" />
                    <h3 className="font-serif-craft text-lg font-bold text-[#14281e]">
                      {mat.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5c5043] leading-relaxed mt-2">
                  {mat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f0e7db] flex items-center justify-between text-xs">
                <span className="text-[#786c5f] font-medium">Upyog:</span>
                <span className="font-semibold text-[#1c3b2d] bg-[#1c3b2d]/10 px-2.5 py-1 rounded-md">
                  {mat.bestFor}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
