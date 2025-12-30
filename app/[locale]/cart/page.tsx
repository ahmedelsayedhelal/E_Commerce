"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useShopStore } from "@/store/useShopStore";
import {use} from "react"

type Props = {
  params: Promise < {
    locale: string;
  }>;
};

export default function CartPage({ params }: Props) {
  const { locale } = use(params);
  const t = useTranslations("Cart");

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

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b pb-4"
          >
            <Image
              src={item.image}
              alt={
                locale === "ar"
                  ? item.name_ar
                  : item.name_en
              }
              loading="lazy"
              width={80}
              height={80}
            
              className="rounded-md object-cover"
            />

            <div className="flex-1">
              <h2 className="font-medium">
                {locale === "ar"
                  ? item.name_ar
                  : item.name_en}
              </h2>

              <p className="text-sm text-muted-foreground">
                ${item.price}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  className="rounded border px-2"
                  aria-label={t("decrease")}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  className="rounded border px-2"
                  aria-label={t("increase")}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="px-4 text-sm text-red-500 hover:underline"
            >
              {t("remove")}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between px-4">
        <p className="text-xl font-semibold">
          {t("subtotal")}: ${subtotal.toFixed(2)}
        </p>

        <Link
          href={`/${locale}/checkout`}
          aria-label="Checkout"
          className="rounded-md bg-primary px-6 py-3 text-white hover:opacity-90"
        >
          {t("checkout")}
        </Link>
      </div>
    </section>
  );
}
