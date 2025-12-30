import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductClient from "@/app/components/product/ProductClient";
import type { Product } from "@/app/components/types/product";
import ProductJsonLd from "@/app/components/product/Product-Json-Ld";
import BreadcrumbJsonLd from "@/app/components/product/BreadcrumbJsonLd";

type PageProps = {
  params: Promise < { locale: string; id: string }>;
};

async function getProduct(id: string) {
  
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`,
   
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { locale, id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const isAr = locale === "ar";

  const data = await getProduct(id);

  if (!data) {
    return {
      title: isAr ? "منتج غير موجود" : "Product not found"
    };
  }

  const product: Product = data.product;

  return {
    title: isAr ? product.name_ar : product.name_en,
    description: isAr
      ? product.description_ar
      : product.description_en

      ,alternates: {
      canonical: `${baseUrl}/${locale}/product/${id}`,
      languages: {
        en: `${baseUrl}/en/product/${id}`,
        ar: `${baseUrl}/ar/product/${id}`,
      },
    },
  };
  };


export default async function ProductPage({ params }:PageProps) {
  const { locale, id } = await params;

  const data = await getProduct(id);

  if (!data) {
    notFound();
  }

  const { product, relatedProducts } = data;

  return (
    <>
     <BreadcrumbJsonLd product={product} locale={locale} />
    <ProductJsonLd product={product} locale={locale}/>
    <ProductClient
      product={product}
      relatedProducts={relatedProducts}
      locale={locale}
    />
    </>
  );
}
