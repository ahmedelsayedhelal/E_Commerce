import Script from "next/script";
import type { Product } from "@/app/components/types/product";

type Props = {
  product: Product;
  locale: string;
};

export default function ProductJsonLd({ product, locale }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: locale === "ar" ? product.name_ar : product.name_en,
    description:
      locale === "ar"
        ? product.description_ar
        : product.description_en,
    image: `${product.image}`,
    sku: product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/product/${product.id}`,
    },
  };

  return (
    <Script
      id="product-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
