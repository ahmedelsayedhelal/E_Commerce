"use client";

import Image from "next/image";
import Link from "next/link";
import { useShopStore } from "@/store/useShopStore";
import {use} from "react";

export default function CartPage({
  params,
}: {
  params: Promise < { locale: string }>;
}) {
  const { locale } = use(params);

  const cart = useShopStore((s) => s.cart);
  const removeFromCart = useShopStore((s) => s.removeFromCart);
  const updateQuantity = useShopStore((s) => s.updateQuantity);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center md:min-h-screen">
        <h1 className="text-2xl font-semibold mb-4">
          {locale === "ar" ? "السلة فارغة" : "Your cart is empty"}
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
        {locale === "ar" ? "سلة التسوق" : "Shopping Cart"}
      </h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b pb-4"
          >
            <Image
              src={item.image}
              alt={locale === "ar" ? item.name_ar : item.name_en}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />

            <div className="flex-1">
              <h2 className="font-medium">
                {locale === "ar" ? item.name_ar : item.name_en}
              </h2>

              <p className="text-sm text-muted-foreground">
                ${item.price}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  className="px-2 border rounded"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  className="px-2 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-sm text-red-500 hover:underline px-4"
            >
              {locale === "ar" ? "حذف" : "Remove"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center">
        <p className="text-xl font-semibold px-4">
          {locale === "ar" ? "الإجمالي:" : "Subtotal:"} $
          {subtotal.toFixed(2)}
        </p>
      <Link  href="/checkout"
        aria-label="Checkout">
        <button
          className="rounded-md bg-primary px-6 py-3 text-white hover:opacity-90"
        >
          {locale === "ar" ? "إتمام الشراء" : "Checkout"}
        </button>
        </Link>
      </div>
    </section>
  );
}
