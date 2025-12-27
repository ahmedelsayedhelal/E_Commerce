"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useShopStore } from "@/store/useShopStore";
import { useTranslations } from "next-intl";

export function AccountMenu({ locale }: { locale: string }) {
  const user = useAuthStore((s) => s.user);
  const clearcart = useShopStore((c)=> c.clearCart)
  const clearwishlist = useShopStore((S)=>S.clearwishlist)
  const logout = useAuthStore((s) => s.logout);
  const t = useTranslations("auth");

  const handellogout =()=>{
    logout();
    clearcart();
    clearwishlist();

  }

  if (!user) {
    return (
      <Link
        href="/signup"
        className="hover:underline whitespace-nowrap"
      >
        {t("signup")}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button
        className="
          font-medium py-2 px-2
          rounded-md
          hover:bg-muted
          transition
          whitespace-nowrap
        "
      >
        {user.name}
      </button>

      <div
        className="
          absolute top-full left-1/2
          -translate-x-1/2
          z-50 mt-2 w-44
          rounded-lg border bg-white shadow-lg
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-150
        "
      >
        <Link
          href={`/${locale}/wishlist`}
          className="
            block py-2 text-sm text-center
            hover:bg-muted transition
          "
        >
          {locale === "ar" ? "المفضلة" : "Wishlist"}
        </Link>

        <button
          onClick={handellogout}
          className="
            block w-full py-2 text-sm text-center
            hover:bg-muted transition
          "
        >
          {locale === "ar" ? "تسجيل الخروج" : "Logout"}
        </button>
      </div>
    </div>
  );
}
