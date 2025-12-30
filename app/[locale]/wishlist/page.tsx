"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useShopStore } from "@/store/useShopStore";
import type { Product } from "@/app/components/types/product";
import {use} from "react" ;

type Props = {
  params: Promise < {
    locale: string;
  }>;
};

export default function WishlistPage({ params }: Props) {
  const { locale } =use (params);
  const t = useTranslations("Wishlist");

  const wishlist = useShopStore((s) => s.wishlist);
  const toggleWishlist = useShopStore((s) => s.toggleWishlist);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/product");
      if (!res.ok) return;

      const data = await res.json();
      setProducts(data.products);
    }

    fetchProducts();
  }, []);

  const wishlistProducts = products.filter((p) =>
    wishlist.includes(p.id)
  );

  if (wishlistProducts.length === 0) {
    return (
      <div className="py-20 text-center md:min-h-screen">
        <h1 className="mb-4 text-2xl font-semibold">
          {t("empty")}
        </h1>

        <Link
          href={`/${locale}`}
          className="text-primary hover:underline"
        >
          {t("back")}
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl py-16 px-4">
      <h1 className="mb-8 px-4 text-3xl font-bold">
        {t("title")}
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border p-4"
          >
            <Image
              src={product.image}
              alt={
                locale === "ar"
                  ? product.name_ar
                  : product.name_en
              }
              width={300}
              height={200}
              className="mb-4 rounded-md object-cover"
            />

            <h2 className="font-medium">
              {locale === "ar"
                ? product.name_ar
                : product.name_en}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              ${product.price}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <Link
                href={`/${locale}/product/${product.id}`}
                className="text-sm text-primary hover:underline"
              >
                {t("view")}
              </Link>

              <button
                onClick={() =>
                  toggleWishlist(product.id)
                }
                className="text-sm text-red-500 hover:underline"
              >
                {t("remove")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
