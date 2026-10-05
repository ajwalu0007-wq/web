import React, { useState } from 'react';
import { TastingExperience, ReservationBooking } from '../types/tea';
import { TASTING_EXPERIENCES } from '../data/teas';
import { Calendar, Clock, Users, CheckCircle, Sparkles, X, MapPin } from 'lucide-react';

interface TastingRoomBookingProps {
  onReserveSuccess?: (booking: ReservationBooking) => void;
}

export const TastingRoomBooking: React.FC<TastingRoomBookingProps> = ({ onReserveSuccess }) => {
  const [selectedExp, setSelectedExp] = useState<TastingExperience>(TASTING_EXPERIENCES[0]);
  const [date, setDate] = useState('2026-10-12');
  const [timeSlot, setTimeSlot] = useState('14:00');
  const [guests, setGuests] = useState(2);
  const [seatingPreference, setSeatingPreference] = useState<'Counter Bar' | 'Tatami Alcove' | 'Zen Garden Pavilion'>('Tatami Alcove');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [activeBookingModal, setActiveBookingModal] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ReservationBooking | null>(null);

  const availableTimes = ['11:00 AM', '1:30 PM', '3:30 PM', '5:30 PM', '7:00 PM'];

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;

    const newBooking: ReservationBooking = {
      bookingId: `CS-${Math.floor(100000 + Math.random() * 900000)}`,
      experience: selectedExp,
      date,
      timeSlot,
      guests,
      seatingPreference,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setConfirmedBooking(newBooking);
    if (onReserveSuccess) onReserveSuccess(newBooking);
  };

  const handleOpenModal = (exp: TastingExperience) => {
    setSelectedExp(exp);
    setActiveBookingModal(true);
    setConfirmedBooking(null);
  };

  return (
    <section id="tasting-room" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="space-y-3 mb-12 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.25em] font-medium text-[#656E5D]">
          The Tasting Salon & Tea Counter
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1B1E19] text-balance">
          Book an Immersive Tea Flight & Ceremony
        </h2>
        <p className="text-sm sm:text-base text-[#595E54] leading-relaxed">
          Escape city rush into our tranquil cedar-paneled salon. Every reservation is hosted by an experienced tea sommelier guiding you through water mineralogy, vessel history, and rare vertical vintages.
        </p>
      </div>

      {/* Experience Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {TASTING_EXPERIENCES.map((exp) => {
          return (
            <div
              key={exp.id}
              className="bg-white rounded-sm border border-[#E4E0D5] p-7 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#6F7668]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {exp.duration}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Users className="w-3.5 h-3.5" />
                    Max {exp.maxGuests} Guests
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#1A1F18] leading-snug">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-[#82887A] font-medium uppercase tracking-wider mt-1">
                    {exp.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#52574D] leading-relaxed">
                  {exp.description}
                </p>

                {/* Highlights List (Unboxed Clean Prose) */}
                <div className="pt-2 space-y-2 border-t border-[#EFECE5]">
                  <span className="text-[11px] uppercase tracking-wider text-[#7A8173] font-medium block">
                    Experience Inclusions
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#464B40]">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#3A5D44] font-bold">·</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Booking Button */}
              <div className="pt-6 mt-6 border-t border-[#EFECE5] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#7A8173] uppercase tracking-wider">Per Guest</div>
                  <div className="font-serif text-2xl text-[#1E231D] font-mono tabular-nums">
                    ${exp.pricePerGuest}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenModal(exp)}
                  className="px-4 py-2.5 bg-[#2D4234] hover:bg-[#223328] text-white text-xs uppercase tracking-wider font-medium rounded-sm transition-colors"
                >
                  Reserve Table
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Modal Overlay */}
      {activeBookingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
          onClick={() => setActiveBookingModal(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#FCFAF7] rounded-sm shadow-2xl border border-[#DED8CC] p-6 sm:p-8 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveBookingModal(false)}
              className="absolute top-4 right-4 p-2 text-[#565C50] hover:text-[#181C16] transition-colors"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>

            {confirmedBooking ? (
              /* Booking Success Card */
              <div className="text-center py-6 space-y-4">
                <CheckCircle className="w-12 h-12 text-[#3A5D44] mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-serif text-3xl text-[#1B1F18]">
                    Reservation Confirmed
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#697062]">
                    Reference ID: <span className="font-mono font-bold text-[#1C201A]">{confirmedBooking.bookingId}</span>
                  </p>
                </div>

                <div className="bg-[#F3EFE7] p-5 rounded-sm border border-[#E2DDD0] max-w-md mx-auto text-left text-xs space-y-2 text-[#464C40]">
                  <div className="flex justify-between">
                    <span className="text-[#767E70]">Experience:</span>
                    <span className="font-semibold text-[#1F241C]">{confirmedBooking.experience.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#767E70]">Date & Time:</span>
                    <span className="font-semibold text-[#1F241C]">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#767E70]">Party Size:</span>
                    <span className="font-semibold text-[#1F241C]">{confirmedBooking.guests} Guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#767E70]">Seating Area:</span>
                    <span className="font-semibold text-[#1F241C]">{confirmedBooking.seatingPreference}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#DED8CB] pt-2">
                    <span className="text-[#767E70]">Guest:</span>
                    <span className="font-semibold text-[#1F241C]">{confirmedBooking.guestName} ({confirmedBooking.guestEmail})</span>
                  </div>
                </div>

                <p className="text-xs text-[#6B7264] max-w-md mx-auto">
                  A confirmation invitation has been prepared. Please arrive 10 minutes prior to your time slot so our tea master may welcome you.
                </p>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => setActiveBookingModal(false)}
                    className="px-6 py-2.5 bg-[#2D4234] text-white text-xs uppercase tracking-wider font-medium rounded-sm"
                  >
                    Done & Return to Atelier
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmitReservation} className="space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#6B7264] font-medium">
                    Tasting Room Reservation
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1B1F18] mt-1">
                    {selectedExp.title}
                  </h3>
                  <p className="text-xs text-[#60665A] mt-1">
                    ${selectedExp.pricePerGuest} per guest · {selectedExp.duration} · Max {selectedExp.maxGuests} guests
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date Input */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#686E61] block mb-1 font-medium">
                      Reservation Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-white border border-[#DDD7CC] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                    />
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#686E61] block mb-1 font-medium">
                      Time Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-white border border-[#DDD7CC] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                    >
                      {availableTimes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Party Size */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#686E61] block mb-1 font-medium">
                      Number of Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-white border border-[#DDD7CC] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                    >
                      {Array.from({ length: selectedExp.maxGuests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'} (${n * selectedExp.pricePerGuest})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Seating Preference */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#686E61] block mb-1 font-medium">
                      Seating Ambience
                    </label>
                    <select
                      value={seatingPreference}
                      onChange={(e) => setSeatingPreference(e.target.value as any)}
                      className="w-full bg-white border border-[#DDD7CC] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                    >
                      <option value="Tatami Alcove">Tatami Alcove (Traditional Mats)</option>
                      <option value="Counter Bar">Counter Bar (Direct Master View)</option>
                      <option value="Zen Garden Pavilion">Zen Garden Pavilion (Courtyard)</option>
                    </select>
                  </div>
                </div>

                {/* Guest Contact Information */}
                <div className="space-y-3 pt-2 border-t border-[#EAE5D9]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#686E61] block mb-1 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lady Katherine Vance"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-white border border-[#DDD7CC] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#686E61] block mb-1 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. katherine@vance.co"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-white border border-[#DDD7CC] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#686E61] block mb-1 font-medium">
                      Phone Number (for SMS reminder)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 234-8901"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-white border border-[#DDD7CC] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#686E61] block mb-1 font-medium">
                      Dietary or Sensory Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Prefer caffeine-free late evening, vegan sweets"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-white border border-[#DDD7CC] rounded-sm px-3 py-2 text-xs text-[#2A2F25] focus:outline-none focus:border-[#2D4234]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EAE5D9] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-[#787F72] uppercase tracking-wider">Total Flight Cost</div>
                    <div className="font-serif text-2xl font-mono tabular-nums text-[#1D221A]">
                      ${selectedExp.pricePerGuest * guests}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#2D4234] hover:bg-[#203125] text-white text-xs uppercase tracking-widest font-medium rounded-sm shadow-sm transition-colors"
                  >
                    Confirm Tasting Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
