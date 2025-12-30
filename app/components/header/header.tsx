"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Menu, X, ChevronDown } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavLinks } from "./NavLinks";
import { useShopStore } from "@/store/useShopStore";
import { AccountMenu } from "./AccountMenu";
import { ModeToggle } from "../theme/themetoggle";
import { useTranslations, useLocale } from "next-intl";

export function Header() {
  const [open, setOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);

  const cartCount = useShopStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  const t = useTranslations("Header");
  const c = useTranslations("Categories");
  const locale = useLocale();

  return (
    <>
  
      <header className="w-full px-4 md:px-20 top-0 z-50 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">

         
          <div className="flex items-center gap-3">
         
            <button
              onClick={() => setOpen(true)}
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link href={`/${locale}`} className="text-xl font-bold">
              {t("head")}
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ModeToggle />

            <Link href="/wishlist" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex items-center"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>
             <div className="hidden md:block">
              <AccountMenu  />
             </div>
            
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="flex items-center justify-between border-b p-4">
            <span className="text-lg font-bold">{t("head")}</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-6 p-6 text-center">

          <Link href={`/${locale}`} className="hover:underline" onClick={() => setOpen(false)}>
        {t("home")}
         </Link>

        <Link href={`/${locale}/about`} className="hover:underline" onClick={() => setOpen(false)}>
        {t("about")}
      </Link>
        <Link href={`/${locale}/contact`} className="hover:underline" onClick={() => setOpen(false)}>
        {t("contact")}
      </Link>
      <div onClick={() => setOpen(false)}>
        <AccountMenu/>

      </div>
      
            <div className="w-full">
              <button
                onClick={() => setOpenCategories((prev) => !prev)}
                className="mx-auto flex items-center gap-2 font-medium hover:text-primary transition"
              >
                {t("categories")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openCategories ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openCategories && (
                   <ul className="mt-4 flex flex-col gap-3">
               < li>
            <Link href={`/${locale}/category/electronics`} onClick={() => setOpen(false)}>
           {c("electronics")}
           </Link>
           </li>

            <li>
            <Link href={`/${locale}/category/apparel`} onClick={() => setOpen(false)}>
             {c("apparel")}
           </Link>
           </li>

            <li>
            <Link href={`/${locale}/category/accessories`} onClick={() => setOpen(false)}>
            {c("accessories")}
           </Link>
          </li>
           </ul> )}
            </div>


           
          </div>
        </div>
      )}
    </>
  )};