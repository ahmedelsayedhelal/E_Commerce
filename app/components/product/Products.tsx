"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/components/types/product";
import type { Category } from "@/app/components/types/category";
import { useSearchStore } from "@/store/useSearchStore";
import { SearchInput } from "../header/SearchInput";
import { useTranslations } from "next-intl";

type Props = {
  products: Product[];
  categories: Category[];
  locale: string;
};

export default function ProductsClient({
  products,
  categories,
  locale,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchQuery = useSearchStore((s) => s.debouncedQuery);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory
      ? p.category === activeCategory
      : true;

    const matchesSearch =
      p.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name_ar.includes(searchQuery);

    return matchesCategory && matchesSearch;
  });
  const t = useTranslations("Products")

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold px-4">
        {t("allproducts")}
      </h1>

      <div className="mb-8 flex flex-wrap gap-3 px-4 pl-4">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-md border px-4 py-2 text-sm transition ${
            activeCategory === null ? "bg-muted" : "hover:bg-muted"
          }`}
        >
          {t("all")}
        </button>

           {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`rounded-md border px-4 py-2 text-sm transition ${
              activeCategory === cat.slug
                ? "bg-muted"
                : "hover:bg-muted"
            }`}
          >
            {t(`categories.${cat.slug}`)}
          </button>
        ))}
        <SearchInput />
      </div>

      <div className="grid gap-6 md:grid-cols-3 text-center px-4 items-center">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/${locale}/product/${product.id}`}
            className="rounded-lg border p-4 hover:bg-muted transition"
          >
            <div className="relative mb-4 h-64 w-full">
              <Image
                src={product.image}
                alt={locale === "ar" ? product.name_ar : product.name_en}
                fill
                loading="lazy"
                className="object-contain rounded-md"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <h3 className="font-medium">
              {locale === "ar" ? product.name_ar : product.name_en}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              ${product.price}
            </p>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          {t("nomatching")}
        </p>
      )}
    </>
  );
}
