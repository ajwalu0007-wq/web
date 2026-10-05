import { TeaItem, TastingExperience } from '../types/tea';

import ceremonialMatchaImg from '../assets/images/product_ceremonial_matcha_1791194424798.jpg';
import wuyiOolongImg from '../assets/images/product_wuyi_oolong_leaves_1791194438806.jpg';
import silverNeedleImg from '../assets/images/product_jasmine_silver_needle_1791194449761.jpg';
import heroTeahouseImg from '../assets/images/hero_teahouse_ceremony_1791194410924.jpg';

export { heroTeahouseImg };

export const TEA_CATALOG: TeaItem[] = [
  {
    id: 'ceremonial-matcha-samidori',
    name: 'Uji Pinnacle Ceremonial Matcha',
    nativeName: '宇治 さみどり 抹茶',
    category: 'matcha',
    categoryLabel: 'Ceremonial Matcha',
    cultivar: 'Single Cultivar Samidori (さみどり)',
    origin: 'Shirakawa, Uji, Kyoto Prefecture, Japan',
    elevation: '120m — Shaded for 28 Days',
    harvest: 'First Flush (Ichibancha), Spring 2026',
    caffeine: 'high',
    flavorNotes: ['Sweet Umami', 'Pistachio Cream', 'Fresh Cut Clover', 'Marine Kelp'],
    description: 'Ground slowly on granite mills at four rotations per minute. This single-cultivar Samidori yields a vivid jade emulsion with profound natural sweetness, velvety micro-froth, and zero astringency.',
    curatorNotes: 'Sourced from a 5th-generation tencha farm along the Uji River. Best prepared as Usucha or Koicha with water at 75°C using an 80-tine takayama chasen.',
    image: ceremonialMatchaImg,
    isFeatured: true,
    statusKicker: 'First Harvest 2026',
    weightOptions: [
      { label: '30g Ceremonial Washi Tin', weightGrams: 30, price: 44, inStock: true },
      { label: '100g Vacuum Foil Refill', weightGrams: 100, price: 118, inStock: true }
    ],
    brewing: {
      waterTempC: 75,
      waterTempF: 167,
      leafWeightGrams: 2,
      waterVolumeMl: 70,
      recommendedVessel: 'Chawan Bowl & Bamboo Chasen',
      steepTimesSec: [15],
      aromaNotes: 'Roasted pine nuts, freshly milled grain, sweet spring grass',
      advice: 'Sift 2 bamboo scoops (2g) into warm chawan. Pour 70ml water at 75°C and whisk briskly in a W-pattern until uniform froth forms.'
    }
  },
  {
    id: 'wuyi-da-hong-pao-reserve',
    name: 'Wuyi Cliff Da Hong Pao Rock Oolong',
    nativeName: '武夷 大红袍 正岩',
    category: 'oolong',
    categoryLabel: 'Rock Oolong (Yancha)',
    cultivar: 'Wild Rock Clones (Zhengyan)',
    origin: 'Huiyuan Pit, Wuyi Mountains, Fujian, China',
    elevation: '720m — Weathered Sandstone Clifts',
    harvest: 'Traditional Charcoal Roast, Autumn Reserve',
    caffeine: 'moderate',
    flavorNotes: ['Charcoal Mineral', 'Dark Orchid', 'Dried Plum', 'Wild Honey'],
    description: 'Born from mineral-drenched sandstone gorges, this legendary rock tea was roasted three separate times over longan-wood charcoal. The liquor glows amber-crimson with lingering petrichor sweetness.',
    curatorNotes: 'Remarkable endurance through 9+ gongfu steepings. Known as Yan Yun (Cliff Rhyme) for its cooling sensation at the back of the palate.',
    image: wuyiOolongImg,
    isFeatured: true,
    statusKicker: 'Master Charcoal Roast',
    weightOptions: [
      { label: '50g Signature Matte Tin', weightGrams: 50, price: 58, inStock: true },
      { label: '100g Airtight Caddy', weightGrams: 100, price: 102, inStock: true },
      { label: '250g Cellar Reserve Pouch', weightGrams: 250, price: 235, inStock: true }
    ],
    brewing: {
      waterTempC: 98,
      waterTempF: 208,
      leafWeightGrams: 6,
      waterVolumeMl: 110,
      recommendedVessel: 'Yixing Clay Pot or Purple Clay Gaiwan',
      steepTimesSec: [20, 25, 35, 50, 75, 110],
      aromaNotes: 'Smoked cedar, caramelized stone fruit, nocturnal orchid',
      advice: 'Awaken leaves with a swift 5-second flash rinse. Pour water at rolling boil to extract the dense mineral bedrock richness.'
    }
  },
  {
    id: 'fuding-silver-needle-jasmine',
    name: 'Fuding Silver Needle & Night Jasmine',
    nativeName: '福鼎 白毫银针 窨花',
    category: 'white',
    categoryLabel: 'Silver Needle White Tea',
    cultivar: 'Fuding Da Hao (Big Hair)',
    origin: 'Taimu Mountain, Fuding, Fujian, China',
    elevation: '850m — Coastal Morning Fog',
    harvest: 'Early Spring Pre-Qingming Buds',
    caffeine: 'low',
    flavorNotes: ['Blooming Jasmine', 'White Peach', 'Mountain Dew', 'Wild Honeysuckle'],
    description: 'Plump spring buds blanketed in silver down, scented over seven consecutive nights with freshly opened midnight jasmine blossoms. Pure, crystalline, and delicately floral without perfume sharpness.',
    curatorNotes: 'Unlike mass-market scented teas, all blossom petals are hand-separated each morning, leaving zero bitterness or tannin bite.',
    image: silverNeedleImg,
    isFeatured: true,
    statusKicker: 'Seven-Night Scenting',
    weightOptions: [
      { label: '40g Glass Cylinder Caddy', weightGrams: 40, price: 46, inStock: true },
      { label: '80g Moisture-Shield Pouch', weightGrams: 80, price: 82, inStock: true }
    ],
    brewing: {
      waterTempC: 85,
      waterTempF: 185,
      leafWeightGrams: 4,
      waterVolumeMl: 130,
      recommendedVessel: 'Clear Glass Gaiwan or Pitcher',
      steepTimesSec: [40, 50, 65, 90, 130],
      aromaNotes: 'Fresh night-blooming jasmine, morning river stone, gentle lychee',
      advice: 'Brew in transparent glass to observe the downy silver needles dance vertically as they unfurl.'
    }
  },
  {
    id: 'alishan-jin-xuan-milk-oolong',
    name: 'Alishan Mountain High Elevation Jin Xuan',
    nativeName: '阿里山 金萱 烏龍',
    category: 'oolong',
    categoryLabel: 'High Mountain Oolong (Gaoshan)',
    cultivar: 'TRES #12 Jin Xuan',
    origin: 'Meishan, Alishan, Chiayi County, Taiwan',
    elevation: '1,450m — Cloud Forest Terroir',
    harvest: 'Hand-Plucked High Mountain Spring',
    caffeine: 'moderate',
    flavorNotes: ['Warm Condensed Milk', 'Gardenia Blossom', 'Sweet Corn Silk', 'Butter Brioche'],
    description: 'Naturally creamy without any added flavorings or oils. High elevation cloud cover stunts leaf growth, concentrating natural amino acids into buttery, silky floral notes with a lingering sweet finish.',
    curatorNotes: 'Tight hand-rolled spheres that unfurl into intact whole three-leaf branchlets. A sublime everyday meditative tea.',
    image: wuyiOolongImg,
    weightOptions: [
      { label: '50g Signature Tin', weightGrams: 50, price: 36, inStock: true },
      { label: '150g Vacuum Foil Pouch', weightGrams: 150, price: 88, inStock: true }
    ],
    brewing: {
      waterTempC: 92,
      waterTempF: 198,
      leafWeightGrams: 7,
      waterVolumeMl: 120,
      recommendedVessel: 'Porcelain Gaiwan',
      steepTimesSec: [30, 30, 45, 60, 90],
      aromaNotes: 'Steamed cream, vanilla orchid, crisp mountain pine breeze',
      advice: 'Allow 30 seconds on the first infusion for the tightly bound pearls to expand and release their creamy lactone essence.'
    }
  },
  {
    id: 'yame-dento-hon-gyokuro',
    name: 'Yame Traditional Dento Hon Gyokuro',
    nativeName: '八女 伝統本玉露',
    category: 'green',
    categoryLabel: 'Shaded Green Tea (Gyokuro)',
    cultivar: 'Saemidori & Kanayamidori',
    origin: 'Kurogi, Yame, Fukuoka Prefecture, Japan',
    elevation: '420m — Valley River Mist',
    harvest: 'Straw-Woven Canopy (Honba Shizu)',
    caffeine: 'high',
    flavorNotes: ['Intense Broth Umami', 'Young Asparagus', 'Nori Seaweed', 'Sweet Steamed Rice'],
    description: 'Shaded under natural straw lattices for 21 days rather than black synthetic cloth. Yields emerald-black needles with thick, savory liqueur that sips like a clarified dashi elixir.',
    curatorNotes: 'Won Ministry of Agriculture Top Honors. The spent leaves are so delicate they can be dressed with ponzu citrus sauce and enjoyed as sashimi.',
    image: ceremonialMatchaImg,
    weightOptions: [
      { label: '50g Master Wood Box & Caddy', weightGrams: 50, price: 68, inStock: true },
      { label: '100g Fresh Harvest Foil', weightGrams: 100, price: 124, inStock: true }
    ],
    brewing: {
      waterTempC: 60,
      waterTempF: 140,
      leafWeightGrams: 5,
      waterVolumeMl: 60,
      recommendedVessel: 'Shiboridashi or Flat Banko Kyusu',
      steepTimesSec: [90, 60, 90, 120],
      aromaNotes: 'Warm marine dew, sweet pea tendrils, clarified botanical broth',
      advice: 'Brew cool at 60°C. Dispense every final golden drop, where the richest savory amino acid crystals dwell.'
    }
  },
  {
    id: 'menghai-raw-puerh-2015',
    name: 'Bulang Mountain Aged Sheng Raw Pu-erh',
    nativeName: '布朗山 古树 生普洱',
    category: 'puerh',
    categoryLabel: 'Aged Raw Pu-erh (Sheng)',
    cultivar: 'Old Tree Camellia Sinensis var. Assamica (300+ yrs)',
    origin: 'Bulang Mountain, Menghai, Xishuangbanna, Yunnan',
    elevation: '1,750m — Ancient Forest Grove',
    harvest: 'Spring 2015 Sun-Dried & Stone-Pressed',
    caffeine: 'high',
    flavorNotes: ['Dried Apricot', 'Ancient Forest Floor', 'Wild Camphor', 'Sweet Herbal Mint'],
    description: 'Aged for over a decade in natural clean storage. The ferocious bitterness of youth has transmuted into radiant amber nectar with profound Qi warmth, soothing throat moisture, and endless energy.',
    curatorNotes: 'Single tree grove harvest. Clean cellar aging ensures zero cellar mustiness, only pure cedar bark and dried orchard fruit.',
    image: wuyiOolongImg,
    weightOptions: [
      { label: '50g Flaked Sample Tin', weightGrams: 50, price: 48, inStock: true },
      { label: '357g Full Stone-Pressed Cake', weightGrams: 357, price: 280, inStock: true }
    ],
    brewing: {
      waterTempC: 100,
      waterTempF: 212,
      leafWeightGrams: 8,
      waterVolumeMl: 120,
      recommendedVessel: 'Zisha Purple Clay Teapot',
      steepTimesSec: [15, 15, 20, 30, 45, 60, 90, 120],
      aromaNotes: 'Aged camphor wood, sun-baked mountain leaves, dark golden resin',
      advice: 'Break gently along natural leaf layers with a tea needle. Flash rinse twice with boiling spring water to wake the aged cake.'
    }
  },
  {
    id: 'osmanthus-golden-dragon-tisane',
    name: 'Guilin Mountain Osmanthus & Wild Mint',
    nativeName: '桂林 金桂 薄荷 花草茶',
    category: 'tisane',
    categoryLabel: 'Botanical Tisane',
    cultivar: 'Heritage Sweet Osmanthus Fragrans',
    origin: 'Karst Valley, Guilin, Guangxi, China',
    elevation: '350m — Karst Limestone Soil',
    harvest: 'Autumn Dawn Blossom Harvest',
    caffeine: 'caffeine-free',
    flavorNotes: ['Ripe Apricot Bloom', 'Crisp Spearmint', 'Golden Amber', 'Citrus Blossom'],
    description: 'Sun-dried golden osmanthus florets intertwined with wild native peppermint leaves and dried chrysanthemum buds. Completely caffeine-free, offering soothing respiratory comfort and floral euphoria.',
    curatorNotes: 'Blended by hand in small 5kg micro-batches to preserve delicate petal integrity.',
    image: silverNeedleImg,
    weightOptions: [
      { label: '45g Glass Jar with Cork Seal', weightGrams: 45, price: 28, inStock: true },
      { label: '100g Compostable Refill Pouch', weightGrams: 100, price: 52, inStock: true }
    ],
    brewing: {
      waterTempC: 95,
      waterTempF: 203,
      leafWeightGrams: 3,
      waterVolumeMl: 250,
      recommendedVessel: 'Glass Pitcher or French Press',
      steepTimesSec: [180],
      aromaNotes: 'Intense fresh apricot marmalade, sweet honeyed air, cooling mint breeze',
      advice: 'Steep freely for 3-4 minutes. Wonderful served hot in ceramic cups or chilled overnight over ice.'
    }
  },
  {
    id: 'makaibari-himalayan-darjeeling',
    name: 'Makaibari Estate First Flush Darjeeling',
    nativeName: 'マカイバリ 聖なる春摘み',
    category: 'green',
    categoryLabel: 'Himalayan Spring Flush',
    cultivar: 'FTGFOP1 Heritage China Bush',
    origin: 'Kurseong Valley, Darjeeling, West Bengal, India',
    elevation: '1,500m — Himalayan Cloudline',
    harvest: 'Vernal Equinox First Harvest 2026',
    caffeine: 'moderate',
    flavorNotes: ['Muscatel Grape', 'Alpine Meadow Grass', 'Grapefruit Zest', 'Crisp Walnut'],
    description: 'Harvested during the first spring sunshine beneath the Kanchenjunga peaks. Bright champagne-hued cup bursting with iconic muscatel notes, lively briskness, and clean mineral finish.',
    curatorNotes: '100% Biodynamic Demeter certified estate. One of the oldest working tea gardens in the world.',
    image: silverNeedleImg,
    weightOptions: [
      { label: '50g Signature Caddy', weightGrams: 50, price: 38, inStock: true },
      { label: '120g Vacuum Foil Pouch', weightGrams: 120, price: 76, inStock: true }
    ],
    brewing: {
      waterTempC: 88,
      waterTempF: 190,
      leafWeightGrams: 3,
      waterVolumeMl: 200,
      recommendedVessel: 'Porcelain Tasting Cup or Glass Teapot',
      steepTimesSec: [150, 180, 240],
      aromaNotes: 'Muscat grapes, crushed mint, mountain wildflowers',
      advice: 'Keep steep times precise to preserve sparkling floral top-notes without extracting excess tannins.'
    }
  }
];

export const TASTING_EXPERIENCES: TastingExperience[] = [
  {
    id: 'gongfu-flight',
    title: 'Seasonal Gongfu Flight & Terroir Study',
    subtitle: 'Table Service for Connoisseurs & Curious Palates',
    duration: '75 Minutes',
    pricePerGuest: 55,
    maxGuests: 4,
    description: 'An intimate, guided ritual through four hand-selected single-origin teas: high mountain oolong, aged raw pu-erh, and rare cliff rock teas. Steeped in authentic purple clay zisha pots with traditional aroma cups.',
    highlights: [
      'Four flight courses across 16+ total steeping rounds',
      'Handcrafted seasonal wagashi confections from Kyoto',
      'Custom tasting notes journal to record sensory impressions',
      '15% credit toward any loose-leaf purchase on your visit day'
    ]
  },
  {
    id: 'ceremonial-matcha-ritual',
    title: 'Chanoyu & Ceremonial Matcha Atelier',
    subtitle: 'Mindful Whisking, Philosophy & Sweets',
    duration: '60 Minutes',
    pricePerGuest: 65,
    maxGuests: 6,
    description: 'Step into our quiet tatami alcove for a modern interpretation of the classical Japanese tea ceremony. Learn traditional bowl etiquette, whisking micro-bubbles, and savor both rich Koicha (thick paste) and Usucha (frothy tea).',
    highlights: [
      'Comparative tasting of two single-cultivar Uji first-flush matchas',
      'Hands-on guidance with artisanal Takayama chasen whisks',
      'Artisanal nerikiri bean paste sweet sculpted in seasonal motifs',
      'Complimentary mini chasen whisk to take home'
    ]
  },
  {
    id: 'sommelier-cellar-pairing',
    title: 'Master Sommelier Reserve Cellar Experience',
    subtitle: 'Private Sanctuary & Vintage Library',
    duration: '90 Minutes',
    pricePerGuest: 95,
    maxGuests: 4,
    description: 'An exclusive vertical tasting featuring rare vintage pu-erh cakes from our climate-controlled humidity vault and limited competition-grade Taiwanese oolongs with our head tea master.',
    highlights: [
      'Access to archived vintages dating back to 2004',
      'Mineral water curation: comparison of three spring water profiles',
      'Savoury tea-infused delicacies & aged smoked persimmon',
      'Direct dialogue on terroir, processing chemistry, and aging chemistry'
    ]
  }
];
