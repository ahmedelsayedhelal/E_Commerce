"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { WishlistButton } from "@/app/components/wishlist/WishlistButton";
import { useShopStore } from "@/store/useShopStore";
import type { Product } from "@/data/products";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";


type ProductClientProps = {
  product: Product;
  relatedProducts: Product[];
  locale: string;
};


export default function ProductClient({
  product,
  relatedProducts,
  locale,
}: ProductClientProps) {
  const addToCart = useShopStore((s) => s.addToCart);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const increaseQty = () => setQty((q) => q + 1);
  const decreaseQty = () => setQty((q) => (q > 1 ? q - 1 : 1));
  const user = useAuthStore((s) => s.user);
const router = useRouter();


 const handleAddToCart = () => {
  if (!user) {
        router.push(`/signup`);
    return;
  }
  for (let i = 0; i < qty; i++) {
    addToCart(product);
  }

  toast.success(
    locale === "ar"
      ? "تمت إضافة المنتج إلى السلة"
      : "Product added to cart",
    {
      description:
        locale === "ar"
          ? `الكمية: ${qty}`
          : `Quantity: ${qty}`,
    }
  );

  setAdded(true);
  setTimeout(() => setAdded(false), 1200);
};

  const outOfStock = !product.inStock;

  return (
    <section className="py-16 max-w-4xl mx-auto">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative h-96 w-full rounded-lg border p-4">
          <Image
            src={product.image}
            alt={locale === "ar" ? product.name_ar : product.name_en}
            fill
            className="object-contain rounded-md"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <h1 className="mb-4 text-3xl px-4 font-bold">
            {locale === "ar" ? product.name_ar : product.name_en}
          </h1>

          <p className="mb-4 text-xl px-4 font-semibold">
            ${product.price}
          </p>

          <p className="mb-6 text-muted-foreground px-4">
            {locale === "ar"
              ? product.description_ar
              : product.description_en}
          </p>

          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-medium px-4">
              {locale === "ar" ? "الكمية:" : "Quantity:"}
            </span>

            <div className="flex items-center border rounded-md px-4">
              <button
                onClick={decreaseQty}
                className="px-4 py-2 hover:bg-muted"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span className="px-4 select-none">{qty}</span>

              <button
                onClick={increaseQty}
                className="px-3 py-2 hover:bg-muted"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 items-center px-4">
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className={`rounded-md px-6 py-3 text-white transition ${
                outOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:opacity-90"
              }`}
            >
              {outOfStock
                ? locale === "ar"
                  ? "غير متوفر"
                  : "Out of stock"
                : added
                ? locale === "ar"
                  ? "تمت الإضافة ✓"
                  : "Added ✓"
                : locale === "ar"
                ? "أضف إلى السلة"
                : "Add to Cart"}
            </button>

            <WishlistButton productId={product.id} locale={locale} />
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16 px-4">
          <h2 className="mb-6 text-2xl font-semibold">
            {locale === "ar" ? "منتجات مشابهة" : "Related Products"}
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedProducts.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                href={`/${locale}/product/${p.id}`}
                className="rounded-lg border p-4 hover:bg-muted transition"
              >
                <h3 className="font-medium">
                  {locale === "ar" ? p.name_ar : p.name_en}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  ${p.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
