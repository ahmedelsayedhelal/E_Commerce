import Link from "next/link";
import { useTranslations } from "next-intl";
import { use } from "react";
import type { Category } from "../types/category";

type Props = {
  locale: string;
};

async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();
  return data.categories;
}

export function FeaturedCategories({ locale }: Props) {
  const categories = use(getCategories());
  const t = useTranslations("Categories");

  return (
    <section className="py-16">
      <h2 className="mb-8 text-2xl font-semibold text-center">
        {t("featured")}
      </h2>

      <div className="grid gap-6 md:grid-cols-3 px-4 md:px-20">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${locale}/category/${cat.slug}`}
            className="rounded-lg border p-6 text-center transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span className="text-lg font-medium">
              {t(`${cat.slug}`)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
