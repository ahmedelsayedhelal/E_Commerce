import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductClient from "./../../../components/product/ProductClient";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { locale, id } = await params;
  const isAr = locale === "ar";

  const res = await fetch(
    `http://localhost:3000/api/products/${id}`
  );

  if (!res.ok) {
    return {
      title: isAr ? "منتج غير موجود" : "Product not found",
    };
  }

  const { product } = await res.json();

  return {
    title: isAr ? product.name_ar : product.name_en,
    description: isAr
      ? product.description_ar
      : product.description_en,
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, id } = await params;

  const res = await fetch(
    `http://localhost:3000/api/products/${id}`
  );

  if (!res.ok) {
    notFound();
  }

  const { product, relatedProducts } = await res.json();

  return (
    <ProductClient
      product={product}
      relatedProducts={relatedProducts}
      locale={locale}
    />
  );
}
