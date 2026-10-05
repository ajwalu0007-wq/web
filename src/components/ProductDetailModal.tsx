import React, { useState } from 'react';
import { TeaItem, TeaWeightOption } from '../types/tea';
import { X, Check, Thermometer, Droplets, Clock, Flame, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  tea: TeaItem | null;
  onClose: () => void;
  onAddToCart: (tea: TeaItem, weight: TeaWeightOption, quantity: number, packaging: 'tin-caddy' | 'pouch') => void;
  onLaunchSteeper: (tea: TeaItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  tea,
  onClose,
  onAddToCart,
  onLaunchSteeper,
}) => {
  if (!tea) return null;

  const [selectedWeight, setSelectedWeight] = useState<TeaWeightOption>(tea.weightOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [packaging, setPackaging] = useState<'tin-caddy' | 'pouch'>('tin-caddy');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart(tea, selectedWeight, quantity, packaging);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 1500);
  };

  const totalPrice = selectedWeight.price * quantity;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FBFBFA] rounded-sm shadow-2xl border border-[#DED9CD] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#4A4E46] hover:text-[#181C16] bg-white/80 hover:bg-white rounded-full transition-colors shadow-xs"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual Media & Brewing Snapshot */}
          <div className="md:col-span-6 bg-[#F4F1EA] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5E0D5]">
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-white shadow-xs border border-[#E0DBD0]">
                <img
                  src={tea.image}
                  alt={tea.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {tea.statusKicker && (
                  <div className="absolute top-3 left-3 bg-[#1C211A]/85 text-[#F5F7F1] text-[11px] uppercase tracking-widest px-2.5 py-1 font-medium rounded-xs">
                    {tea.statusKicker}
                  </div>
                )}
              </div>

              {/* Terroir Authenticity Breakdown (Unboxed Editorial List) */}
              <div className="space-y-2.5 bg-[#EAE6DC]/60 p-4 rounded-sm border border-[#DDD8CB] text-xs text-[#484D42]">
                <div className="flex justify-between items-center py-1 border-b border-[#D8D2C4]/70">
                  <span className="text-[#757C6F] uppercase tracking-wider text-[11px]">Terroir Origin</span>
                  <span className="font-medium text-[#1E231D] text-right">{tea.origin}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#D8D2C4]/70">
                  <span className="text-[#757C6F] uppercase tracking-wider text-[11px]">Garden Elevation</span>
                  <span className="font-medium text-[#1E231D]">{tea.elevation}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#D8D2C4]/70">
                  <span className="text-[#757C6F] uppercase tracking-wider text-[11px]">Cultivar / Variety</span>
                  <span className="font-medium text-[#1E231D]">{tea.cultivar}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#757C6F] uppercase tracking-wider text-[11px]">Harvest Date</span>
                  <span className="font-medium text-[#1E231D]">{tea.harvest}</span>
                </div>
              </div>
            </div>

            {/* Direct Launch Interactive Steeper */}
            <div className="pt-6 mt-6 border-t border-[#DFD9CD]">
              <button
                onClick={() => {
                  onClose();
                  onLaunchSteeper(tea);
                }}
                className="w-full py-2.5 px-4 bg-[#E8E4DA] hover:bg-[#DED9CD] text-[#242921] text-xs uppercase tracking-wider font-medium rounded-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Clock className="w-3.5 h-3.5 text-[#2D4234]" />
                <span>Launch Interactive Gongfu Steeper for this Tea</span>
              </button>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs text-[#6F7668] uppercase tracking-wider">
                <span>{tea.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize">{tea.caffeine} Caffeine</span>
              </div>

              {/* Title & Native Script */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1E18] leading-tight">
                  {tea.name}
                </h2>
                {tea.nativeName && (
                  <p className="text-xs text-[#898F82] font-normal tracking-wide mt-1">
                    {tea.nativeName}
                  </p>
                )}
              </div>

              {/* Description & Curator Notes */}
              <p className="text-xs sm:text-sm text-[#4E5348] leading-relaxed">
                {tea.description}
              </p>

              <div className="bg-[#FAF8F4] p-3.5 rounded-sm border-l-2 border-[#2D4234] text-xs text-[#52574C] italic">
                "{tea.curatorNotes}"
              </div>

              {/* Tasting Profile Tags (Unboxed with subtle typographic formatting) */}
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#7E8577] block mb-1.5 font-medium">
                  Sensory Flavor Profile
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {tea.flavorNotes.map((note) => (
                    <span 
                      key={note} 
                      className="px-2.5 py-1 bg-[#F0EEE8] text-[#30352A] rounded-xs font-normal"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Weight / Variant Selector */}
              <div className="pt-2">
                <label className="text-[11px] uppercase tracking-wider text-[#7E8577] block mb-2 font-medium">
                  Select Format & Weight
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {tea.weightOptions.map((opt) => {
                    const isSelected = selectedWeight.label === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setSelectedWeight(opt)}
                        className={`p-2.5 text-left border rounded-sm transition-all ${
                          isSelected
                            ? 'border-[#2D4234] bg-[#2D4234]/5 text-[#191D17]'
                            : 'border-[#DDD8CC] bg-white text-[#52584D] hover:border-[#B5AFA2]'
                        }`}
                      >
                        <div className="text-xs font-medium">{opt.label}</div>
                        <div className="text-xs font-mono tabular-nums text-[#2D4234] font-semibold mt-0.5">
                          ${opt.price.toFixed(2)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Packaging Selector */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#7E8577] block mb-1.5 font-medium">
                  Vessel & Packaging Style
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPackaging('tin-caddy')}
                    className={`flex-1 py-2 px-3 text-xs rounded-sm border transition-colors ${
                      packaging === 'tin-caddy'
                        ? 'border-[#2D4234] bg-[#2D4234] text-white font-medium'
                        : 'border-[#DDD8CC] bg-white text-[#52584D] hover:bg-[#F4F1EA]'
                    }`}
                  >
                    Airtight Matte Tin Caddy
                  </button>
                  <button
                    type="button"
                    onClick={() => setPackaging('pouch')}
                    className={`flex-1 py-2 px-3 text-xs rounded-sm border transition-colors ${
                      packaging === 'pouch'
                        ? 'border-[#2D4234] bg-[#2D4234] text-white font-medium'
                        : 'border-[#DDD8CC] bg-white text-[#52584D] hover:bg-[#F4F1EA]'
                    }`}
                  >
                    Resealable Eco Foil Pouch
                  </button>
                </div>
              </div>

              {/* Quantity Stepper & Contiguous Add To Bag */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center border border-[#DDD8CC] rounded-sm bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-xs text-[#4A5044] hover:bg-[#F4F1EA] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    –
                  </button>
                  <span className="px-3 py-2.5 text-xs font-mono tabular-nums font-semibold text-[#1F241C] min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2.5 text-xs text-[#4A5044] hover:bg-[#F4F1EA] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 text-xs uppercase tracking-widest font-medium rounded-sm flex items-center justify-center gap-2 transition-all ${
                    addedSuccess
                      ? 'bg-[#3A5D44] text-white'
                      : 'bg-[#2D4234] hover:bg-[#233529] text-white shadow-sm'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag · ${totalPrice.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust Badges / Policies */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-[#7A8073] border-t border-[#ECE7DC]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2D4234]" />
                  Direct Trade Verified
                </span>
                <span>Ships in 24-48 Hours</span>
                <span>Freshness Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
