import React from 'react';
import { Mountain, Droplet, Sun, ShieldCheck } from 'lucide-react';

export const TerroirStory: React.FC = () => {
  const terroirs = [
    {
      region: 'Uji, Kyoto Prefecture',
      country: 'Japan',
      altitude: '120m River Valley',
      focus: 'Straw-Woven Honba Shizu Shading',
      story: 'Nestled between the pristine Uji and Kizu rivers, cold morning river fog shields tender tea buds from harsh direct sunlight. Natural straw screens boost chlorophyll and L-theanine amino acids to unprecedented umami density.'
    },
    {
      region: 'Wuyi Mountains, Fujian',
      country: 'China',
      altitude: '720m Sandstone Gorges',
      focus: 'Zhengyan Rock Mineralogy',
      story: 'The roots of our wild rock bushes plunge into fractures of red sandstone and decomposed quartz. Roasted three distinct times over artisanal longan-wood charcoal to unlock the fabled "Cliff Rhyme" (Yan Yun).'
    },
    {
      region: 'Alishan Cloudline, Chiayi',
      country: 'Taiwan',
      altitude: '1,450m Subtropical Alpine',
      focus: 'Diurnal Mountain Mist',
      story: 'Dense alpine fog rolls in every afternoon, lowering ambient temperature by 10°C within minutes. The slow photosynthetic cycle thickens leaf cuticle layers, naturally producing velvety milk-sugar notes without artificial flavoring.'
    }
  ];

  return (
    <section id="terroir" className="bg-[#F4F1EA] py-16 md:py-24 border-b border-[#E3DDD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] font-medium text-[#656E5D]">
            Single-Origin Lineage
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1B1E19] text-balance">
            Rooted in Fog, Stone, and Ancestral Handcraft
          </h2>
          <p className="text-sm sm:text-base text-[#595E54] leading-relaxed">
            Great tea cannot be manufactured in factories. It is a biological snapshot of altitude, soil quartz, morning humidity, and the seasoned instincts of growers who have tended the same mountain terraces for centuries.
          </p>
        </div>

        {/* Terroirs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {terroirs.map((item, index) => (
            <div
              key={item.region}
              className="bg-white p-7 rounded-sm border border-[#E3DDD1] flex flex-col justify-between hover:border-[#C4BEB0] transition-colors"
            >
              <div className="space-y-3">
                <div className="text-xs text-[#7A8072] uppercase tracking-wider flex items-center gap-2">
                  <span>0{index + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.country}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.altitude}</span>
                </div>

                <h3 className="font-serif text-2xl font-normal text-[#1A1F18]">
                  {item.region}
                </h3>

                <div className="text-xs font-semibold text-[#2D4234] uppercase tracking-wider">
                  {item.focus}
                </div>

                <p className="text-xs sm:text-sm text-[#50564A] leading-relaxed">
                  {item.story}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Claim-to-Proof Standards Bar */}
        <div className="bg-[#EBE7DD] rounded-sm p-6 sm:p-8 border border-[#DDD7C9] grid grid-cols-1 md:grid-cols-3 gap-6 text-[#3F453B]">
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-[#2D4234] shrink-0 mt-0.5" />
            <div>
              <div className="font-serif text-lg font-medium text-[#1E231D]">Zero Pesticides or Blends</div>
              <p className="text-xs text-[#636A5C] mt-1 leading-relaxed">
                Independently Eurofins laboratory tested for 400+ agricultural residues. Every batch certified pure.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Droplet className="w-5 h-5 text-[#2D4234] shrink-0 mt-0.5" />
            <div>
              <div className="font-serif text-lg font-medium text-[#1E231D]">Direct Farm Gate Price</div>
              <p className="text-xs text-[#636A5C] mt-1 leading-relaxed">
                We bypass broker auctions, paying tea master families 300% above standard Fair Trade minimums.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Sun className="w-5 h-5 text-[#2D4234] shrink-0 mt-0.5" />
            <div>
              <div className="font-serif text-lg font-medium text-[#1E231D]">Peak Flush Freshness</div>
              <p className="text-xs text-[#636A5C] mt-1 leading-relaxed">
                Vacuum-sealed under food-grade nitrogen at garden origin to halt oxidative flavor loss.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
