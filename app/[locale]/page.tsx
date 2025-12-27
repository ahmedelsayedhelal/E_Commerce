
import { Hero } from "../components/home/Hero";
import { FeaturedCategories } from "../components/home/FeaturedCategories";
import { Featuredproducts } from "../components/home/Featuredproducts";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";


  return {
    title: isAr ? "الرئيسية" : "Home",
    description: isAr
      ? "تسوق أحدث المنتجات بأفضل الأسعار"
      : "Shop the latest products at the best prices",
  };
}





export default async function Home({ params }: { params: Promise < {locale: string}> } ) {

  const { locale } = await params;

  return (
    <>
      <Hero  />
      <FeaturedCategories locale={locale} />
      <Featuredproducts locale={locale} />
    </>
  );
}

