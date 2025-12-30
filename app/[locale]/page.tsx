import { Hero } from "../components/home/Hero";
import { FeaturedCategories } from "../components/home/FeaturedCategories";
import { Featuredproducts } from "../components/home/Featuredproducts";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "metadatahero",
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const title = t("title");
  const description = t("description");

  return {
    title,
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
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: "E-Commerce",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/images/og-home.jpg`],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Hero />
      <FeaturedCategories locale={locale} />
      <Featuredproducts locale={locale} />
    </>
  );
}
