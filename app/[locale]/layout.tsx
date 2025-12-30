import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/Footer";
import { ThemeProvider } from "../components/theme/themeprovider";
import { Toaster } from "sonner";
import type { Metadata } from "next";

import "../globals.css";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const titleDefault = isAr ? "المتجر الإلكتروني" : "Online Store";
  const description = isAr
    ? "أفضل متجر إلكتروني لشراء المنتجات بأفضل الأسعار"
    : "The best online store to buy products at the best prices";

  return {
    title: {
      default: titleDefault,
      template: isAr
        ? "%s | المتجر الإلكتروني"
        : "%s | Online Store",
    },
    description,

    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
        "x-default": `${baseUrl}/en`,
      },
    },

    openGraph: {
      title: titleDefault,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: "Online Store",
      locale: isAr ? "ar_EG" : "en_US",
      type: "website",
    },

    twitter: {
      card: "summary",
      title: titleDefault,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <Toaster position="bottom-right" richColors closeButton />
            <main className="flex-1">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
