import React, { useState } from 'react';
import { CartItem } from '../types/tea';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [giftNote, setGiftNote] = useState('');
  const [showGiftNoteInput, setShowGiftNoteInput] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.selectedWeight.price * item.quantity,
    0
  );

  const freeShippingThreshold = 75;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 8;
  const finalTotal = Math.max(0, subtotal - promoDiscount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'FIRSTHARVEST') {
      const discountVal = subtotal * 0.15;
      setPromoDiscount(discountVal);
      setPromoMessage('15% First Harvest discount applied!');
    } else if (promoCode.trim().toUpperCase() === 'SPRING10') {
      const discountVal = subtotal * 0.1;
      setPromoDiscount(discountVal);
      setPromoMessage('10% Spring welcome discount applied!');
    } else {
      setPromoMessage('Code not recognized. Try "FIRSTHARVEST" for 15% off.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-[#FBFBFA] shadow-2xl flex flex-col border-l border-[#E2DDD2]">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-[#E6E1D5] flex items-center justify-between bg-[#F4F1EA]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2D4234]" />
              <h2 className="font-serif text-xl font-normal text-[#1A1F18]">
                Your Tea Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#545A4E] hover:text-[#1A1F18] transition-colors rounded-full"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker Bar */}
          <div className="px-6 py-3 bg-[#EAE6DC] border-b border-[#DDD8CB] text-xs text-[#41463C]">
            {remainingForFreeShipping > 0 ? (
              <div>
                Add <span className="font-mono font-semibold text-[#1C201A]">${remainingForFreeShipping.toFixed(2)}</span> more to unlock Complimentary Worldwide Shipping.
                <div className="w-full bg-[#DCD6C8] h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-[#2D4234] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[#2D4234] font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>You qualify for Complimentary Worldwide Express Shipping</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-[#8C9385] mx-auto stroke-1" />
                <p className="font-serif text-2xl text-[#2B3026]">Your tea bag is empty</p>
                <p className="text-xs text-[#6C7264] max-w-xs mx-auto">
                  Explore our seasonal single-origin flushes and hand-harvested cultivars.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2.5 bg-[#2D4234] text-white text-xs uppercase tracking-wider font-medium rounded-sm"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemTotal = item.selectedWeight.price * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-[#ECE7DD] last:border-b-0"
                  >
                    {/* Item Image */}
                    <img
                      src={item.tea.image}
                      alt={item.tea.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover rounded-sm bg-[#F0EEE8] border border-[#DDD8CB] shrink-0"
                    />

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-base font-normal text-[#1A1F18] leading-snug">
                            {item.tea.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#969C90] hover:text-[#912A2A] transition-colors p-1"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="text-xs text-[#686E62] mt-0.5">
                          {item.selectedWeight.label} · {item.packaging === 'tin-caddy' ? 'Matte Tin Caddy' : 'Eco Foil Pouch'}
                        </div>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#DDD7CB] rounded-sm bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-1 text-xs text-[#4C5246] hover:bg-[#F2EFE8]"
                            aria-label="Decrease quantity"
                          >
                            –
                          </button>
                          <span className="px-2 py-1 text-xs font-mono font-medium text-[#1E231D]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-1 text-xs text-[#4C5246] hover:bg-[#F2EFE8]"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="font-mono text-sm font-semibold tabular-nums text-[#1D221A]">
                          ${itemTotal.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer & Checkout Module */}
          {items.length > 0 && (
            <div className="border-t border-[#E5E0D5] p-6 bg-[#F8F6F1] space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#868C80] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. FIRSTHARVEST)"
                    className="w-full bg-white border border-[#DDD7CB] rounded-sm pl-8 pr-3 py-1.5 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234] uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#E8E4DA] hover:bg-[#DDD8CD] text-[#242820] text-xs font-medium uppercase tracking-wider rounded-sm transition-colors"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <div className="text-[11px] text-[#3A5D44] font-medium">{promoMessage}</div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#52584D] border-t border-[#ECE7DC] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums font-medium text-[#1E231B]">${subtotal.toFixed(2)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-[#3A5D44]">
                    <span>Seasonal Code Discount</span>
                    <span className="font-mono tabular-nums font-medium">-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Worldwide Shipping</span>
                  <span className="font-mono tabular-nums font-medium text-[#1E231B]">
                    {shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#DDD8CB] pt-2 font-medium text-sm text-[#1C201A]">
                  <span>Total Amount</span>
                  <span className="font-serif text-lg font-mono tabular-nums font-bold text-[#2D4234]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-[#2D4234] hover:bg-[#203126] text-white text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-[#7B8173] tracking-wide">
                Direct farm packaging · Carbon-neutral delivery
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
