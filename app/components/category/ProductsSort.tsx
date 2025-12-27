"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type Props = {
  products: Product[];
  locale: string;
};

export function ProductsSort({ products, locale }: Props) {
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const sortedProducts = [...products].sort((a, b) =>
    sort === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <>
      <div className="mb-6 flex items-center justify-center px-6 gap-2">
        <label className="text-sm font-medium">
          {locale === "ar" ? "الترتيب:" : "Sort:"}
        </label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
          className="rounded-md border px-3 py-1 text-sm"
        >
          <option value="asc">
            {locale === "ar" ? "الأرخص أولًا" : "Price: Low to High"}
          </option>
          <option value="desc">
            {locale === "ar" ? "الأغلى أولًا" : "Price: High to Low"}
          </option>
        </select>
      </div>

      <div className="grid gap-6 px-4 w-full md:grid-cols-3">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="
              rounded-lg border p-4
              flex flex-col
              w-full
              text-center
              md:items-center
            "
          >
            <div className="relative mb-4 h-80 w-full">
              <Image
                src={product.image}
                alt={locale === "ar" ? product.name_ar : product.name_en}
                fill
                className="rounded-md object-contain"
              />
            </div>

            <h2 className="text-lg font-medium">
              {locale === "ar" ? product.name_ar : product.name_en}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              ${product.price}
            </p>

            <Link
              href={`/${locale}/product/${product.id}`}
              className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
            >
              {locale === "ar" ? "عرض المنتج" : "View Product"}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
