import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { use } from "react";
import type { Product } from "../types/product";

type Props = {
  locale: string;
};

async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/product`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products.slice(0, 3);
}

export function Featuredproducts({ locale }: Props) {
  const products = use(getFeaturedProducts());
  const t = useTranslations("Products");

  return (
    <section className="py-16 mx-auto px-4">
      <h2 className="mb-8 text-center text-2xl font-semibold">
        {t("featured")}
      </h2>

      <div className="grid gap-6 md:grid-cols-3 md:px-20">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/${locale}/product/${product.id}`}
            className="block rounded-lg border p-4 text-center transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <div className="relative mb-4 h-80 w-full">
              <Image
                src={product.image}
                alt={
                  locale === "ar"
                    ? product.name_ar
                    : product.name_en
                }
                 loading="eager"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="rounded-md object-contain"
              />                                                       
            </div>

            <h3 className="text-lg font-medium">
              {locale === "ar"
                ? product.name_ar
                : product.name_en}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              ${product.price}
            </p>

            <span className="mt-3 inline-block text-primary font-medium">
              {t("view")}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
