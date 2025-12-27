"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useShopStore } from "@/store/useShopStore";
import { products } from "@/data/products";

export default function WishlistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  const wishlist = useShopStore((s) => s.wishlist);
  const toggleWishlist = useShopStore((s) => s.toggleWishlist);

  const wishlistProducts = products.filter((p) =>
    wishlist.includes(p.id)
  );

  if (wishlistProducts.length === 0) {
    return (
      <div className="py-20 text-center md:min-h-screen">
        <h1 className="text-2xl font-semibold mb-4 ">
          {locale === "ar"
            ? "قائمة المفضلة فارغة"
            : "Your wishlist is empty"}
        </h1>

        <Link
          href={`/${locale}`}
          className="text-primary hover:underline"
        >
          {locale === "ar"
            ? "العودة للصفحة الرئيسية"
            : "Back to home"}
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-16">
      <h1 className="mb-8 text-3xl font-bold px-4">
        {locale === "ar" ? "المفضلة" : "Wishlist"}
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border p-4"
          >
            <Image
              src={product.image}
              alt={locale === "ar" ? product.name_ar : product.name_en}
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

            <div className="mt-4 flex justify-between items-center">
              <Link
                href={`/${locale}/product/${product.id}`}
                className="text-sm text-primary hover:underline"
              >
                {locale === "ar" ? "عرض المنتج" : "View product"}
              </Link>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="text-sm text-red-500 hover:underline"
              >
                {locale === "ar" ? "إزالة" : "Remove"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
