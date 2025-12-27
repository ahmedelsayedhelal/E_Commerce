"use client";

import { useSearchStore } from "@/store/useSearchStore";

export function SearchInput({ locale }: { locale: string }) {
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={
        locale === "ar"
          ? "ابحث عن منتج..."
          : "Search products..."
      }
      className="
        w-16 md:w-56 rounded-md border px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-primary
      "
    />
  );
}
