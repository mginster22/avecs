import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } =await  params;

  if (!slug) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { slug },
  
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}