import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "./ShopClient";
import { StoreHeader } from "../StoreHeader";
import { CartDrawer } from "../CartDrawer";

export const metadata: Metadata = {
  title: "All Footwear | VELOCITY Running Shoes",
  description:
    "Shop the full VELOCITY range: road, trail, and training running shoes with THB pricing, filter by terrain, and search by model.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <StoreHeader />
      <Suspense fallback={<div className="container shop-container" aria-busy="true" />}>
        <ShopClient />
      </Suspense>
      <CartDrawer />
    </>
  );
}
