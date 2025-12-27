"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type Props = {
  locale: string;
};

export function ContactForm({ locale }: Props) {
  const schema = z.object({
    name: z
      .string()
      .min(3, locale === "ar" ? "الاسم قصير جدًا" : "Name is too short"),

    email: z
      .string()
      .email(locale === "ar" ? "بريد إلكتروني غير صالح" : "Invalid email"),

    message: z
      .string()
      .min(
        10,
        locale === "ar"
          ? "الرسالة قصيرة جدًا"
          : "Message must be at least 10 characters"
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

  const onSubmit = (data: FormData) => {
    console.log(data);

    toast.success(
      locale === "ar"
        ? "تم إرسال الرسالة بنجاح"
        : "Message sent successfully"
    );

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("name")}
          placeholder={locale === "ar" ? "الاسم" : "Name"}
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
          placeholder="Email"
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
          placeholder={locale === "ar" ? "رسالتك" : "Your message"}
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
        className="w-full bg-primary text-white py-2 rounded hover:opacity-90 transition"
      >
        {locale === "ar" ? "إرسال" : "Send"}
      </button>
    </form>
  );
}
