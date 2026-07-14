"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { currencyFormatter, type Product, type Review } from "../../products";
import { DecorativeShoe } from "../../graphics";
import { useCart } from "../../CartContext";

function trackEvent(name: string, payload?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("velocity:analytics", { detail: { name, ...payload } }));
}

function galleryLabel(image: string) {
  return image.startsWith("/") ? "Profile" : (image.split("-").pop() ?? "View");
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span className="stars" aria-hidden="true">
      {"★".repeat(rounded)}
      <span className="stars-empty">{"★".repeat(5 - rounded)}</span>
    </span>
  );
}

export default function DetailClient({
  product,
  related,
  reviews,
}: {
  product: Product;
  related: Product[];
  reviews: Review[];
}) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const [sizeError, setSizeError] = useState("");
  const soldOut = product.stock === "Out of stock";

  function addToCart() {
    if (!selectedSize) {
      setSizeError("Choose a size before adding this shoe to your bag.");
      return;
    }
    addItem(product, selectedColor, selectedSize);
    trackEvent("add_to_cart", { product: product.id, size: selectedSize, source: "detail" });
  }

  const isPhoto = activeImage.startsWith("/");

  return (
    <main id="main-content" className="detail">
      <div className="container detail-container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop">All footwear</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="detail-grid">
          <div className="detail-gallery">
            <div className={`detail-hero ${product.tone}`}>
              {isPhoto ? (
                <Image
                  src={activeImage}
                  width={1536}
                  height={1024}
                  priority
                  sizes="(max-width: 900px) 92vw, 46vw"
                  alt={product.imageAlt}
                />
              ) : (
                <DecorativeShoe variant={activeImage} alt={product.imageAlt} />
              )}
            </div>
            <div className="detail-thumbs" role="group" aria-label={`${product.name} views`}>
              {product.gallery.map((image) => (
                <button
                  key={image}
                  type="button"
                  className={`detail-thumb ${product.tone} ${activeImage === image ? "selected" : ""}`}
                  aria-pressed={activeImage === image}
                  aria-label={`View ${galleryLabel(image)}`}
                  onClick={() => setActiveImage(image)}
                >
                  {image.startsWith("/") ? (
                    <Image src={image} width={200} height={134} alt="" />
                  ) : (
                    <DecorativeShoe variant={image} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="detail-buy">
            <p className="eyebrow">
              {product.index} / {product.use}
            </p>
            <h1>{product.name}</h1>
            <p className="detail-category">{product.category}</p>
            <p className="detail-rating">
              <Stars rating={product.rating} />
              <span>
                {product.rating} / {product.reviews} reviews
              </span>
            </p>
            <p className="detail-lede">
              {product.detail} for runners who want premium performance without wasted motion.
              Engineered, tested, and tuned for {product.use.toLowerCase()} days.
            </p>
            <p className="detail-price">{currencyFormatter.format(product.price)}</p>
            <p className={`stock detail-stock ${soldOut ? "out" : ""}`}>{product.stock}</p>

            <fieldset>
              <legend>Color</legend>
              <div className="choice-row">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={selectedColor === color ? "selected" : ""}
                    aria-pressed={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>
                Size <Link href="/#size-guide">Size guide</Link>
              </legend>
              <div className="choice-row">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={selectedSize === size ? "selected" : ""}
                    aria-pressed={selectedSize === size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError("");
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>

            {!selectedSize && !soldOut && (
              <p className="form-help" role="status">
                Select a size to unlock Add to Cart.
              </p>
            )}
            {sizeError && (
              <p className="form-error" role="alert">
                {sizeError}
              </p>
            )}

            <button
              className="pill pill-dark add-button detail-add"
              disabled={!selectedSize || soldOut}
              onClick={addToCart}
            >
              {soldOut ? "Sold out" : "Add to cart"}
            </button>

            <ul className="detail-reassurance">
              <li>Free Bangkok express delivery over ฿4,000</li>
              <li>30-day road-test returns</li>
              <li>1-year outsole warranty</li>
              <li>Encrypted secure checkout</li>
            </ul>
          </div>
        </div>

        <section className="detail-specs" aria-labelledby="specs-title">
          <h2 id="specs-title">Specifications</h2>
          <dl className="spec-list detail-spec-list">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {reviews.length > 0 && (
          <section className="detail-reviews" aria-labelledby="reviews-title">
            <div className="detail-reviews-head">
              <h2 id="reviews-title">What runners say</h2>
              <p className="detail-reviews-summary">
                <Stars rating={product.rating} /> {product.rating} average / {product.reviews} reviews
              </p>
            </div>
            <ul className="detail-reviews-grid">
              {reviews.map((review) => (
                <li key={review.author}>
                  <figure>
                    <p className="review-rating">
                      <Stars rating={review.rating} />
                      <span className="sr-only">{review.rating} out of 5</span>
                    </p>
                    <blockquote>{review.quote}</blockquote>
                    <figcaption>
                      <strong>{review.author}</strong>
                      <span>{review.location}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section className="detail-related" aria-labelledby="related-title">
            <div className="section-heading">
              <h2 id="related-title">Pairs well with</h2>
              <Link href="/shop">View all footwear &rarr;</Link>
            </div>
            <ul className="shop-grid">
              {related.map((item) => (
                <li className={`product-card ${item.tone}`} key={item.id}>
                  <Link
                    className="product-card-link"
                    href={`/shop/${item.id}`}
                    aria-label={`View ${item.name} details`}
                  >
                    <div className="product-image">
                      {item.gallery[0].startsWith("/") ? (
                        <Image
                          src={item.gallery[0]}
                          width={1536}
                          height={1024}
                          sizes="(max-width: 720px) 80vw, 30vw"
                          alt={item.imageAlt}
                          loading="lazy"
                        />
                      ) : (
                        <DecorativeShoe variant={item.gallery[0]} alt={item.imageAlt} />
                      )}
                    </div>
                    <div className="product-info">
                      <p className="product-index">
                        {item.index} / {item.use}
                      </p>
                      <h3>{item.name}</h3>
                      <p>{item.detail}</p>
                      <p className="product-meta">
                        <span>{item.category}</span>
                        <span>{currencyFormatter.format(item.price)}</span>
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
