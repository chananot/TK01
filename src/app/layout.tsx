import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./CartContext";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://velocity.run"),
  title: "VELOCITY Running Shoes | Move Without Limits",
  description: "Premium performance running shoes for road, trail, and training. Shop VELOCITY Aeroflow 01 with THB pricing, secure checkout, fast delivery, and 30-day returns.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "VELOCITY Running Shoes | Move Without Limits",
    description: "Bold premium running footwear engineered for forward motion.",
    url: "/",
    siteName: "VELOCITY",
    images: [{ url: "/velocity-shoe.png", width: 1536, height: 1024, alt: "VELOCITY Aeroflow 01 running shoe" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VELOCITY Running Shoes | Move Without Limits",
    description: "Premium performance shoes for road, trail, and training.",
    images: ["/velocity-shoe.png"],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
