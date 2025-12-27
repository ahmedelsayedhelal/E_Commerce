import Link from "next/link";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Home");

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {t("title")}
        </h1>

        <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
          {t("subtitle")}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/product"
            className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            {t("shopNow")}
          </Link>

          <Link
            href="/contact"
            className="rounded-md border px-6 py-3 text-sm font-medium hover:bg-muted transition"
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </section>
  );
}
