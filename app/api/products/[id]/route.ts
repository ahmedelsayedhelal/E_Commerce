import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(
  _req: Request,
  { params }: { params: Promise <{ id: string }> }
) {
  const { id } =  await params; 

  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return NextResponse.json({
    product,
    relatedProducts,
  });
}
