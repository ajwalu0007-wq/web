import React, { useState } from 'react';
import { CartItem } from '../types/tea';
import { X, CheckCircle, ShieldCheck, CreditCard, Store, Truck, Printer } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pickup'>('card');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    total: number;
    items: CartItem[];
    shippingTo: string;
  } | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.selectedWeight.price * item.quantity,
    0
  );
  const shipping = subtotal >= 75 || paymentMethod === 'pickup' ? 0 : 8;
  const total = subtotal + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const orderId = `CS-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedOrder({
      orderId,
      total,
      items: [...items],
      shippingTo: paymentMethod === 'pickup' ? 'Teahouse Atelier Counter (Ready in 2 hours)' : `${address}, ${city} ${postalCode}, ${country}`
    });
    onOrderSuccess();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#FCFAF7] rounded-sm shadow-2xl border border-[#DDD7CB] p-6 sm:p-8 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#5B6154] hover:text-[#181C16] transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedOrder ? (
          /* Order Confirmation Receipt */
          <div className="text-center py-6 space-y-4">
            <CheckCircle className="w-12 h-12 text-[#2D4234] mx-auto" />
            <div>
              <div className="text-xs uppercase tracking-widest text-[#6F7668] font-medium">Order Confirmed</div>
              <h2 className="font-serif text-3xl font-normal text-[#1A1F18] mt-1">
                Thank you for honoring the harvest
              </h2>
              <p className="text-xs font-mono font-semibold text-[#2D4234] mt-1">
                Order Reference: {confirmedOrder.orderId}
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-[#F3EFE7] p-5 rounded-sm border border-[#E0DACE] text-left text-xs space-y-3 text-[#444A3E]">
              <div className="font-medium text-[#1E231C] border-b border-[#DDD7C9] pb-2 flex justify-between">
                <span>Items Ordered</span>
                <span>Amount</span>
              </div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {confirmedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.quantity}× {item.tea.name} ({item.selectedWeight.label})
                    </span>
                    <span className="font-mono tabular-nums font-medium">
                      ${(item.selectedWeight.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#DDD7C9] pt-2 space-y-1">
                <div className="flex justify-between text-[#686E61]">
                  <span>Fulfillment Destination:</span>
                  <span className="font-medium text-[#1E231D] text-right truncate max-w-xs">{confirmedOrder.shippingTo}</span>
                </div>
                <div className="flex justify-between font-semibold text-sm text-[#1E231D] pt-1 border-t border-[#DDD7C9]/60">
                  <span>Total Paid:</span>
                  <span className="font-mono font-serif text-base text-[#2D4234]">${confirmedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#636A5D] max-w-md mx-auto leading-relaxed">
              We pack every tin under nitrogen flush to preserve fleeting volatile aromatics. A shipment tracking notice will be dispatched to your email within 24 hours.
            </p>

            <div className="pt-3 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#2D4234] hover:bg-[#203126] text-white text-xs uppercase tracking-wider font-medium rounded-sm transition-colors"
              >
                Return to Tea Atelier
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#697062] font-medium">
                Direct Atelier Checkout
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1B1F18] mt-1">
                Fulfillment & Payment
              </h2>
            </div>

            {/* Delivery Method Selection */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#71776A] block mb-1.5 font-medium">
                Fulfillment Option
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 text-left border rounded-sm transition-all flex items-start gap-2.5 ${
                    paymentMethod === 'card'
                      ? 'border-[#2D4234] bg-[#2D4234]/5 text-[#191D17]'
                      : 'border-[#DDD7CB] bg-white text-[#575E51]'
                  }`}
                >
                  <Truck className="w-4 h-4 text-[#2D4234] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-medium">Insured Worldwide Delivery</div>
                    <div className="text-[11px] text-[#71776A]">Direct to your doorstep</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('pickup')}
                  className={`p-3 text-left border rounded-sm transition-all flex items-start gap-2.5 ${
                    paymentMethod === 'pickup'
                      ? 'border-[#2D4234] bg-[#2D4234]/5 text-[#191D17]'
                      : 'border-[#DDD7CB] bg-white text-[#575E51]'
                  }`}
                >
                  <Store className="w-4 h-4 text-[#2D4234] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-medium">Teahouse Counter Pickup</div>
                    <div className="text-[11px] text-[#71776A]">Ready in 2 hours (Complimentary)</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#71776A] font-medium border-b border-[#ECE7DD] pb-1">
                1. Customer Information
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#71776A] block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Alistair Chen"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-[#DDD7CB] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#71776A] block mb-1">
                    Email for Shipment Updates *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alistair@chen.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#DDD7CB] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                  />
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#71776A] block mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 482 Bamboo Grove Ave, Suite 4"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white border border-[#DDD7CB] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#71776A] block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Seattle"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-white border border-[#DDD7CB] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#71776A] block mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 98101"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full bg-white border border-[#DDD7CB] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#71776A] block mb-1">
                        Country
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-white border border-[#DDD7CB] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Japan">Japan</option>
                        <option value="Germany">Germany</option>
                        <option value="Australia">Australia</option>
                        <option value="Singapore">Singapore</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Details */}
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#71776A] font-medium border-b border-[#ECE7DD] pb-1 flex items-center justify-between">
                <span>2. Payment Method</span>
                <span className="text-[11px] text-[#71776A] font-normal flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2D4234]" /> 256-Bit Encrypted
                </span>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#71776A] block mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-[#8C9286] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="4111 ···· ···· 9821"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-[#DDD7CB] rounded-sm pl-9 pr-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#71776A] block mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white border border-[#DDD7CB] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#71776A] block mb-1">
                        Security CVC
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="CVC"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-white border border-[#DDD7CB] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#F0EEE8] p-4 rounded-sm border border-[#DDD7CB] text-xs text-[#4E5448] space-y-1">
                  <div className="font-semibold text-[#1F231D]">Pay Upon Collection</div>
                  <div>
                    We will hold your hand-packaged order at the Tasting Counter for up to 7 days. You may pay with credit card or cash upon arrival.
                  </div>
                </div>
              )}
            </div>

            {/* Total and Submit */}
            <div className="pt-4 border-t border-[#ECE7DD] flex items-center justify-between">
              <div>
                <div className="text-[11px] text-[#71776A] uppercase tracking-wider">Total Charge</div>
                <div className="font-serif text-2xl font-mono tabular-nums text-[#1D221A] font-semibold">
                  ${total.toFixed(2)}
                </div>
              </div>

              <button
                type="submit"
                className="px-7 py-3 bg-[#2D4234] hover:bg-[#203126] text-white text-xs uppercase tracking-widest font-semibold rounded-sm shadow-sm transition-colors"
              >
                Place Harvest Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
