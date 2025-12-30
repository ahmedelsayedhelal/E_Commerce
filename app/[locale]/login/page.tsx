"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const t = useTranslations("auth");
  const f = useTranslations("contactform");

  const schema = z.object({
    name: z.string().min(3, f("name")).max(12, f("longname")),
    password: z.string().min(6, f("password")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
     setIsSubmitting(true);

   await new Promise((res) => setTimeout(res, 800));
    if (!user) {
      alert("No account found, please sign up first");
      return;
    }

    if (
      user.name !== data.name ||
      user.password !== data.password
    ) {
       
      alert("Username or password is not valid");

      
      setIsSubmitting(false);
      return;
    }
    login();
    router.push("/");
     setIsSubmitting(false);
  };

  return (
    <section className="w-full px-4 py-16 md:mx-auto md:max-w-md">
      <h1 className="mb-6 text-3xl font-bold">{t("login")}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name")}
            placeholder={t("name")}
            className="w-full rounded border px-4 py-2"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder={t("password")}
            className="w-full rounded border px-4 py-2"
          />
          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
           disabled={isSubmitting}
          className="w-full rounded bg-primary py-2 text-white"
        >
      {isSubmitting ? "Loading..." : t("login")}
        </button>
      </form>
    </section>
  );
}
