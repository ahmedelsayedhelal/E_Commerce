import { products } from "@/data/products";
import { categories } from "@/data/categories";
import ProductsClient from "@/app/components/product/Products";
import type { Metadata } from "next";


export async function generateMetadata(
  { params }: { params: Promise <{ locale: string }> }
): Promise<Metadata> {
  const {locale} = await params
  const isAr = locale === "ar";

  return {
    title: isAr ? "المنتجات" : "Products",
    description: isAr
      ? "تصفح جميع المنتجات المتاحة في المتجر"
      : "Browse all available products in our store",
  };
}


export default async function ProductsPage({
  params,
}: {
  params: Promise <{ locale: string }>;
}) {
    const {locale}= await params
  return (
    <section className="max-w-6xl mx-auto py-16">
      <ProductsClient
        products={products}
        categories={categories}
        locale={locale}
      />
    </section>
  );
}
