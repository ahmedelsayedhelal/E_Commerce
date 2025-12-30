"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useShopStore } from "@/store/useShopStore";
import { useTranslations } from "next-intl";

export function AccountMenu( ) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  const clearCart = useShopStore((s) => s.clearCart);
  const clearWishlist = useShopStore((s) => s.clearwishlist);

  const t = useTranslations("auth");
  const w = useTranslations("Wishlist")

  const handleLogout = () => {
    logout();
    clearCart();
    clearWishlist();
  };

  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-4 whitespace-nowrap">
        <Link
          href={`/login`}
          className="hover:underline"
        >
          {t("login")}
        </Link>

        <Link
          href={`/signup`}
          className="hover:underline"
        >
          {t("signup")}
        </Link>
      </div>
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
        {user?.name}
      </button>

      <div
        className="
          absolute top-full left-1/2
          -translate-x-1/2
          z-50 mt-2 w-44
          rounded-lg border bg-background shadow-lg
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-150
        "
      >
        <Link
          href={`/wishlist`}
          className="block py-2 text-sm text-center hover:bg-muted transition"
        >
          {w("title")}
        </Link>

        <button
          onClick={handleLogout}
          className="block w-full py-2 text-sm text-center hover:bg-muted transition"
        >
          {t("logout")}
        </button>
      </div>
    </div>
  );
}
