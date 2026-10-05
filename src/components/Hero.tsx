import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { heroTeahouseImg } from '../data/teas';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollection, onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-[#F5F3EE] border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Brand & Campaign Lead */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium text-[#5B6354]">
              <span>Spring Harvest 2026</span>
              <span aria-hidden="true">·</span>
              <span>Direct Farm Allocation</span>
              <span aria-hidden="true">·</span>
              <span>Single Cultivar</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-[#191D17] tracking-tight text-balance">
              Where mist, ancient rock, and quiet dawn become liquor.
            </h1>

            <p className="text-base sm:text-lg text-[#555A50] leading-relaxed max-w-xl font-normal">
              Direct-trade single-origin teas, stone-milled ceremonial matcha, and rare vintage pu-erh. Curated directly from ancestral tea master gardens in Uji, Wuyi, and Alishan.
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreCollection}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#2D4234] text-[#F9F8F5] text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-[#233529] transition-colors shadow-sm"
              >
                <span>Explore The Harvest</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-[#2D4234]/40 text-[#2D4234] text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-[#2D4234]/5 transition-colors"
              >
                <span>Reserve Tasting Salon</span>
              </button>
            </div>

            {/* Terroir Proof Bar (Unboxed Metadata) */}
            <div className="pt-8 border-t border-[#E4E0D5] grid grid-cols-3 gap-4 text-[#44483F]">
              <div>
                <div className="font-serif text-2xl font-normal text-[#1E231D] tabular-nums">
                  1,450m
                </div>
                <div className="text-xs text-[#6B7064] tracking-wide mt-0.5">
                  Peak Garden Cloudline
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl font-normal text-[#1E231D] tabular-nums">
                  100%
                </div>
                <div className="text-xs text-[#6B7064] tracking-wide mt-0.5">
                  Single-Origin Traceable
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl font-normal text-[#1E231D] tabular-nums">
                  28 Days
                </div>
                <div className="text-xs text-[#6B7064] tracking-wide mt-0.5">
                  Straw Canopy Shading
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden bg-[#ECE8DF] aspect-[16/11] shadow-md border border-[#E0DCD1]">
              <img
                src={heroTeahouseImg}
                alt="Minimalist tea atelier interior with sunlight streaming through wooden screens onto ceramic teaware"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-700"
              />
              {/* Refined subtle caption overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-5 text-white">
                <div className="flex items-center justify-between text-xs tracking-wider">
                  <span className="font-serif italic text-sm text-[#F0EFEA]">
                    The Camellia & Stone Tasting Room · Tatami Alcove
                  </span>
                  <span className="text-[#D3D7CE] uppercase tracking-widest text-[11px]">
                    Kyoto & Wuyi Collection
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
