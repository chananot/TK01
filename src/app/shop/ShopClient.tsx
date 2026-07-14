"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { products, currencyFormatter, useCases, matchesQuery, type Product } from "../products";
import { DecorativeShoe, SearchIcon } from "../graphics";

type Filter = "All" | Product["use"];
const filters: Filter[] = ["All", ...useCases];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const initialUse = (searchParams.get("use") as Filter) ?? "All";

  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<Filter>(
    filters.includes(initialUse) ? initialUse : "All",
  );

  const results = useMemo(() => {
    return products.filter(
      (product) =>
        (filter === "All" || product.use === filter) && matchesQuery(product, query),
    );
  }, [query, filter]);

  const counts = useMemo(() => {
    const searchMatched = products.filter((product) => matchesQuery(product, query));
    return {
      All: searchMatched.length,
      Road: searchMatched.filter((p) => p.use === "Road").length,
      Trail: searchMatched.filter((p) => p.use === "Trail").length,
      Training: searchMatched.filter((p) => p.use === "Training").length,
    } as Record<Filter, number>;
  }, [query]);

  return (
    <main id="main-content" className="shop">
      <div className="container shop-container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">All footwear</span>
        </nav>

        <header className="shop-head">
          <div className="shop-title">
            <p className="eyebrow">Full range</p>
            <h1>All footwear</h1>
            <p className="shop-lede">
              Every VELOCITY model, built for road, trail, and training. Filter by where you run,
              or search by name, terrain, or use case.
            </p>
          </div>

          <form
            className="shop-search"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="shop-search-input">Search footwear</label>
            <div className="shop-search-field">
              <SearchIcon />
              <input
                id="shop-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try road, trail, Aeroflow, carbon"
                autoComplete="off"
              />
            </div>
          </form>
        </header>

        <div className="shop-toolbar">
          <div className="shop-filters" role="group" aria-label="Filter by use case">
            {filters.map((option) => (
              <button
                key={option}
                type="button"
                className={filter === option ? "selected" : ""}
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option}
                <span className="filter-count">{counts[option]}</span>
              </button>
            ))}
          </div>
          <p className="shop-count" role="status" aria-live="polite">
            {results.length} {results.length === 1 ? "model" : "models"}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="shop-empty">
            <p className="shop-empty-title">Nothing matches yet</p>
            <p>
              No footwear for {query ? `“${query}”` : "that filter"}
              {filter !== "All" ? ` in ${filter}` : ""}. Try a different terrain, or clear your
              search.
            </p>
            <button
              type="button"
              className="pill pill-dark"
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="shop-grid">
            {results.map((product) => (
              <li className={`product-card ${product.tone}`} key={product.id}>
                <Link
                  className="product-card-link"
                  href={`/shop/${product.id}`}
                  aria-label={`View ${product.name} details`}
                >
                  <div className="product-image">
                    {product.gallery[0].startsWith("/") ? (
                      <Image
                        src={product.gallery[0]}
                        width={1536}
                        height={1024}
                        sizes="(max-width: 720px) 80vw, 30vw"
                        alt={product.imageAlt}
                        loading="lazy"
                      />
                    ) : (
                      <DecorativeShoe variant={product.gallery[0]} alt={product.imageAlt} />
                    )}
                  </div>
                  <div className="product-info">
                    <p className="product-index">
                      {product.index} / {product.use}
                    </p>
                    <h2>{product.name}</h2>
                    <p>{product.detail}</p>
                    <p className="product-meta">
                      <span>{product.category}</span>
                      <span>{currencyFormatter.format(product.price)}</span>
                    </p>
                    <p className="rating">
                      {product.rating} stars / {product.reviews} reviews
                    </p>
                    <p className="stock">{product.stock}</p>
                    <div className="swatches" aria-label={`${product.name} colors`}>
                      {product.colors.map((color) => (
                        <span key={color}>{color}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="shop-footer-cta">
          <Link className="text-link" href="/">
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
          <Link className="pill pill-dark" href="/#velocity-plus">
            Join Velocity+
          </Link>
        </div>
      </div>
    </main>
  );
}
