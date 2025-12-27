"use client";

import { use } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function SignupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

 
  const schema = z.object({
    name: z
      .string()
      .min(3, locale === "ar" ? "الاسم قصير جدًا" : "Name is too short")
      .max(12,locale ==="ar" ? "الاسم لا يزيد عن 12 حرف " : "You musn't exceed 12 letters "),

    email: z
      .string()
      .email(locale === "ar" ? "بريد إلكتروني غير صالح" : "Invalid email"),

    password: z
      .string()
      .min(
        6,
        locale === "ar"
          ? "كلمة المرور يجب ألا تقل عن 6 حروف"
          : "Password must be at least 6 characters"
      ),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    
    login({ name: data.name, email: data.email });
    router.push(`/${locale}`);
  };

  return (
    <section className="md:max-w-md w-full md:mx-auto px-4 py-16">
      <h1 className="mb-6 text-3xl font-bold ">
        {locale === "ar" ? "إنشاء حساب" : "Sign Up"}
      </h1>

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
          <input
            type="password"
            {...register("password")}
            placeholder={locale === "ar" ? "كلمة المرور" : "Password"}
            className={`w-full border px-4 py-2 rounded ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:opacity-90 transition"
        >
          {locale === "ar" ? "تسجيل" : "Sign Up"}
        </button>
      </form>
    </section>
  );
}
