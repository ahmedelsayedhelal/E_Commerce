"use client";

import { use } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useShopStore } from "@/store/useShopStore";
import { useTranslations } from "next-intl";

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  const cart = useShopStore((s) => s.cart);
  const clearCart = useShopStore((s) => s.clearCart);

  const [step, setStep] = useState<"shipping" | "review" | "success">(
    "shipping"
  );
  const [shippingData, setShippingData] = useState<FormData | null >(null);
  const t = useTranslations("checkoutformvalidation");
  const c = useTranslations("checkout")

  const schema = z.object({
    name: z.string().min(3, t("name")),
    email: z
      .string()
      .email(t("email")),
    address: z
      .string()
      .min(5, t("address")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  
  const onSubmitShipping = (data: FormData) => {
    setShippingData(data);
    setStep("review");
  };

  
  const confirmOrder = () => {
    clearCart();
    setStep("success");
  };

  if (cart.length === 0 && step !== "success") {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold">
          {c("cartempty")}
        </h1>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="mb-8 text-3xl font-bold">
        {c("checkout")}
      </h1>

      {step === "shipping" && (
        <form
          onSubmit={handleSubmit(onSubmitShipping)}
          className="space-y-6"
        >
          <div>
            <input
              {...register("name")}
              placeholder={c("name")}
              className="w-full border rounded px-4 py-2"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("email")}
              placeholder={c("email")}
              className="w-full border rounded px-4 py-2"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("address")}
              placeholder={c("address")}
              className="w-full border rounded px-4 py-2"
            />
            {errors.address && (
              <p className="text-sm text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-md bg-primary px-6 py-3 text-white"
          >
            {c("next")}
          </button>
        </form>
      )}

      {step === "review" && (
        <div className="space-y-6">
          <div className="border rounded p-4">
            <h2 className="font-semibold mb-2">
              {c("Shoppinginfo")}
            </h2>
            <p>{shippingData?.name}</p>
            <p>{shippingData?.email}</p>
            <p>{shippingData?.address}</p>
          </div>

          <div className="border rounded p-4">
            <h2 className="font-semibold mb-2">
              {c("ordersummary")}
            </h2>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {locale === "ar" ? item.name_ar : item.name_en} ×{" "}
                  {item.quantity}
                </span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}

            <p className="mt-4 font-semibold">
              {c("total")} $
              {subtotal.toFixed(2)}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep("shipping")}
              className="border px-4 py-2 rounded"
            >
              {c("back")}
            </button>

            <button
              onClick={confirmOrder}
              className="bg-primary text-white px-6 py-2 rounded"
            >
              {c("confirmorder")}
            </button>
          </div>
        </div>
      )}

      {step === "success" && (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            {c("ordersucces")}
          </h2>
          <p className="text-muted-foreground">
            { c("thank")
              }
          </p>
        </div>
      )}
    </section>
  );
}
