import ProductsClient from "@/app/components/product/Products";
import type { Metadata } from "next";
import type { Product } from "@/app/components/types/product";
import type { Category } from "@/app/components/types/category";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr ? "المنتجات" : "Products",
    description: isAr
      ? "تصفح جميع المنتجات المتاحة في المتجر"
      : "Browse all available products in our store"
  };
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/product`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products;
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();
  return data.categories;
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <section className="mx-auto max-w-6xl py-16">
      <ProductsClient
        products={products}
        categories={categories}
        locale={locale}
      />
    </section>
  );
}
