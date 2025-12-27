import { notFound } from "next/navigation";
import type { Product } from "@/data/products";
import { ProductsSort } from "@/app/components/category/ProductsSort";

type Props = {
  params: Promise <{
    locale: string;
    slug: string;
  }>;
};

async function getCategoryProducts(slug: string): Promise<Product[]> {

  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  return products.filter((product) => product.category === slug);
}


export default async function CategoryPage({ params }: Props) {
  const { locale, slug } = await params;

  const products = await getCategoryProducts(slug);

  if (products.length === 0) {
    notFound();
  }

  return (
    <section className="py-16">
      <h1 className="mb-8 text-3xl font-bold text-center capitalize">
        {slug}
      </h1>

      <ProductsSort products={products} locale={locale} />
    </section>
  );
}
