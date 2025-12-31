import Script from "next/script";
import type { Product } from "@/app/components/types/product"
import { useTranslations } from "next-intl";

type Props = {
  locale: string;
  product: Product;
};

export default function BreadcrumbJsonLd({
  locale,
  product,
}: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const t = useTranslations("Header");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("Home"),
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category,
        item: `${baseUrl}/${locale}/category/${product.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name:
          locale === "ar"
            ? product.name_ar
            : product.name_en,
        item: `${baseUrl}/${locale}/product/${product.id}`,
      },
    ],
  };

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
