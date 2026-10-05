import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { GongfuSteepingTimer } from './components/GongfuSteepingTimer';
import { TastingRoomBooking } from './components/TastingRoomBooking';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TerroirStory } from './components/TerroirStory';
import { Footer } from './components/Footer';
import { TEA_CATALOG } from './data/teas';
import { TeaItem, TeaWeightOption, CartItem } from './types/tea';

export default function App() {
  const [teas] = useState<TeaItem[]>(TEA_CATALOG);
  const [selectedTeaForModal, setSelectedTeaForModal] = useState<TeaItem | null>(null);
  const [selectedTeaForSteeper, setSelectedTeaForSteeper] = useState<TeaItem>(TEA_CATALOG[0]);
  
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('camellia_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('camellia_cart', JSON.stringify(cartItems));
    } catch {
      // Storage unavailable or disabled
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (
    tea: TeaItem,
    weight: TeaWeightOption,
    quantity: number = 1,
    packaging: 'tin-caddy' | 'pouch' = 'tin-caddy'
  ) => {
    const compositeId = `${tea.id}-${weight.weightGrams}-${packaging}`;
    
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === compositeId);
      if (existing) {
        return prev.map((item) =>
          item.id === compositeId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: compositeId,
          tea,
          selectedWeight: weight,
          quantity,
          packaging
        }
      ];
    });

    showToast(`Added ${quantity}× ${tea.name} to your tea bag`);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (tea: TeaItem) => {
    const defaultWeight = tea.weightOptions[0];
    handleAddToCart(tea, defaultWeight, 1, 'tin-caddy');
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLaunchSteeper = (tea: TeaItem) => {
    setSelectedTeaForSteeper(tea);
    const element = document.getElementById('brewing-guide');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F5] text-[#242622] selection:bg-[#2D4234] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1D221B] text-[#F3F6EF] text-xs px-4 py-3 rounded-sm shadow-xl border border-[#3A4537] flex items-center gap-2 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#4E7D56]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => handleScrollToSection('tasting-room')}
        onSelectCategory={() => handleScrollToSection('catalog')}
        activeSection="home"
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCollection={() => handleScrollToSection('catalog')}
          onOpenBooking={() => handleScrollToSection('tasting-room')}
        />

        {/* Featured Tea Catalog */}
        <CatalogSection
          teas={teas}
          onSelectTea={(tea) => setSelectedTeaForModal(tea)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Interactive Gongfu Steeper Companion */}
        <GongfuSteepingTimer
          teas={teas}
          selectedTea={selectedTeaForSteeper}
          onSelectTea={(tea) => setSelectedTeaForSteeper(tea)}
        />

        {/* Tasting Room & Flight Reservations */}
        <TastingRoomBooking
          onReserveSuccess={(booking) => {
            showToast(`Reservation ${booking.bookingId} confirmed for ${booking.date}`);
          }}
        />

        {/* Terroir & Garden Lineage */}
        <TerroirStory />
      </main>

      {/* Footer & Atelier Hours */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        tea={selectedTeaForModal}
        onClose={() => setSelectedTeaForModal(null)}
        onAddToCart={handleAddToCart}
        onLaunchSteeper={handleLaunchSteeper}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
          showToast('Harvest order received and being prepared');
        }}
      />
    </div>
  );
}
