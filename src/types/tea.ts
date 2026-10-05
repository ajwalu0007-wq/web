export type TeaCategory = 'all' | 'matcha' | 'oolong' | 'green' | 'white' | 'puerh' | 'tisane';

export type CaffeineLevel = 'caffeine-free' | 'low' | 'moderate' | 'high';

export interface TeaWeightOption {
  label: string;
  weightGrams: number;
  price: number;
  inStock: boolean;
}

export interface BrewingSpec {
  waterTempC: number;
  waterTempF: number;
  leafWeightGrams: number;
  waterVolumeMl: number;
  recommendedVessel: string;
  steepTimesSec: number[];
  aromaNotes: string;
  advice: string;
}

export interface TeaItem {
  id: string;
  name: string;
  nativeName?: string;
  category: TeaCategory;
  categoryLabel: string;
  cultivar: string;
  origin: string;
  elevation: string;
  harvest: string;
  caffeine: CaffeineLevel;
  flavorNotes: string[];
  description: string;
  curatorNotes: string;
  image: string;
  weightOptions: TeaWeightOption[];
  brewing: BrewingSpec;
  isFeatured?: boolean;
  statusKicker?: string;
}

export interface CartItem {
  id: string; // unique item composite key
  tea: TeaItem;
  selectedWeight: TeaWeightOption;
  quantity: number;
  packaging: 'tin-caddy' | 'pouch';
}

export interface TastingExperience {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  pricePerGuest: number;
  description: string;
  highlights: string[];
  maxGuests: number;
}

export interface ReservationBooking {
  bookingId: string;
  experience: TastingExperience;
  date: string;
  timeSlot: string;
  guests: number;
  seatingPreference: 'Counter Bar' | 'Tatami Alcove' | 'Zen Garden Pavilion';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  createdAt: string;
}
