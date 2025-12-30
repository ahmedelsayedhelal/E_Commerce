"use client";

import { useSearchStore } from "@/store/useSearchStore";
import { useTranslations } from "next-intl";

export function SearchInput() {
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);
  const t = useTranslations("search")

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={
       t("search")
      }
      className="
        w-16 md:w-56 rounded-md border px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-primary
      "
    />
  );
}
