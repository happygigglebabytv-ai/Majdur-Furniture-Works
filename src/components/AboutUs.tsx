import React from 'react';
import { BusinessSettings } from '../types';
import { Sparkles, Users, Award, MapPin, CheckCircle2, Shield } from 'lucide-react';

interface AboutUsProps {
  business: BusinessSettings;
}

export const AboutUs: React.FC<AboutUsProps> = ({ business }) => {
  return (
    <section id="about" className="py-16 bg-[#fbf9f5] border-b border-[#e6ded3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b4624] bg-[#7b4624]/10 px-3 py-1 rounded-full border border-[#7b4624]/20">
              Hamare Baare Mein (About Us)
            </span>

            <h2 className="font-serif-craft text-2xl sm:text-3xl md:text-4xl font-bold text-[#14281e]">
              20+ Saal Ka Tajurba Aur Vishwas
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#4a3f33] leading-relaxed">
              <p>
                <strong>Majdur Furniture Works</strong> Janpul, Motihari (East Champaran, Bihar) mein sthit ek vishwasneeya custom furniture manufacturing workshop hai. Pichhle 20 se adhik varshon se hamare sanchalak <strong>Munawar Hussain</strong> aur <strong>Salahuddin Sahab</strong> ne lakdi ke kaam aur furniture design mein anubhav haasil kiya hai.
              </p>

              <p>
                Hum factory-made kamzor press-board furniture ke bajaye mazboot aur practical lakdi ke kaam par vishwas rakhte hain. Humara focus customer ki zaroorat ke anusaar furniture banana hai — chahe aapke paas ready model ka reference photo ho, ya aapko apne kamre ke specific measurement ke mutabiq wardrobe, bed ya sofa banwana ho.
              </p>

              <p>
                Yahan har grahak seedhe kaarigar se baat karta hai. Lakdi ka selection, polish ka shade, cushion ki quality aur budget par khul kar charcha hoti hai taaki banne ke baad aapko poora santosh mile.
              </p>
            </div>

            {/* Supported Highlights List */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 text-xs text-[#26221f]">
                <CheckCircle2 className="w-4 h-4 text-[#25503d] shrink-0" />
                <span>Munawar Hussain & Salahuddin Sahab</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#26221f]">
                <CheckCircle2 className="w-4 h-4 text-[#25503d] shrink-0" />
                <span>20+ Years Woodworking Experience</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#26221f]">
                <CheckCircle2 className="w-4 h-4 text-[#25503d] shrink-0" />
                <span>Bespoke Room-Fit Sizing</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#26221f]">
                <CheckCircle2 className="w-4 h-4 text-[#25503d] shrink-0" />
                <span>Janpul, Near Smart Bazaar, Motihari</span>
              </div>
            </div>

            {/* Optional Warranty & Service Notice (Only if Admin has filled it!) */}
            {(business.warrantyInfo || business.serviceInfo) && (
              <div className="mt-6 p-4 rounded-xl bg-[#f4efe7] border border-[#dfd3c4] space-y-2 text-xs text-[#524639]">
                {business.warrantyInfo && (
                  <div>
                    <strong className="text-[#14281e] block">Warranty Jankari:</strong>
                    <p>{business.warrantyInfo}</p>
                  </div>
                )}
                {business.serviceInfo && (
                  <div>
                    <strong className="text-[#14281e] block">Service Jankari:</strong>
                    <p>{business.serviceInfo}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#f4efe7] p-6 sm:p-8 rounded-3xl border border-[#ded3c2] space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1c3b2d] flex items-center justify-center text-white font-serif-craft font-bold text-xl">
                  M
                </div>
                <div>
                  <h3 className="font-serif-craft text-lg font-bold text-[#14281e]">
                    Majdur Furniture Works
                  </h3>
                  <p className="text-xs text-[#706456]">Proprietorship: Munawar Hussain & Salahuddin Sahab</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="bg-white p-3.5 rounded-xl border border-[#e4d9cc]">
                  <span className="text-[11px] text-[#786c5f] font-semibold uppercase tracking-wider block">Kaam Ka Tarika</span>
                  <p className="text-xs text-[#26221f] font-medium mt-0.5">
                    Customer Reference Design + Measurement + Material Guidance + Precision Finishing
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#e4d9cc]">
                  <span className="text-[11px] text-[#786c5f] font-semibold uppercase tracking-wider block">Service Area</span>
                  <p className="text-xs text-[#26221f] font-medium mt-0.5">
                    Motihari Shahar, Janpul, Chhatauni, Raxaul road aur East Champaran ke aas-paas ke ilaqe.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#e4d9cc]">
                  <span className="text-[11px] text-[#786c5f] font-semibold uppercase tracking-wider block">Workshop Timings</span>
                  <p className="text-xs text-[#26221f] font-medium mt-0.5">
                    Somwar se Ravivar: 9:00 AM se 8:00 PM tak
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
