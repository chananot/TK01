import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct, relatedProducts, getReviews, currencyFormatter } from "../../products";
import { StoreHeader } from "../../StoreHeader";
import { CartDrawer } from "../../CartDrawer";
import DetailClient from "./DetailClient";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product not found | VELOCITY" };
  const title = `${product.name} | VELOCITY Running Shoes`;
  const description = `${product.category}. ${product.detail}. ${currencyFormatter.format(
    product.price,
  )} with THB pricing, free Bangkok delivery over ฿4,000, and 30-day returns.`;
  return {
    title,
    description,
    alternates: { canonical: `/shop/${product.id}` },
    openGraph: {
      title,
      description,
      url: `/shop/${product.id}`,
      type: "website",
      images: [{ url: "/velocity-shoe.png", width: 1536, height: 1024, alt: product.imageAlt }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = relatedProducts(product);
  const reviews = getReviews(product.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `${product.category}. ${product.detail}.`,
    image: "https://velocity.run/velocity-shoe.png",
    brand: { "@type": "Brand", name: "Velocity" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 },
      author: { "@type": "Person", name: review.author },
      reviewBody: review.quote,
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: "THB",
      price: product.price,
      availability:
        product.stock === "Out of stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: `https://velocity.run/shop/${product.id}`,
    },
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <StoreHeader />
      <DetailClient product={product} related={related} reviews={reviews} />
      <CartDrawer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
