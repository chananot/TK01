export type Product = {
  id: string;
  index: string;
  use: "Road" | "Trail" | "Training";
  name: string;
  category: string;
  detail: string;
  price: number;
  tone: "volt" | "ink" | "clay";
  colors: string[];
  rating: number;
  reviews: number;
  stock: "In stock" | "Low stock" | "Out of stock";
  sizes: string[];
  specs: Record<string, string>;
  imageAlt: string;
  gallery: string[];
};

export type Review = {
  quote: string;
  author: string;
  location: string;
  rating: number;
};

export type CartItem = { product: Product; color: string; size: string; quantity: number };

export const products: Product[] = [
  {
    id: "aeroflow-01",
    index: "01",
    use: "Road",
    name: "Aeroflow 01",
    category: "Neutral road running",
    detail: "Responsive daily trainer",
    price: 6490,
    tone: "volt",
    colors: ["Volt", "Bone", "Black"],
    rating: 4.8,
    reviews: 128,
    stock: "In stock",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    specs: {
      Weight: "252 g",
      "Heel-to-toe drop": "8 mm",
      Surface: "Road",
      Cushioning: "High-response nitrogen foam",
      Support: "Neutral with locked midfoot cradle",
      "Intended use": "Daily miles, tempo runs, half marathon training",
    },
    imageAlt: "Black, cream, and neon green Velocity Aeroflow 01 road running shoe",
    gallery: ["/velocity-shoe.png", "aeroflow-sole", "aeroflow-knit"],
  },
  {
    id: "terra-shift",
    index: "02",
    use: "Trail",
    name: "Terra Shift",
    category: "Technical trail running",
    detail: "All-terrain grip",
    price: 6990,
    tone: "ink",
    colors: ["Black", "Moss", "Volt"],
    rating: 4.7,
    reviews: 94,
    stock: "Low stock",
    sizes: ["US 7", "US 8", "US 9", "US 10"],
    specs: {
      Weight: "286 g",
      "Heel-to-toe drop": "6 mm",
      Surface: "Trail and mixed terrain",
      Cushioning: "Protective dual-density foam",
      Support: "Rock plate and lateral stabilizer",
      "Intended use": "Mountain routes, wet paths, long technical efforts",
    },
    imageAlt: "Black and moss Velocity Terra Shift trail running shoe with lugged outsole",
    gallery: ["terra-profile", "terra-lug", "terra-upper"],
  },
  {
    id: "studio-form",
    index: "03",
    use: "Training",
    name: "Studio Form",
    category: "Run strength training",
    detail: "Stable power platform",
    price: 5490,
    tone: "clay",
    colors: ["Clay", "Bone", "Black"],
    rating: 4.6,
    reviews: 76,
    stock: "In stock",
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
    specs: {
      Weight: "268 g",
      "Heel-to-toe drop": "4 mm",
      Surface: "Gym, track, short road efforts",
      Cushioning: "Balanced low-profile foam",
      Support: "Wide base with heel clip",
      "Intended use": "Intervals, strength circuits, treadmill sessions",
    },
    imageAlt: "Clay and off-white Velocity Studio Form training shoe",
    gallery: ["studio-profile", "studio-heel", "studio-base"],
  },
  {
    id: "aeroflow-race",
    index: "04",
    use: "Road",
    name: "Aeroflow Race",
    category: "Carbon-plated racing",
    detail: "Marathon race-day speed",
    price: 8990,
    tone: "volt",
    colors: ["Volt", "Black"],
    rating: 4.9,
    reviews: 62,
    stock: "Low stock",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    specs: {
      Weight: "212 g",
      "Heel-to-toe drop": "8 mm",
      Surface: "Road racing",
      Cushioning: "Peba super-foam over full-length carbon plate",
      Support: "Neutral, propulsive rocker",
      "Intended use": "5K to marathon race day, fast tempo sessions",
    },
    imageAlt: "Volt green and black Velocity Aeroflow Race carbon-plated racing shoe",
    gallery: ["aeroflow-knit", "aeroflow-sole"],
  },
  {
    id: "terra-storm",
    index: "05",
    use: "Trail",
    name: "Terra Storm",
    category: "Wet-weather trail",
    detail: "Deep-lug monsoon grip",
    price: 7490,
    tone: "ink",
    colors: ["Black", "Storm", "Volt"],
    rating: 4.6,
    reviews: 41,
    stock: "In stock",
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    specs: {
      Weight: "312 g",
      "Heel-to-toe drop": "6 mm",
      Surface: "Wet trail, mud, rock",
      Cushioning: "Firm protective foam",
      Support: "Aggressive 6 mm lugs, drainage upper",
      "Intended use": "Rainy-season trails, ultras, technical descents",
    },
    imageAlt: "Black and storm-grey Velocity Terra Storm wet-weather trail shoe",
    gallery: ["terra-lug", "terra-profile", "terra-upper"],
  },
  {
    id: "studio-drive",
    index: "06",
    use: "Training",
    name: "Studio Drive",
    category: "Sprint and plyometric",
    detail: "Snappy explosive platform",
    price: 5990,
    tone: "clay",
    colors: ["Clay", "Black", "Volt"],
    rating: 4.5,
    reviews: 53,
    stock: "In stock",
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
    specs: {
      Weight: "244 g",
      "Heel-to-toe drop": "2 mm",
      Surface: "Track, gym floor",
      Cushioning: "Low-stack responsive foam",
      Support: "Locked-down sprint fit",
      "Intended use": "Sprints, plyometrics, agility and speed work",
    },
    imageAlt: "Clay and black Velocity Studio Drive sprint training shoe",
    gallery: ["studio-heel", "studio-base", "studio-profile"],
  },
  {
    id: "aeroflow-glide",
    index: "07",
    use: "Road",
    name: "Aeroflow Glide",
    category: "Max-cushion recovery",
    detail: "Plush long-run comfort",
    price: 6990,
    tone: "volt",
    colors: ["Bone", "Volt", "Storm"],
    rating: 4.7,
    reviews: 88,
    stock: "In stock",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    specs: {
      Weight: "278 g",
      "Heel-to-toe drop": "10 mm",
      Surface: "Road",
      Cushioning: "Max-stack soft nitrogen foam",
      Support: "Neutral, wide stable base",
      "Intended use": "Recovery runs, easy long miles, all-day wear",
    },
    imageAlt: "Bone and volt green Velocity Aeroflow Glide max-cushion running shoe",
    gallery: ["aeroflow-sole", "aeroflow-knit"],
  },
  {
    id: "terra-scout",
    index: "08",
    use: "Trail",
    name: "Terra Scout",
    category: "Fast and light trail",
    detail: "Nimble door-to-trail",
    price: 6290,
    tone: "ink",
    colors: ["Moss", "Bone", "Black"],
    rating: 4.5,
    reviews: 37,
    stock: "Out of stock",
    sizes: ["US 7", "US 8", "US 9", "US 10"],
    specs: {
      Weight: "258 g",
      "Heel-to-toe drop": "5 mm",
      Surface: "Groomed and mixed trail",
      Cushioning: "Responsive mid-stack foam",
      Support: "Moderate 4 mm lugs, flexible upper",
      "Intended use": "Door-to-trail runs, fast hikes, mixed terrain days",
    },
    imageAlt: "Moss green and bone Velocity Terra Scout lightweight trail shoe",
    gallery: ["terra-upper", "terra-profile"],
  },
  {
    id: "studio-base",
    index: "09",
    use: "Training",
    name: "Studio Base",
    category: "Lifting and stability",
    detail: "Flat grounded platform",
    price: 4990,
    tone: "clay",
    colors: ["Black", "Bone"],
    rating: 4.4,
    reviews: 29,
    stock: "In stock",
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
    specs: {
      Weight: "296 g",
      "Heel-to-toe drop": "0 mm",
      Surface: "Gym floor, platform",
      Cushioning: "Firm flat outsole, minimal stack",
      Support: "Wide flat base, heel lock",
      "Intended use": "Strength training, lifting, stability circuits",
    },
    imageAlt: "Black and bone Velocity Studio Base flat lifting shoe",
    gallery: ["studio-base", "studio-heel"],
  },
];

export const currencyFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

export const useCases: Product["use"][] = ["Road", "Trail", "Training"];

export function matchesQuery(product: Product, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return [product.name, product.category, product.use, product.detail]
    .join(" ")
    .toLowerCase()
    .includes(normalized);
}

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

// Related: same use case first, then fill from other models. Never the product itself.
export function relatedProducts(product: Product, limit = 3) {
  const sameUse = products.filter((p) => p.id !== product.id && p.use === product.use);
  const others = products.filter((p) => p.id !== product.id && p.use !== product.use);
  return [...sameUse, ...others].slice(0, limit);
}

const reviewsById: Record<string, Review[]> = {
  "aeroflow-01": [
    { quote: "The Aeroflow feels quick without punishing my calves after long tempo work. I run six days a week and it holds up.", author: "Mali", location: "Bangkok Marathon finisher", rating: 5 },
    { quote: "Bought it for daily miles and it does everything. Breathable enough for 34-degree afternoons on the canal path.", author: "Krit", location: "Bangkok, runs 60 km/week", rating: 5 },
    { quote: "True to size for me. The midfoot lockdown is the best part, no heel slip on turns.", author: "Ploy", location: "Nonthaburi, 10K runner", rating: 4 },
  ],
  "terra-shift": [
    { quote: "Terra Shift grips wet concrete stairs and trail switchbacks better than my old race shoes. Rock plate saved my feet.", author: "Niran", location: "Chiang Mai trail runner", rating: 5 },
    { quote: "Took these up Doi Suthep in the rain. Drainage is real, and the lugs bite into loose gravel.", author: "Fah", location: "Chiang Mai, ultra trainee", rating: 5 },
    { quote: "Slightly warm for road stretches, but on technical ground nothing I own comes close.", author: "James", location: "Chiang Rai, weekend trails", rating: 4 },
  ],
  "studio-form": [
    { quote: "Studio Form finally lets me lift, sprint, and cool down without changing shoes. The flat base is stable under a squat.", author: "June", location: "Bangkok run coach", rating: 5 },
    { quote: "Perfect for interval days on the track then straight into circuits. Low profile but not harsh.", author: "Aof", location: "Bangkok, CrossFit + running", rating: 4 },
  ],
  "aeroflow-race": [
    { quote: "Wore these for my marathon PB. The carbon plate rolls you forward, you just have to keep up with it.", author: "Sunee", location: "Chiang Mai Marathon, 3:12", rating: 5 },
    { quote: "Race-day only for me. Light and fast, but the foam is too precious for daily training. Worth it on the start line.", author: "Beam", location: "Bangkok, sub-40 10K", rating: 5 },
  ],
  "terra-storm": [
    { quote: "Monsoon season is why I bought these. Deep lugs, fast drainage, zero slipping on wet rock.", author: "Tanawat", location: "Khao Yai trails", rating: 5 },
    { quote: "Heavier than my summer trail shoe but that is the trade for grip. Stormed through a muddy 30K.", author: "Nok", location: "Kanchanaburi, trail ultra", rating: 4 },
  ],
  "studio-drive": [
    { quote: "Sprint work feels snappy and direct. The low drop keeps me on my forefoot where I want to be.", author: "Prem", location: "Bangkok, track sprinter", rating: 5 },
    { quote: "Great for plyo and agility. Not a distance shoe, but that is not what it is for.", author: "Ice", location: "Pathum Thani, speed sessions", rating: 4 },
  ],
  "aeroflow-glide": [
    { quote: "Recovery runs feel like nothing. Max cushion but it does not feel mushy or slow.", author: "Wan", location: "Bangkok, marathoner", rating: 5 },
    { quote: "All-day comfort. I wear them for easy miles and standing shifts at the clinic.", author: "Dr. Suda", location: "Nonthaburi, easy-run wear", rating: 4 },
  ],
  "terra-scout": [
    { quote: "Door-to-trail is exactly right. Light on road, capable enough on groomed singletrack.", author: "Chai", location: "Chiang Mai, mixed terrain", rating: 4 },
    { quote: "Nimble and quick. Wanted more lug for mud, but on dry trail it flies.", author: "Mint", location: "Lampang, fast hikes", rating: 4 },
  ],
  "studio-base": [
    { quote: "Flat, grounded, stable under heavy lifts. Finally a lifting-capable shoe from a running brand.", author: "Golf", location: "Bangkok, strength + run", rating: 4 },
    { quote: "Zero drop takes a session to adjust, then it feels planted. Good for stability circuits.", author: "Ying", location: "Samut Prakan, gym training", rating: 4 },
  ],
};

export function getReviews(productId: string): Review[] {
  return reviewsById[productId] ?? [];
}
