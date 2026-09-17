import React, { useState } from 'react';
import { BusinessSettings } from '../types';
import { getWhatsAppUrl, getCustomFurnitureMessage } from '../utils/whatsapp';
import { Sparkles, MessageCircle, Image, Ruler, Palette, TreePine, IndianRupee, Send, CheckCircle2 } from 'lucide-react';

interface CustomFurnitureProps {
  business: BusinessSettings;
}

export const CustomFurniture: React.FC<CustomFurnitureProps> = ({ business }) => {
  const [selectedType, setSelectedType] = useState('Bed / Double Bed');
  const [userDimensions, setUserDimensions] = useState('');
  const [userWoodPreference, setUserWoodPreference] = useState('Karigar Se Salah Leni Hai (Material Guidance)');
  const [customNotes, setCustomNotes] = useState('');

  const primaryWhatsApp = business.whatsAppNumbers[0]?.number || '8292036802';

  // Generate dynamic custom inquiry message from user inputs
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let msg = `Namaste Majdur Furniture Works,\nMujhe custom furniture banwana hai:\n• Item: ${selectedType}\n`;
    if (userDimensions.trim()) {
      msg += `• Size/Dimensions: ${userDimensions.trim()}\n`;
    }
    if (userWoodPreference) {
      msg += `• Material/Wood Preference: ${userWoodPreference}\n`;
    }
    if (customNotes.trim()) {
      msg += `• Details/Design Notes: ${customNotes.trim()}\n`;
    }
    msg += `Main apna reference photo aur exact measurement WhatsApp par share kar raha/rahi hoon. Kripya quotation aur discussion karein.`;

    const url = getWhatsAppUrl(primaryWhatsApp, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const directWhatsAppUrl = getWhatsAppUrl(primaryWhatsApp, getCustomFurnitureMessage());

  const steps = [
    {
      icon: <Image className="w-5 h-5 text-[#25503d]" />,
      title: 'Design Ya Reference Photo',
      desc: 'Pinterest, internet, ya kisi showroom ki photo hamare sath share karein.',
    },
    {
      icon: <Ruler className="w-5 h-5 text-[#7b4624]" />,
      title: 'Room & Space Ka Size',
      desc: 'Apne kamre ya deewar ka exact size batayein taaki furniture fit baithe.',
    },
    {
      icon: <TreePine className="w-5 h-5 text-[#25503d]" />,
      title: 'Material & Wood Selection',
      desc: 'Saagwan, Sheesham, Marine Ply ya Laminate apni requirement aur budget anusaar chunein.',
    },
    {
      icon: <Palette className="w-5 h-5 text-[#7b4624]" />,
      title: 'Finishing & Polish',
      desc: 'Natural wood polish, PU coat, matte laminate, ya cushion fabric customize karein.',
    },
  ];

  return (
    <section id="custom-furniture" className="py-16 md:py-20 bg-[#f4efe7] border-b border-[#ded3c2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7b4624] bg-[#7b4624]/10 px-3 py-1 rounded-full border border-[#7b4624]/20">
            Aapka Apna Design & Space Fit
          </span>
          <h2 className="font-serif-craft text-2xl sm:text-3xl md:text-4xl font-bold text-[#14281e]">
            {business.customFurnitureIntro || 'Jo Kuchh Banwana Hai, Aap Batayiye — Hum Aapki Zaroorat Ke Hisaab Se Banate Hain'}
          </h2>
          <p className="text-sm sm:text-base text-[#5c4f42] leading-relaxed">
            {business.customFurnitureMessage ||
              'Apna design bhejiye, size batayiye, aur apne space aur zaroorat ke according furniture ke baare mein humse baat kijiye.'}
          </p>
        </div>

        {/* 4 Step Visual Explanation */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white/90 p-5 rounded-2xl border border-[#dfd3c4] shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#fbf9f5] border border-[#e4d9cc] flex items-center justify-center mb-3">
                  {step.icon}
                </div>
                <h4 className="font-serif-craft text-base font-bold text-[#14281e]">
                  {idx + 1}. {step.title}
                </h4>
                <p className="text-xs text-[#635547] leading-relaxed mt-1.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Custom Order Form Box */}
        <div className="mt-12 bg-white rounded-2xl border border-[#dfd3c4] shadow-sm p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#e8dfd3]">
            <div>
              <h3 className="font-serif-craft text-xl font-bold text-[#14281e]">
                Custom Furniture Enquiry Form
              </h3>
              <p className="text-xs sm:text-sm text-[#706456]">
                Neeche di gayi details bharein aur WhatsApp par direct proposal prapt karein.
              </p>
            </div>

            <a
              id="custom-direct-whatsapp-cta"
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white text-xs sm:text-sm font-semibold shadow-xs shrink-0 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#88ba9e]" />
              <span>Custom Furniture Ke Liye WhatsApp Karein</span>
            </a>
          </div>

          <form onSubmit={handleCustomSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Furniture Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#422514] mb-1.5">
                  Furniture Type Kya Banwana Hai?
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-sm text-[#26221f] focus:outline-none focus:ring-2 focus:ring-[#1c3b2d]/30"
                >
                  <option value="Double Bed / King Size Bed">Double Bed / King Size Bed</option>
                  <option value="Storage Bed (Hydraulic / Drawer)">Storage Bed (Hydraulic / Drawer)</option>
                  <option value="Single Bed / Diwan">Single Bed / Diwan</option>
                  <option value="Multi-Door Wardrobe / Almirah">Multi-Door Wardrobe / Almirah</option>
                  <option value="Sofa Set (3+1+1 / L-Shape)">Sofa Set (3+1+1 / L-Shape)</option>
                  <option value="Dining Table & Chairs">Dining Table & Chairs</option>
                  <option value="Modern TV Unit / Console">Modern TV Unit / Console</option>
                  <option value="Dressing Table / Mirror Unit">Dressing Table / Mirror Unit</option>
                  <option value="Office / Study Table">Office / Study Table</option>
                  <option value="Temple / Pooja Mandir Unit">Temple / Pooja Mandir Unit</option>
                  <option value="Wooden Partition / Jaali">Wooden Partition / Jaali</option>
                  <option value="Other Custom Wooden Project">Other Custom Wooden Project</option>
                </select>
              </div>

              {/* Space / Dimensions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#422514] mb-1.5">
                  Kamre Ya Deewar Ka Size (Tentative Dimensions)
                </label>
                <input
                  type="text"
                  value={userDimensions}
                  onChange={(e) => setUserDimensions(e.target.value)}
                  placeholder="e.g. 6x6.5 ft bed ya 7x8 ft deewar"
                  className="w-full px-3.5 py-2.5 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-sm text-[#26221f] focus:outline-none focus:ring-2 focus:ring-[#1c3b2d]/30"
                />
              </div>

              {/* Material Preference */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#422514] mb-1.5">
                  Material Ya Lakdi Preference
                </label>
                <select
                  value={userWoodPreference}
                  onChange={(e) => setUserWoodPreference(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-sm text-[#26221f] focus:outline-none focus:ring-2 focus:ring-[#1c3b2d]/30"
                >
                  <option value="Karigar Se Salah Leni Hai (Material Guidance)">Karigar Se Salah Leni Hai (Material Guidance)</option>
                  <option value="Solid Saagwan / Teak Wood">Solid Saagwan / Teak Wood</option>
                  <option value="Sheesham Wood">Sheesham Wood</option>
                  <option value="Commercial / Marine Plywood">Commercial / Marine Plywood</option>
                  <option value="HDHMR & Decorative Laminate">HDHMR & Decorative Laminate</option>
                  <option value="Budget Friendly Combination">Budget Friendly Combination</option>
                </select>
              </div>

              {/* Design Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#422514] mb-1.5">
                  Koi Khaas Requirement Ya Reference Photo Hai?
                </label>
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="e.g. Dark walnut polish chahiye, drawers jyada chahiye"
                  className="w-full px-3.5 py-2.5 bg-[#fbf9f5] border border-[#dfd3c4] rounded-xl text-sm text-[#26221f] focus:outline-none focus:ring-2 focus:ring-[#1c3b2d]/30"
                />
              </div>

            </div>

            {/* Submit CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#635547]">
                <CheckCircle2 className="w-4 h-4 text-[#25503d]" />
                <span>Munawar Hussain & Salahuddin Sahab direct WhatsApp par reply karenge.</span>
              </div>

              <button
                type="submit"
                id="custom-form-submit-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1c3b2d] hover:bg-[#14281e] text-white font-semibold text-sm shadow-sm transition-all"
              >
                <Send className="w-4 h-4 text-[#88ba9e]" />
                <span>WhatsApp Par Details Bhejein</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};
