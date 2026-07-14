"use client";

import Link from "next/link";
import { CartButton } from "./CartDrawer";

// Shared sticky header for the shop and detail routes (the home page has its own
// richer header with search + mobile drawer). Keeps the cart button consistent.
export function StoreHeader() {
  return (
    <header className="site-header">
      <div className="container nav-container">
        <Link className="wordmark" href="/" aria-label="Velocity home">
          Velocity
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/shop">All footwear</Link>
          <Link href="/#technology">Technology</Link>
          <Link href="/#story">Stories</Link>
          <Link href="/#velocity-plus">Velocity+</Link>
        </nav>
        <div className="nav-actions">
          <CartButton />
          <Link className="pill pill-dark" href="/">
            Home
          </Link>
        </div>
      </div>
    </header>
  );
}
