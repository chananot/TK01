"use client";

import { useRef } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { currencyFormatter } from "./products";
import { DecorativeShoe, BagIcon, CloseIcon } from "./graphics";
import { useDialogFocus } from "./useDialogFocus";

function trackEvent(name: string, payload?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("velocity:analytics", { detail: { name, ...payload } }));
}

export function CartButton() {
  const { quantity, openCart, cartOpen } = useCart();
  return (
    <button
      className="icon-button bag-button"
      aria-label={`Shopping bag, ${quantity} items`}
      aria-expanded={cartOpen}
      aria-controls="cart-dialog"
      onClick={openCart}
    >
      <BagIcon />
      {quantity > 0 && <span className="bag-badge">{quantity}</span>}
    </button>
  );
}

export function CartDrawer() {
  const { items, subtotal, cartOpen, closeCart, updateQuantity } = useCart();
  const cartRef = useRef<HTMLElement>(null);
  useDialogFocus(cartOpen, cartRef, closeCart);

  if (!cartOpen) return null;

  return (
    <aside
      className="drawer-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && closeCart()}
    >
      <section
        className="drawer cart-drawer"
        id="cart-dialog"
        ref={cartRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="drawer-header">
          <h2 id="cart-title">Shopping bag</h2>
          <button className="icon-button" aria-label="Close cart" onClick={closeCart}>
            <CloseIcon />
          </button>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your bag is empty.</p>
            <Link className="pill pill-dark" href="/shop" onClick={closeCart}>
              Shop footwear
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item, index) => (
                <article className="cart-item" key={`${item.product.id}-${item.size}-${item.color}`}>
                  <DecorativeShoe variant={item.product.gallery[1] ?? item.product.gallery[0]} />
                  <div>
                    <h3>{item.product.name}</h3>
                    <p>
                      {item.color} / {item.size}
                    </p>
                    <p>{currencyFormatter.format(item.product.price)}</p>
                    <label>
                      Qty{" "}
                      <input
                        type="number"
                        min="1"
                        max="9"
                        value={item.quantity}
                        onChange={(event) => updateQuantity(index, Number(event.target.value))}
                      />
                    </label>
                    <button className="text-link button-link" onClick={() => updateQuantity(index, 0)}>
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <p>
                <span>Subtotal</span>
                <strong>{currencyFormatter.format(subtotal)}</strong>
              </p>
              <button className="pill pill-dark" onClick={() => trackEvent("checkout", { value: subtotal })}>
                Checkout securely
              </button>
              <small>Taxes and delivery calculated at checkout.</small>
            </div>
          </>
        )}
      </section>
    </aside>
  );
}
