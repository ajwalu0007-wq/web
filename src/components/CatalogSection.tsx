import React, { useState, useMemo } from 'react';
import { TeaItem, TeaCategory, CaffeineLevel } from '../types/tea';
import { Search, Eye, Plus, Check, SlidersHorizontal, Sparkles } from 'lucide-react';

interface CatalogSectionProps {
  teas: TeaItem[];
  onSelectTea: (tea: TeaItem) => void;
  onQuickAdd: (tea: TeaItem) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  teas,
  onSelectTea,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TeaCategory>('all');
  const [selectedCaffeine, setSelectedCaffeine] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('all');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories: { key: TeaCategory; label: string }[] = [
    { key: 'all', label: 'All Terroirs' },
    { key: 'matcha', label: 'Ceremonial Matcha' },
    { key: 'oolong', label: 'Rock & High Mountain Oolong' },
    { key: 'green', label: 'Gyokuro & Green' },
    { key: 'white', label: 'Silver Needle & White' },
    { key: 'puerh', label: 'Vintage Pu-erh' },
    { key: 'tisane', label: 'Botanical Tisanes' },
  ];

  const flavorTags = [
    'all',
    'Sweet Umami',
    'Charcoal Mineral',
    'Blooming Jasmine',
    'Warm Condensed Milk',
    'Intense Broth Umami',
    'Dried Apricot',
    'Muscatel Grape',
  ];

  const filteredTeas = useMemo(() => {
    return teas.filter((tea) => {
      // Category filter
      if (selectedCategory !== 'all' && tea.category !== selectedCategory) {
        return false;
      }
      // Caffeine filter
      if (selectedCaffeine !== 'all' && tea.caffeine !== selectedCaffeine) {
        return false;
      }
      // Flavor filter
      if (selectedFlavor !== 'all' && !tea.flavorNotes.some((f) => f.toLowerCase() === selectedFlavor.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = tea.name.toLowerCase().includes(query);
        const matchesOrigin = tea.origin.toLowerCase().includes(query);
        const matchesCultivar = tea.cultivar.toLowerCase().includes(query);
        const matchesFlavors = tea.flavorNotes.some((f) => f.toLowerCase().includes(query));
        return matchesName || matchesOrigin || matchesCultivar || matchesFlavors;
      }
      return true;
    });
  }, [teas, selectedCategory, selectedCaffeine, selectedFlavor, searchQuery]);

  const handleQuickAdd = (e: React.MouseEvent, tea: TeaItem) => {
    e.stopPropagation();
    onQuickAdd(tea);
    setAddedAnimationId(tea.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Section Header */}
      <div className="space-y-3 mb-10 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.25em] font-medium text-[#656E5D]">
          The Seasonal Cellar & Leaf Archive
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1B1E19] text-balance">
          Rare Single-Cultivar Harvesters & Reserve Teas
        </h2>
        <p className="text-sm sm:text-base text-[#595E54] leading-relaxed">
          Every harvest is verified for terroir elevation, tree age, and traditional craftsmanship. Unblended, single-estate leaves packaged directly at origin in oxygen-barrier airtight caddies.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-5 mb-10 pb-6 border-b border-[#E8E4DA]">
        {/* Category Tabs (Segmented Button Controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 text-xs uppercase tracking-wider font-medium rounded-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#2D4234] text-[#F9F8F5]'
                    : 'bg-[#F0EEE8] text-[#555A50] hover:bg-[#E5E2DA] hover:text-[#1E231D]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Row: Search & Specific Flavor / Caffeine Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#82887C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by garden, cultivar, notes (e.g. Uji, Umami, Wuyi, Jasmine)..."
              className="w-full bg-[#FFFFFF] border border-[#DDD9CE] rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#242622] placeholder:text-[#8D9287] focus:outline-none focus:border-[#2D4234] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7A8074] hover:text-[#242622]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Flavor Profile Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#DDD9CE] rounded-sm px-3 py-2.5 text-xs text-[#333830] focus:outline-none focus:border-[#2D4234]"
            >
              <option value="all">Tasting Note: All Profiles</option>
              {flavorTags.filter((f) => f !== 'all').map((note) => (
                <option key={note} value={note}>
                  Note: {note}
                </option>
              ))}
            </select>
          </div>

          {/* Caffeine Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedCaffeine}
              onChange={(e) => setSelectedCaffeine(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#DDD9CE] rounded-sm px-3 py-2.5 text-xs text-[#333830] focus:outline-none focus:border-[#2D4234]"
            >
              <option value="all">Caffeine: All Levels</option>
              <option value="caffeine-free">Caffeine-Free (Tisanes)</option>
              <option value="low">Low Caffeine</option>
              <option value="moderate">Moderate Caffeine</option>
              <option value="high">High Caffeine (Matcha / Sheng)</option>
            </select>
          </div>
        </div>

        {/* Active Results Metric & Reset */}
        <div className="flex items-center justify-between text-xs text-[#6B7165]">
          <div>
            Showing <span className="font-mono tabular-nums font-semibold text-[#1E231D]">{filteredTeas.length}</span> curated teas
            {selectedCategory !== 'all' && (
              <span> in {categories.find((c) => c.key === selectedCategory)?.label}</span>
            )}
          </div>

          {(selectedCategory !== 'all' || selectedCaffeine !== 'all' || selectedFlavor !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedCaffeine('all');
                setSelectedFlavor('all');
                setSearchQuery('');
              }}
              className="text-[#2D4234] hover:underline font-medium uppercase tracking-wider text-[11px]"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Product Cards Grid: 3-column desktop layout adhering to E-commerce spec */}
      {filteredTeas.length === 0 ? (
        <div className="py-20 text-center bg-[#F4F1EA] rounded-sm border border-[#E5E0D5] p-8">
          <p className="font-serif text-2xl text-[#2B3028] mb-2">No teas match this query</p>
          <p className="text-sm text-[#676D61] max-w-md mx-auto mb-6">
            We curate limited seasonal micro-batches. Try resetting your filters to explore our full cellar harvest.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedCaffeine('all');
              setSelectedFlavor('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 bg-[#2D4234] text-white text-xs uppercase tracking-wider font-medium rounded-sm"
          >
            Show All Teas
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeas.map((tea) => {
            const startingPrice = tea.weightOptions[0]?.price ?? 38;
            const startingWeight = tea.weightOptions[0]?.label ?? '50g Caddy';
            const isJustAdded = addedAnimationId === tea.id;

            return (
              <div
                key={tea.id}
                onClick={() => onSelectTea(tea)}
                className="group cursor-pointer bg-white rounded-sm border border-[#E6E2D8] hover:border-[#C8C2B3] transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Product Card Media Slot (65-75% visual weight, neutral backdrop) */}
                <div className="relative aspect-[4/3] bg-[#F4F2EC] overflow-hidden">
                  <img
                    src={tea.image}
                    alt={tea.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Single subtle text tag if present (NO pill badge clusters) */}
                  {tea.statusKicker && (
                    <div className="absolute top-3 left-3 bg-[#1F251E]/80 backdrop-blur-xs text-[#F2F4EE] text-[11px] uppercase tracking-widest px-2.5 py-1 font-medium rounded-xs">
                      {tea.statusKicker}
                    </div>
                  )}

                  {/* Hover Quick Action Layer */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/95 text-[#1E231D] text-xs uppercase tracking-wider font-medium rounded-sm shadow-sm">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details & Tasting</span>
                    </span>
                  </div>
                </div>

                {/* Content & Metadata Area */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-[#737A6D] uppercase tracking-wider mb-1.5">
                      <span>{tea.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{tea.origin.split(',')[0]}</span>
                    </div>

                    {/* Product Name in Cormorant Garamond / Serif */}
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1A1E18] group-hover:text-[#2D4234] transition-colors leading-snug">
                      {tea.name}
                    </h3>
                    
                    {tea.nativeName && (
                      <p className="text-xs text-[#898F82] font-normal tracking-wide mt-0.5">
                        {tea.nativeName}
                      </p>
                    )}

                    {/* Terroir Snapshot */}
                    <p className="text-xs text-[#5C6156] mt-2.5 line-clamp-2 leading-relaxed font-normal">
                      {tea.description}
                    </p>

                    {/* Flavor Notes (Unboxed subtle text list) */}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-[#4F5649]">
                      <span className="text-[#848B7D] font-medium text-[11px] uppercase tracking-wider">Notes:</span>
                      {tea.flavorNotes.slice(0, 3).map((note, idx) => (
                        <span key={note} className="text-[#3A4035]">
                          {note}{idx < 2 ? ' ·' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Module */}
                  <div className="pt-4 border-t border-[#EFECE5] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-[#7C8276] uppercase tracking-wider">
                        From ({startingWeight})
                      </div>
                      <div className="font-serif text-2xl text-[#1E231D] font-medium font-mono tabular-nums">
                        ${startingPrice.toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(e, tea)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-all ${
                        isJustAdded
                          ? 'bg-[#3A5D44] text-white'
                          : 'bg-[#F2EFE9] text-[#242921] hover:bg-[#2D4234] hover:text-white'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Quick Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
