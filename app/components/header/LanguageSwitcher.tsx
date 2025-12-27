"use client";

import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLang = (lang: "en" | "ar") => {
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex gap-2 text-sm font-medium">
      <button onClick={() => switchLang("en")} className="hover:underline">
        EN
      </button>
      |
      <button onClick={() => switchLang("ar")} className="hover:underline">
        AR
      </button>
    </div>
  );
}
