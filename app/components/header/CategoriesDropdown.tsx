"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { Category } from "../types/category";

type Props = {
  locale: string;
};

export function CategoriesDropdown({ locale }: Props) {
  const t = useTranslations("Header");
  const c = useTranslations("Categories")
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      if (!res.ok) return;

      const data = await res.json();
      setCategories(data.categories);
    }

    fetchCategories();
  }, []);

  return (
    <div className="relative group">
      <button
        className="
          hover:text-primary
          transition
          relative
          after:absolute
          after:start-0
          after:-bottom-1
          after:h-0.5
          after:w-0
          after:bg-primary
          after:transition-all
          group-hover:after:w-full
        "
      >
        {t("categories")}
      </button>

      <div
        className="
          absolute
          start-0
          top-full
          z-50
          mt-3
          w-48
          rounded-lg
          border
          bg-background
          shadow-lg
          opacity-0
          invisible
          translate-y-2
          transition-all
          duration-200
          group-hover:visible
          group-hover:opacity-100
          group-hover:translate-y-0
        "
      >
        <ul className="py-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/${locale}/category/${cat.slug}`}
                className="
                  block
                  px-4
                  py-2.5
                  text-sm
                  transition
                  hover:bg-muted
                  hover:text-primary
                "
              >
                {c(`${cat.slug}`)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
