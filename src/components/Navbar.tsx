import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
  onSelectCategory: (category: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F9F8F5]/95 backdrop-blur-md border-b border-[#E8E4DA] transition-all">
      {/* Promotion / Announcement Ribbon */}
      <div className="bg-[#2D4234] text-[#E7EBDD] text-xs py-1.5 px-4 text-center tracking-wide font-normal">
        <span>Spring 2026 First Harvest (Ichibancha) has arrived from Uji & Fujian · Complimentary worldwide shipping over $75</span>
      </div>

      {/* Main One-Row Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single Text Wordmark Brand Element */}
        <a 
          href="#" 
          className="font-serif text-2xl font-medium tracking-[0.2em] text-[#1E231D] hover:opacity-85 transition-opacity uppercase"
        >
          Camellia & Stone
        </a>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wider uppercase font-medium text-[#50544C]">
          <a
            href="#catalog"
            className="hover:text-[#1E231D] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#2D4234] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Tea Collection
          </a>
          <a
            href="#tasting-room"
            className="hover:text-[#1E231D] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#2D4234] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Tasting Room
          </a>
          <a
            href="#brewing-guide"
            className="hover:text-[#1E231D] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#2D4234] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Gongfu Steeper
          </a>
          <a
            href="#terroir"
            className="hover:text-[#1E231D] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#2D4234] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Terroir & Gardens
          </a>
          <a
            href="#visit"
            className="hover:text-[#1E231D] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#2D4234] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Atelier Hours
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium tracking-wider uppercase text-[#2D4234] border border-[#2D4234]/30 hover:border-[#2D4234] hover:bg-[#2D4234]/5 rounded-sm transition-colors whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Flight</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View Shopping Bag"
            className="relative p-2 text-[#242622] hover:text-[#2D4234] transition-colors flex items-center gap-1.5"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            <span className="text-xs font-medium tabular-nums font-mono">
              ({cartCount})
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#242622] hover:text-[#2D4234] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F9F8F5] border-b border-[#E8E4DA] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm tracking-wider uppercase font-medium text-[#41453E]">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#1E231D] py-1 border-b border-[#ECE8DF]"
            >
              Tea Collection
            </a>
            <a
              href="#tasting-room"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#1E231D] py-1 border-b border-[#ECE8DF]"
            >
              Tasting Room Experience
            </a>
            <a
              href="#brewing-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#1E231D] py-1 border-b border-[#ECE8DF]"
            >
              Interactive Steeper & Ritual
            </a>
            <a
              href="#terroir"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#1E231D] py-1 border-b border-[#ECE8DF]"
            >
              Terroir & Craft
            </a>
            <a
              href="#visit"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#1E231D] py-1 border-b border-[#ECE8DF]"
            >
              Visit The Atelier
            </a>
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 bg-[#2D4234] text-white text-xs font-medium tracking-wider uppercase rounded-sm text-center"
            >
              Reserve Tasting Room Flight
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
