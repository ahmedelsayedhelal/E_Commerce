"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Product } from "../types/product";

type Props = {
  products: Product[];
  locale: string;
};

export function ProductsSort({ products, locale }: Props) {
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const t = useTranslations("Products");

  const sortedProducts = [...products].sort((a, b) =>
    sort === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <>
      
      <div className="mb-6 flex items-center justify-center gap-2 px-6">
        <label className="text-sm font-medium">
          {t("sort.label")}
        </label>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as "asc" | "desc")
          }
          className="rounded-md border px-3 py-1 text-sm"
        >
          <option value="asc">
            {t("sort.lowToHigh")}
          </option>
          <option value="desc">
            {t("sort.highToLow")}
          </option>
        </select>
      </div>

    
      <div className="grid w-full gap-6 px-4 md:grid-cols-3">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/${locale}/product/${product.id}`}
            className="
              rounded-lg border p-4
              flex flex-col text-center
              transition hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-primary
            "
          >
            <div className="relative mb-4 h-80 w-full">
              <Image
                src={product.image}
                 alt={t("imageAlt", {
                 name: locale === "ar"
                  ? product.name_ar
                : product.name_en
  })}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="rounded-md object-contain"
              />
            </div>

            <h2 className="text-lg font-medium">
              {locale === "ar"
                ? product.name_ar
                : product.name_en}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              ${product.price}
            </p>

            <span className="mt-3 text-sm font-medium text-primary">
              {t("view")}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
