"use client";

import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavLinks } from "./NavLinks";
 import { useShopStore } from "@/store/useShopStore";
  import { AccountMenu } from "./AccountMenu";
import { ModeToggle } from "../theme/themetoggle";
import { useTranslations } from "next-intl";

export function Header() {
  const cartCount = useShopStore((state) =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0)
);
const t = useTranslations("Header")




  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-20">
        
        <Link href="/" className="text-xl font-bold">
        {t("head")}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ModeToggle/>

          <Link href="/wishlist" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </Link>

        <Link
         href="/cart"
        aria-label="Cart"
       className="flex items-center gap-1"
       >
  <ShoppingCart className="h-5 w-5" />

  {cartCount > 0 && (
    <span
      className="
        flex h-5 w-5 items-center justify-center
        rounded-full bg-red-500 text-xs text-white
      "
    >
      {cartCount}
    </span>
  )}
    </Link>
    <AccountMenu locale="" />

        </div>
      </div>
    </header>
  );
}
