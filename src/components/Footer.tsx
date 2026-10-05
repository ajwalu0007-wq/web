import React, { useState } from 'react';
import { Mail, CheckCircle2, MapPin, Clock, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="visit" className="bg-[#1A1F18] text-[#D8DDD3] border-t border-[#2A3326]">
      {/* Atelier Visit & Hours Info Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#2C3627]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8F9D8B] font-medium">
              <MapPin className="w-4 h-4 text-[#A7BAA2]" />
              <span>Flagship Atelier & Salon</span>
            </div>
            <p className="font-serif text-xl text-[#F3F6EF]">
              412 Pine Street, Zen Alcove
            </p>
            <p className="text-xs text-[#9AA596] leading-relaxed">
              Seattle, WA 98101 · Corner of 4th & Pine<br />
              Complimentary valet tea ceremony parking available.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8F9D8B] font-medium">
              <Clock className="w-4 h-4 text-[#A7BAA2]" />
              <span>Tea Bar & Tasting Hours</span>
            </div>
            <p className="font-serif text-xl text-[#F3F6EF]">
              Tue – Sun: 10:00 AM – 7:30 PM
            </p>
            <p className="text-xs text-[#9AA596] leading-relaxed">
              Walk-in cup service welcome daily.<br />
              Private Gongfu Flights & Chanoyu require advance booking.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8F9D8B] font-medium">
              <Phone className="w-4 h-4 text-[#A7BAA2]" />
              <span>Sommelier Inquiries</span>
            </div>
            <p className="font-serif text-xl text-[#F3F6EF]">
              +1 (206) 555-0198
            </p>
            <p className="text-xs text-[#9AA596] leading-relaxed">
              concierge@camelliaandstone.com<br />
              Wholesale tea service & bespoke corporate gifting available.
            </p>
          </div>

        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Philosophy */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] font-medium uppercase text-[#F2F5ED] block">
              Camellia & Stone
            </span>
            <p className="text-xs text-[#98A394] leading-relaxed max-w-sm">
              An independent tea atelier committed to single-cultivar biodiversity, ancestral roasting traditions, and the meditative quietude of whole leaf tea.
            </p>
            <div className="text-[11px] text-[#788373] tracking-wide">
              Direct-Trade Certified · Kyoto & Wuyi Sourcing
            </div>
          </div>

          {/* Quick Nav 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#B1BEAC]">
              Tea Cellar
            </div>
            <ul className="space-y-2 text-xs text-[#98A394]">
              <li><a href="#catalog" className="hover:text-white transition-colors">Ceremonial Matcha</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Wuyi Rock Oolong</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Traditional Gyokuro</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Vintage Aged Pu-erh</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Spring First Flush</a></li>
            </ul>
          </div>

          {/* Quick Nav 2 */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#B1BEAC]">
              Experiences
            </div>
            <ul className="space-y-2 text-xs text-[#98A394]">
              <li><a href="#tasting-room" className="hover:text-white transition-colors">Gongfu Flight Booking</a></li>
              <li><a href="#tasting-room" className="hover:text-white transition-colors">Chanoyu Whisking Atelier</a></li>
              <li><a href="#brewing-guide" className="hover:text-white transition-colors">Interactive Steeper</a></li>
              <li><a href="#terroir" className="hover:text-white transition-colors">Garden Terroirs</a></li>
              <li><a href="#visit" className="hover:text-white transition-colors">Private Cellar Vault</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#B1BEAC]">
              Seasonal Harvest Allocations
            </div>
            <p className="text-xs text-[#98A394] leading-relaxed">
              Subscribers receive 48-hour early allocation access to vernal first flush picks and rare vintage cake releases.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#263123] border border-[#3C4E37] rounded-sm text-xs text-[#A8C7A2] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A8C7A2]" />
                <span>You are on the private allocation list. Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-[#232B20] border border-[#3A4535] rounded-sm px-3.5 py-2 text-xs text-[#F2F5ED] placeholder:text-[#6C7767] focus:outline-none focus:border-[#7A9973]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3A5037] hover:bg-[#466343] text-white text-xs uppercase tracking-wider font-medium rounded-sm transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Quiet Bottom Notice */}
        <div className="mt-14 pt-8 border-t border-[#263022] flex flex-col sm:flex-row items-center justify-between text-xs text-[#737F6F]">
          <div>
            © {new Date().getFullYear()} Camellia & Stone Tea Atelier. All rights reserved.
          </div>
          <div className="flex gap-6 mt-3 sm:mt-0">
            <a href="#" className="hover:text-[#A7BAA2] transition-colors">Origin Traceability</a>
            <a href="#" className="hover:text-[#A7BAA2] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#A7BAA2] transition-colors">Terms of Harvest</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
