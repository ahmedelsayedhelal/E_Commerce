import { notFound } from "next/navigation";
import { ProductsSort } from "@/app/components/category/ProductsSort";
import type { Product } from "@/app/components/types/product";

type PageProps = {
  params: Promise < {
    locale: string;
    slug: string;
  }>;
};

async function getCategoryProducts(slug: string): Promise<Product[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/product`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  const products: Product[] = data.products;

  return products.filter(
    (product) => product.category === slug
  );
}

export default async function CategoryPage({
  params
}: PageProps) {
  const { locale, slug } = await params;

  const products = await getCategoryProducts(slug);

  if (products.length === 0) {
    notFound();
  }

  return (
    <section className="py-16">
      <h1 className="mb-8 text-center text-3xl font-bold capitalize">
        {slug}
      </h1>

      <ProductsSort products={products} locale={locale} />
    </section>
  );
}
