import Link from "next/link";
import { useTranslations } from "next-intl";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t bg-muted/30 mt-16 w-full px-4 md:px-20 ">
      <div className="w-full py-12">
        <div className="grid gap-10 md:grid-cols-3 items-center justify-between md:items-start">
          
          <div>
            <h2 className="text-xl font-bold">E-Shop</h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              {t("description")}
            </p>

            <div className="mt-4 flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <Github className="h-5 w-5 d" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="mb-4 text-sm font-semibold">
              {t("linksTitle")}
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="/product" className="hover:underline">
                  {t("products")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="text-sm text-muted-foreground md:text-end rtl:md:text-start">
            © {new Date().getFullYear()} E-Shop. {t("rights")}
          </div>
        </div>
      </div>
    </footer>
  );
}
