"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

import { CategoriesDropdown } from "./CategoriesDropdown";

export function NavLinks() {
  const t = useTranslations("Header");
  const locale = useLocale();

  return (
    <nav className="flex gap-6 items-center">
      <Link href={`/${locale}`} className="hover:underline">
        {t("home")}
      </Link>

        <Link href={`/${locale}/about`} className="hover:underline">
        {t("about")}
      </Link>
        <Link href={`/${locale}/contact`} className="hover:underline">
        {t("contact")}
      </Link>

      <CategoriesDropdown locale={locale} />
    </nav>
  );
}
