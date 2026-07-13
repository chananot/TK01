"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Product = {
  id: string;
  index: string;
  use: string;
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

type CartItem = { product: Product; color: string; size: string; quantity: number };

const products: Product[] = [
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
];

const navItems = ["New Releases", "Men", "Women", "Running", "Stories", "Shop Now"];
const currencyFormatter = new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 });

function trackEvent(name: string, payload?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("velocity:analytics", { detail: { name, ...payload } }));
}

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>;
}

function BagIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 8h14l-1.2 12H6.2L5 8Z"/><path d="M9 9V6.5a3 3 0 0 1 6 0V9"/></svg>;
}

function MenuIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
}

function CloseIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>;
}

function DecorativeShoe({ variant, alt = "" }: { variant: string; alt?: string }) {
  const styles: Record<string, { upper: string; sole: string; accent: string; rotate: string }> = {
    "aeroflow-sole": { upper: "#f4f2eb", sole: "#11110f", accent: "#c9ff12", rotate: "-5deg" },
    "aeroflow-knit": { upper: "#11110f", sole: "#f4f2eb", accent: "#c9ff12", rotate: "4deg" },
    "terra-profile": { upper: "#1c1c1a", sole: "#c9ff12", accent: "#738553", rotate: "-7deg" },
    "terra-lug": { upper: "#283222", sole: "#11110f", accent: "#c9ff12", rotate: "6deg" },
    "terra-upper": { upper: "#11110f", sole: "#767b62", accent: "#f4f2eb", rotate: "-2deg" },
    "studio-profile": { upper: "#e5744c", sole: "#11110f", accent: "#f4f2eb", rotate: "-6deg" },
    "studio-heel": { upper: "#f4f2eb", sole: "#e5744c", accent: "#11110f", rotate: "5deg" },
    "studio-base": { upper: "#11110f", sole: "#f4f2eb", accent: "#e5744c", rotate: "-1deg" },
  };
  const style = styles[variant] ?? styles["aeroflow-sole"];
  return (
    <svg className="shoe-illustration" role="img" aria-label={alt} viewBox="0 0 520 300" style={{ rotate: style.rotate }}>
      <path fill={style.upper} d="M81 166c72-43 118-87 189-84 55 2 91 44 139 56 25 6 50 5 67 28 10 14 10 36-4 49-28 26-94 26-151 22-91-7-180-19-259-34-31-6-29-23 19-37Z"/>
      <path fill={style.sole} d="M52 198c86 20 205 37 325 38 58 0 100-7 117-23 9 16 2 35-18 45-44 23-167 15-271 0-69-10-129-22-166-34-20-7-16-32 13-26Z"/>
      <path fill={style.accent} d="M161 158c51-27 80-43 119-42 22 1 41 9 59 22-50 12-99 25-151 37-18 4-35-7-27-17Z"/>
      <path fill="none" stroke={style.accent} strokeWidth="8" strokeLinecap="round" d="M228 127c32 25 71 39 118 43M211 153l83 15M184 176l115 19"/>
      <path fill={style.accent} d="M385 221h30l-18 18h-34l22-18Zm-82-2h31l-15 18h-34l18-18Zm-89-9h31l-11 17h-35l15-17Z"/>
    </svg>
  );
}

function useDialogFocus(isOpen: boolean, panelRef: React.RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;
    const previous = document.activeElement as HTMLElement | null;
    const selector = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";
    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(selector));
    focusable[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("is-locked");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("is-locked");
      previous?.focus();
    };
  }, [isOpen, onClose, panelRef]);
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [selectedColor, setSelectedColor] = useState(products[0].colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [locale, setLocale] = useState("EN / THB");
  const searchRef = useRef<HTMLElement>(null);
  const cartRef = useRef<HTMLElement>(null);
  const quickViewRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLElement>(null);

  useDialogFocus(searchOpen, searchRef, () => setSearchOpen(false));
  useDialogFocus(cartOpen, cartRef, () => setCartOpen(false));
  useDialogFocus(Boolean(quickView), quickViewRef, () => setQuickView(null));
  useDialogFocus(mobileOpen, mobileRef, () => setMobileOpen(false));

  useEffect(() => {
    if (!searchOpen || query.length < 2 || !searching) return;
    const timer = window.setTimeout(() => setSearching(false), 450);
    return () => window.clearTimeout(timer);
  }, [query, searchOpen, searching]);

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return products.filter((product) => [product.name, product.category, product.use, product.detail].join(" ").toLowerCase().includes(normalized));
  }, [query]);

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  function openProduct(product: Product, source: string) {
    setQuickView(product);
    setSelectedColor(product.colors[0]);
    setSelectedSize("");
    setSizeError("");
    trackEvent("product_click", { product: product.id, source });
  }

  function addToCart(product: Product) {
    if (!selectedSize) {
      setSizeError("Choose a size before adding this shoe to your bag.");
      return;
    }
    setCart((items) => {
      const existing = items.find((item) => item.product.id === product.id && item.size === selectedSize && item.color === selectedColor);
      if (existing) {
        return items.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...items, { product, color: selectedColor, size: selectedSize, quantity: 1 }];
    });
    trackEvent("add_to_cart", { product: product.id, size: selectedSize });
    setQuickView(null);
    setCartOpen(true);
  }

  function updateQuantity(index: number, quantity: number) {
    setCart((items) => items.flatMap((item, itemIndex) => itemIndex === index ? (quantity > 0 ? [{ ...item, quantity }] : []) : [item]));
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="announcement"><a href="#velocity-plus">Members get free express delivery — join Velocity+</a></div>
      <header className="site-header">
        <div className="container nav-container">
          <a className="wordmark" href="#top" aria-label="Velocity home">Velocity</a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => <a key={item} href={item === "Stories" ? "#story" : "#products"}>{item}</a>)}
          </nav>
          <div className="nav-actions">
            <button className="icon-button" aria-label="Search" aria-expanded={searchOpen} aria-controls="search-dialog" onClick={() => { setSearchOpen(true); trackEvent("search_open"); }}><SearchIcon /></button>
            <button className="icon-button bag-button" aria-label={`Shopping bag, ${cartQuantity} items`} aria-expanded={cartOpen} aria-controls="cart-dialog" onClick={() => setCartOpen(true)}><BagIcon />{cartQuantity > 0 && <span className="bag-badge">{cartQuantity}</span>}</button>
            <a className="pill pill-dark" href="#products" onClick={() => trackEvent("shop_now")}>Shop now</a>
            <button className="icon-button menu-button" aria-label="Open menu" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(true)}><MenuIcon /></button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Aeroflow 01 / New season</p>
              <h1 id="hero-title">Move<br />without<br />limits.</h1>
              <p className="hero-body">Engineered for the long run. Ultra-responsive foam, breathable structure, and a grounded fit that stays fast from first stride to final mile.</p>
              <dl className="metrics"><div><dt>252 g</dt><dd>Lightweight</dd></div><div><dt>8 mm</dt><dd>Drop</dd></div><div><dt>Road</dt><dd>Daily</dd></div></dl>
              <div className="hero-actions"><button className="pill pill-dark" onClick={() => openProduct(products[0], "hero")}>Shop Aeroflow 01</button><button className="text-link button-link" onClick={() => openProduct(products[0], "specs")}>View specs <span aria-hidden="true">&rarr;</span></button></div>
              <p className="reassurance">Free Bangkok express delivery over ฿4,000. 30-day road test returns.</p>
            </div>
            <div className="hero-product">
              <Image src="/velocity-shoe.png" width={1536} height={1024} priority fetchPriority="high" loading="eager" sizes="(max-width: 720px) 92vw, (max-width: 1200px) 48vw, 660px" alt="Black and cream Velocity Aeroflow 01 performance running shoe with neon green outsole" />
            </div>
          </div>
        </section>

        <section className="products-section" id="products" aria-labelledby="products-title">
          <div className="container section-container">
            <div className="section-heading"><h2 id="products-title">Built for every pace</h2><a href="#products">View all footwear &rarr;</a></div>
            <div className="product-grid">
              {products.map((product) => (
                <article className={`product-card ${product.tone}`} key={product.name}>
                  <button className="product-card-link" onClick={() => openProduct(product, "product_grid")} aria-label={`View ${product.name} details`}>
                    <div className="product-image">{product.id === "aeroflow-01" ? <Image src="/velocity-shoe.png" width={1536} height={1024} sizes="(max-width: 720px) 80vw, 30vw" alt={product.imageAlt} loading="lazy" /> : <DecorativeShoe variant={product.gallery[0]} alt={product.imageAlt} />}</div>
                    <div className="product-info"><p className="product-index">{product.index} / {product.use}</p><h3>{product.name}</h3><p>{product.detail}</p><p className="product-meta"><span>{product.category}</span><span>{currencyFormatter.format(product.price)}</span></p><p className="rating">{product.rating} stars / {product.reviews} reviews</p><p className="stock">{product.stock}</p><div className="swatches" aria-label={`${product.name} colors`}>{product.colors.map((color) => <span key={color}>{color}</span>)}</div></div>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tech-section" id="technology" aria-labelledby="tech-title">
          <div className="container tech-grid">
            <div><p className="eyebrow accent-dark">Velocity system</p><h2 id="tech-title">Fast where it counts. Controlled where it matters.</h2></div>
            {["Nitro-return cushioning absorbs repeated impact without feeling soft.", "Guided stability geometry keeps tired strides tracking forward.", "Micro-lug grip holds wet concrete, track rubber, and packed trail.", "Adaptive fit bands lock the midfoot while the toe box opens naturally.", "Use filters pair every model to road, trail, tempo, or training days."].map((copy, index) => <article key={copy}><span>{String(index + 1).padStart(2, "0")}</span><p>{copy}</p></article>)}
          </div>
        </section>

        <section className="story-section" id="story" aria-labelledby="story-title">
          <div className="container story-grid">
            <div className="contour-art" aria-hidden="true">
              <svg viewBox="0 0 620 380"><path className="contour-main" d="M40 300c78-155 176-96 228-188 34-59 103-36 130 24 38 86 102 43 182 132"/><path d="M44 330c75-134 171-82 237-166 40-51 96-27 126 22 45 74 108 31 167 93"/><path d="M60 350c83-110 170-61 237-134 49-54 101-19 132 24 47 64 104 21 125 56"/><circle cx="334" cy="150" r="10"/><line x1="334" y1="160" x2="334" y2="300"/><text x="352" y="147">42.195 KM</text></svg>
            </div>
            <div className="story-copy"><p className="eyebrow accent">Designed around the human stride</p><h2 id="story-title">The finish line<br />keeps moving.</h2><p>We study motion in the real world, not just the lab. Every curve, layer, and material is tuned to disappear beneath you, so the only thing left is the next step.</p><div className="principles"><a href="#motion-study">01 Motion study</a><a href="#material-lab">02 Material lab</a><a href="#field-test">03 Field test</a></div><a className="text-link accent" href="#motion-study">Read our design philosophy &rarr;</a></div>
          </div>
        </section>

        <section className="content-panels" aria-label="Research stories">
          <article id="motion-study"><h3>Motion Study</h3><p>Pressure mapping from 1,200 runner sessions shapes rocker angles, flex grooves, and landing zones.</p></article>
          <article id="material-lab"><h3>Material Lab</h3><p>Foams are fatigue-tested in tropical heat to keep rebound consistent through Bangkok training blocks.</p></article>
          <article id="field-test"><h3>Field Test</h3><p>Local run crews validate grip, drainage, and upper breathability across road, track, rain, and trail.</p></article>
        </section>

        <section className="reviews-section" aria-labelledby="reviews-title">
          <div className="container reviews-grid">
            <h2 id="reviews-title">Trusted by runners chasing the next split.</h2>
            {[
              ["The Aeroflow feels quick without punishing my calves after long tempo work.", "Mali, Bangkok Marathon finisher"],
              ["Terra Shift grips wet concrete stairs and trail switchbacks better than my race shoes.", "Niran, Chiang Mai trail runner"],
              ["Studio Form finally lets me lift, sprint, and cool down without changing shoes.", "June, run coach"],
            ].map(([quote, author]) => <figure key={author}><blockquote>“{quote}”</blockquote><figcaption>{author}</figcaption></figure>)}
          </div>
        </section>

        <section className="trust-strip" aria-label="Shopping reassurance">
          <span>Free delivery over ฿4,000</span><span>30-day returns</span><span>1-year outsole warranty</span><span>Encrypted secure checkout</span>
        </section>

        <section className="membership" id="velocity-plus" aria-labelledby="membership-title">
          <div className="container membership-card"><h2 id="membership-title">Velocity+</h2><p>Join for early drops, run-club invites, express delivery, and member-only field tests.</p><form onSubmit={(event) => event.preventDefault()}><label htmlFor="member-email">Email address</label><input id="member-email" type="email" placeholder="runner@example.com" required /><button className="pill pill-dark" type="submit">Join free</button></form></div>
        </section>
      </main>

      <footer>
        <div className="container footer-container">
          <div className="footer-main"><a className="wordmark" href="#top">Velocity</a><p className="footer-statement">Equipment for<br />forward motion.</p><div><strong>Shop</strong><a href="#products">New releases</a><a href="#products">Running</a><a href="#products">Training</a><a href="#products">Accessories</a></div><div><strong>Support</strong><a href="#delivery">Delivery & returns</a><a href="#size-guide">Size guide</a><a href="mailto:support@velocity.run">Contact</a><a href="#accessibility">Accessibility</a></div><div className="social"><a href="https://www.instagram.com/nikerunning/" target="_blank" rel="noopener noreferrer" aria-label="Velocity on Instagram, opens in a new tab">Instagram &rarr;</a><a href="https://www.strava.com/clubs" target="_blank" rel="noopener noreferrer" aria-label="Velocity run club on Strava, opens in a new tab">Strava &rarr;</a><a href="https://www.youtube.com/@runningchannel" target="_blank" rel="noopener noreferrer" aria-label="Velocity training videos on YouTube, opens in a new tab">YouTube &rarr;</a></div></div>
          <div className="footer-links" id="delivery"><span id="size-guide">Size guide: US 6-11, true to size for road models.</span><span id="accessibility">Accessibility: keyboard-first, contrast-checked, reduced-motion supported.</span></div>
          <div className="footer-legal"><span>© 2026 Velocity Labs</span><a href="#privacy">Privacy</a><a href="#terms">Terms</a><label htmlFor="locale-select">Market</label><select id="locale-select" value={locale} onChange={(event) => setLocale(event.target.value)}><option>EN / THB</option><option>TH / THB</option><option>EN / USD</option></select></div>
        </div>
      </footer>

      {mobileOpen && <aside className="drawer-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setMobileOpen(false)}><section className="drawer mobile-drawer" id="mobile-navigation" ref={mobileRef} role="dialog" aria-modal="true" aria-labelledby="mobile-title"><div className="drawer-header"><h2 id="mobile-title">Menu</h2><button className="icon-button" aria-label="Close menu" onClick={() => setMobileOpen(false)}><CloseIcon /></button></div><nav aria-label="Mobile navigation">{navItems.map((item) => <a key={item} href={item === "Stories" ? "#story" : "#products"} onClick={() => setMobileOpen(false)}>{item}</a>)}</nav></section></aside>}

      {searchOpen && <aside className="modal-backdrop" role="presentation"><section className="search-dialog" id="search-dialog" ref={searchRef} role="dialog" aria-modal="true" aria-labelledby="search-title"><div className="drawer-header"><h2 id="search-title">Search Velocity</h2><button className="icon-button" aria-label="Close search" onClick={() => setSearchOpen(false)}><CloseIcon /></button></div><label htmlFor="search-input">Search shoes, terrain, or use case</label><input id="search-input" value={query} onChange={(event) => { const nextQuery = event.target.value; setQuery(nextQuery); setSearching(nextQuery.trim().length >= 2); trackEvent("search_query", { query: nextQuery }); }} placeholder="Try road, trail, Aeroflow" />{searching && <p role="status">Searching performance archive...</p>}{!query && <p className="empty-state">Start typing to discover road, trail, and training shoes.</p>}{query.length > 0 && query.length < 2 && <p className="empty-state">Enter at least 2 characters.</p>}{query.length >= 2 && !searching && searchResults.length === 0 && <p className="empty-state">No results for “{query}”. Try road, trail, or training.</p>}<div className="search-results">{!searching && searchResults.map((product) => <button key={product.id} onClick={() => { setSearchOpen(false); openProduct(product, "search"); }}><span>{product.name}</span><small>{product.category} / {currencyFormatter.format(product.price)}</small></button>)}</div></section></aside>}

      {cartOpen && <aside className="drawer-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setCartOpen(false)}><section className="drawer cart-drawer" id="cart-dialog" ref={cartRef} role="dialog" aria-modal="true" aria-labelledby="cart-title"><div className="drawer-header"><h2 id="cart-title">Shopping bag</h2><button className="icon-button" aria-label="Close cart" onClick={() => setCartOpen(false)}><CloseIcon /></button></div>{cart.length === 0 ? <div className="empty-cart"><p>Your bag is empty.</p><button className="pill pill-dark" onClick={() => { setCartOpen(false); document.getElementById("products")?.scrollIntoView(); }}>Shop footwear</button></div> : <><div className="cart-items">{cart.map((item, index) => <article className="cart-item" key={`${item.product.id}-${item.size}-${item.color}`}><DecorativeShoe variant={item.product.gallery[1] ?? item.product.gallery[0]} /><div><h3>{item.product.name}</h3><p>{item.color} / {item.size}</p><p>{currencyFormatter.format(item.product.price)}</p><label>Qty <input type="number" min="1" max="9" value={item.quantity} onChange={(event) => updateQuantity(index, Number(event.target.value))} /></label><button className="text-link button-link" onClick={() => updateQuantity(index, 0)}>Remove</button></div></article>)}</div><div className="cart-summary"><p><span>Subtotal</span><strong>{currencyFormatter.format(subtotal)}</strong></p><button className="pill pill-dark" onClick={() => trackEvent("checkout", { value: subtotal })}>Checkout securely</button><small>Taxes and delivery calculated at checkout.</small></div></>}</section></aside>}

      {quickView && <aside className="modal-backdrop" role="presentation"><section className="quick-view" ref={quickViewRef} role="dialog" aria-modal="true" aria-labelledby="quick-view-title"><button className="icon-button close-floating" aria-label="Close product details" onClick={() => setQuickView(null)}><CloseIcon /></button><div className="gallery"><div className={`gallery-main ${quickView.tone}`}>{quickView.id === "aeroflow-01" ? <Image src="/velocity-shoe.png" width={1536} height={1024} sizes="(max-width: 720px) 88vw, 42vw" alt={quickView.imageAlt} /> : <DecorativeShoe variant={quickView.gallery[0]} alt={quickView.imageAlt} />}</div><div className="gallery-thumbs">{quickView.gallery.map((image) => <span key={image}>{image.startsWith("/") ? "Profile" : image.split("-").pop()}</span>)}</div></div><div className="quick-copy"><p className="eyebrow">{quickView.index} / {quickView.use}</p><h2 id="quick-view-title">{quickView.name}</h2><p>{quickView.category}. {quickView.detail} for runners who want premium performance without wasted motion.</p><p className="quick-price">{currencyFormatter.format(quickView.price)}</p><p className="stock">{quickView.stock}</p><fieldset><legend>Color</legend><div className="choice-row">{quickView.colors.map((color) => <button className={selectedColor === color ? "selected" : ""} type="button" key={color} onClick={() => setSelectedColor(color)}>{color}</button>)}</div></fieldset><fieldset><legend>Size <a href="#size-guide">Size guide</a></legend><div className="choice-row">{quickView.sizes.map((size) => <button className={selectedSize === size ? "selected" : ""} type="button" key={size} onClick={() => { setSelectedSize(size); setSizeError(""); }}>{size}</button>)}</div></fieldset>{!selectedSize && <p className="form-help" role="status">Select a size to unlock Add to Cart.</p>}{sizeError && <p className="form-error" role="alert">{sizeError}</p>}<button className="pill pill-dark add-button" disabled={!selectedSize || quickView.stock === "Out of stock"} onClick={() => addToCart(quickView)}>Add to cart</button><dl className="spec-list">{Object.entries(quickView.specs).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></div></section></aside>}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "Organization", name: "Velocity", url: "https://velocity.run", logo: "https://velocity.run/icon.svg", sameAs: ["https://www.instagram.com/nikerunning/", "https://www.strava.com/clubs", "https://www.youtube.com/@runningchannel"] }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://velocity.run" }, { "@type": "ListItem", position: 2, name: "Running Shoes", item: "https://velocity.run/#products" }] }, ...products.map((product) => ({ "@type": "Product", name: product.name, description: `${product.category}. ${product.detail}.`, image: "https://velocity.run/velocity-shoe.png", brand: { "@type": "Brand", name: "Velocity" }, aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews }, offers: { "@type": "Offer", priceCurrency: "THB", price: product.price, availability: product.stock === "Out of stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock", url: `https://velocity.run/#${product.id}` } }))] }) }} />
    </>
  );
}
