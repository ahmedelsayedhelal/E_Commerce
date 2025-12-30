import { NextResponse } from "next/server";
import products from "@/data/products.json";
import type { Product } from "@/app/components/types/product";

export async function GET(
  _req: Request,
  { params }: { params: Promise < { id: string } > }
) {
  const { id } = await params;

  const product = (products as Product[]).find(
    (p) => p.id === id
  );

  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  const relatedProducts = (products as Product[]).filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return NextResponse.json({
    product,
    relatedProducts
  });
}
