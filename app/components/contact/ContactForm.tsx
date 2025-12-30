"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useState } from "react";



export function ContactForm() {
  const t = useTranslations("contactform")
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = z.object({
    name: z
      .string()
      .min(3, t("name")),

    email: z
      .string()
      .email(t("email")),

    message: z
      .string()
      .min(
        10,
        t("message")
      ),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
     setIsSubmitting(true);
      await new Promise((res) => setTimeout(res, 800));
    console.log(data);

    toast.success(
      t("submit")
    );
    setIsSubmitting(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
      <div>
        <input
          {...register("name")}
          placeholder={t("namee")}
          className={`w-full border px-4 py-2 rounded ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder={t("emaill")}
          className={`w-full border px-4 py-2 rounded ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <textarea
          {...register("message")}
          placeholder={t("messagee")}
          className={`w-full border px-4 py-2 rounded min-h-30 ${
            errors.message ? "border-red-500" : ""
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-2 rounded hover:opacity-90 transition"
      >
        {isSubmitting ? "Loading..." : t("submit")}
      </button>
    </form>
  );
}
