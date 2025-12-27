import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { useTranslations } from "next-intl";
import { use } from 'react';

type Props = {
  locale: string;
};

async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();
  return products.slice(0, 3);
}

export  function Featuredproducts({ locale }: Props) {
  const products =  use(getFeaturedProducts());
  const t = useTranslations("Header");


  return (
    <section className="py-16 mx-auto px-4">
      <h2 className="mb-8 text-center text-2xl font-semibold">
        {t("featuredProducts")}
      </h2>

      <div className="grid gap-6 md:grid-cols-3 px-20">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center text-center rounded-lg border p-4"
          >
            <div className="relative mb-4 h-80 w-full">
              <Image
                src={product.image}
                alt={locale === "ar" ? product.name_ar : product.name_en}
                fill
                className="rounded-md object-contain"
              />
            </div>

            <h3 className="text-lg font-medium">
              {locale === "ar" ? product.name_ar : product.name_en}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              ${product.price}
            </p>

            <Link
              href={`/${locale}/product/${product.id}`}
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              {t("viewProduct")}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
