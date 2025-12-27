import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getMessages} from 'next-intl/server';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/Footer';
import { ThemeProvider } from '../components/theme/themeprovider';
import { Toaster } from "sonner";
import type { Metadata } from "next";


import "../globals.css";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: {
      default: isAr ? "المتجر الإلكتروني" : "Online Store",
      template: isAr
        ? "%s | المتجر الإلكتروني"
        : "%s | Online Store",
    },
    description: isAr
      ? "أفضل متجر إلكتروني لشراء المنتجات بأفضل الأسعار"
      : "The best online store to buy products at the best prices",

    alternates: {
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
  };
}


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}   suppressHydrationWarning>
      <body className='min-h-screen flex flex-col'>
        <ThemeProvider   attribute="class"
          defaultTheme="system"
          enableSystem>
        <NextIntlClientProvider  messages={messages}>
          <Header />
          <Toaster position="bottom-right" richColors closeButton />
          <main className='flex-1'>
           {children}

          </main>
          <Footer />
        </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
