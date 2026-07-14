"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { products, currencyFormatter, matchesQuery, type Product } from "./products";
import { SearchIcon, MenuIcon, CloseIcon, DecorativeShoe } from "./graphics";
import { useCart } from "./CartContext";
import { CartButton, CartDrawer } from "./CartDrawer";
import { useDialogFocus } from "./useDialogFocus";

const HOME_PRODUCT_LIMIT = 3;
const navItems = ["New Releases", "Men", "Women", "Running", "Stories", "Shop Now"];

function trackEvent(name: string, payload?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("velocity:analytics", { detail: { name, ...payload } }));
}

function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  // Deep-link: /?product=<id> (e.g. from /shop) pre-opens that product's quick-view.
  const deepLinkedProduct = products.find((item) => item.id === searchParams.get("product")) ?? null;
  const featured = products.slice(0, HOME_PRODUCT_LIMIT);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(deepLinkedProduct);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [selectedColor, setSelectedColor] = useState((deepLinkedProduct ?? products[0]).colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [locale, setLocale] = useState("EN / THB");
  const searchRef = useRef<HTMLElement>(null);
  const quickViewRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLElement>(null);

  useDialogFocus(searchOpen, searchRef, () => setSearchOpen(false));
  useDialogFocus(Boolean(quickView), quickViewRef, () => setQuickView(null));
  useDialogFocus(mobileOpen, mobileRef, () => setMobileOpen(false));

  useEffect(() => {
    if (!searchOpen || query.length < 2 || !searching) return;
    const timer = window.setTimeout(() => setSearching(false), 450);
    return () => window.clearTimeout(timer);
  }, [query, searchOpen, searching]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter((product) => matchesQuery(product, query));
  }, [query]);

  // Strip the ?product= param after the initial quick-view open so a refresh/back is clean.
  useEffect(() => {
    if (!searchParams.get("product")) return;
    trackEvent("product_click", { product: searchParams.get("product") ?? "", source: "deep_link" });
    router.replace("/", { scroll: false });
  }, [searchParams, router]);

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
    addItem(product, selectedColor, selectedSize);
    trackEvent("add_to_cart", { product: product.id, size: selectedSize });
    setQuickView(null);
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="announcement"><a href="#velocity-plus">Members get free express delivery — join Velocity+</a></div>
      <header className="site-header">
        <div className="container nav-container">
          <a className="wordmark" href="#top" aria-label="Velocity home">Velocity</a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) =>
              item === "Stories" ? (
                <a key={item} href="#story">{item}</a>
              ) : item === "Shop Now" || item === "Running" ? (
                <Link key={item} href="/shop">{item}</Link>
              ) : (
                <a key={item} href="#products">{item}</a>
              ),
            )}
          </nav>
          <div className="nav-actions">
            <button className="icon-button" aria-label="Search" aria-expanded={searchOpen} aria-controls="search-dialog" onClick={() => { setSearchOpen(true); trackEvent("search_open"); }}><SearchIcon /></button>
            <CartButton />
            <Link className="pill pill-dark" href="/shop" onClick={() => trackEvent("shop_now")}>Shop now</Link>
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
            <div className="section-heading"><h2 id="products-title">Built for every pace</h2><Link href="/shop">View all footwear &rarr;</Link></div>
            <div className="product-grid">
              {featured.map((product) => (
                <article className={`product-card ${product.tone}`} key={product.name}>
                  <button className="product-card-link" onClick={() => openProduct(product, "product_grid")} aria-label={`Quick view ${product.name}`}>
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

      {searchOpen && <aside className="modal-backdrop" role="presentation"><section className="search-dialog" id="search-dialog" ref={searchRef} role="dialog" aria-modal="true" aria-labelledby="search-title"><div className="drawer-header"><h2 id="search-title">Search Velocity</h2><button className="icon-button" aria-label="Close search" onClick={() => setSearchOpen(false)}><CloseIcon /></button></div><label htmlFor="search-input">Search shoes, terrain, or use case</label><input id="search-input" value={query} onChange={(event) => { const nextQuery = event.target.value; setQuery(nextQuery); setSearching(nextQuery.trim().length >= 2); trackEvent("search_query", { query: nextQuery }); }} placeholder="Try road, trail, Aeroflow" />{searching && <p role="status">Searching performance archive...</p>}{!query && <p className="empty-state">Start typing to discover road, trail, and training shoes.</p>}{query.length > 0 && query.length < 2 && <p className="empty-state">Enter at least 2 characters.</p>}{query.length >= 2 && !searching && searchResults.length === 0 && <p className="empty-state">No results for “{query}”. Try road, trail, or training.</p>}<div className="search-results">{!searching && searchResults.map((product) => <button key={product.id} onClick={() => { setSearchOpen(false); openProduct(product, "search"); }}><span>{product.name}</span><small>{product.category} / {currencyFormatter.format(product.price)}</small></button>)}</div>{!searching && searchResults.length > 0 && <Link className="search-all" href={`/shop?q=${encodeURIComponent(query.trim())}`} onClick={() => { setSearchOpen(false); trackEvent("search_view_all", { query }); }}>See all {searchResults.length} {searchResults.length === 1 ? "result" : "results"} in shop <span aria-hidden="true">&rarr;</span></Link>}</section></aside>}

      <CartDrawer />

      {quickView && <aside className="modal-backdrop" role="presentation"><section className="quick-view" ref={quickViewRef} role="dialog" aria-modal="true" aria-labelledby="quick-view-title"><button className="icon-button close-floating" aria-label="Close product details" onClick={() => setQuickView(null)}><CloseIcon /></button><div className="gallery"><div className={`gallery-main ${quickView.tone}`}>{quickView.id === "aeroflow-01" ? <Image src="/velocity-shoe.png" width={1536} height={1024} sizes="(max-width: 720px) 88vw, 42vw" alt={quickView.imageAlt} /> : <DecorativeShoe variant={quickView.gallery[0]} alt={quickView.imageAlt} />}</div><div className="gallery-thumbs">{quickView.gallery.map((image) => <span key={image}>{image.startsWith("/") ? "Profile" : image.split("-").pop()}</span>)}</div></div><div className="quick-copy"><p className="eyebrow">{quickView.index} / {quickView.use}</p><h2 id="quick-view-title">{quickView.name}</h2><p>{quickView.category}. {quickView.detail} for runners who want premium performance without wasted motion.</p><p className="quick-price">{currencyFormatter.format(quickView.price)}</p><p className="stock">{quickView.stock}</p><fieldset><legend>Color</legend><div className="choice-row">{quickView.colors.map((color) => <button className={selectedColor === color ? "selected" : ""} type="button" key={color} onClick={() => setSelectedColor(color)}>{color}</button>)}</div></fieldset><fieldset><legend>Size <a href="#size-guide">Size guide</a></legend><div className="choice-row">{quickView.sizes.map((size) => <button className={selectedSize === size ? "selected" : ""} type="button" key={size} onClick={() => { setSelectedSize(size); setSizeError(""); }}>{size}</button>)}</div></fieldset>{!selectedSize && <p className="form-help" role="status">Select a size to unlock Add to Cart.</p>}{sizeError && <p className="form-error" role="alert">{sizeError}</p>}<div className="quick-actions"><button className="pill pill-dark add-button" disabled={!selectedSize || quickView.stock === "Out of stock"} onClick={() => addToCart(quickView)}>Add to cart</button><Link className="text-link" href={`/shop/${quickView.id}`} onClick={() => setQuickView(null)}>Full details <span aria-hidden="true">&rarr;</span></Link></div><dl className="spec-list">{Object.entries(quickView.specs).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></div></section></aside>}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "Organization", name: "Velocity", url: "https://velocity.run", logo: "https://velocity.run/icon.svg", sameAs: ["https://www.instagram.com/nikerunning/", "https://www.strava.com/clubs", "https://www.youtube.com/@runningchannel"] }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://velocity.run" }, { "@type": "ListItem", position: 2, name: "Running Shoes", item: "https://velocity.run/#products" }] }, ...products.map((product) => ({ "@type": "Product", name: product.name, description: `${product.category}. ${product.detail}.`, image: "https://velocity.run/velocity-shoe.png", brand: { "@type": "Brand", name: "Velocity" }, aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews }, offers: { "@type": "Offer", priceCurrency: "THB", price: product.price, availability: product.stock === "Out of stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock", url: `https://velocity.run/#${product.id}` } }))] }) }} />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  );
}
