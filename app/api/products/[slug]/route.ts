import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
) {
  const { slug } = await params;
  try {
    const body = await req.json();
    const {
      title,
      category,
      categorySlug,
      gender,
      model,
      slug,
      discount,
      description,
      composition,
      peculiarities,
      price,
      season,
      color,
      colorLabel,
      img,
      sizes, // массив { size, stock }
    } = body;

    const product = await prisma.product.update({
      where: { slug },
      data: {
        title,
        category,
        categorySlug,
        gender,
        model,
        slug,
        discount,
        description,
        composition,
        peculiarities,
        price,
        season,
        color,
        colorLabel,
        img,
        // обновляем размеры:
        sizes: {
          deleteMany: {},
          create: sizes?.map((s: { size: string; stock: number }) => ({
            size: s.size,
            quantity: s.stock ?? 0, // fallback, чтобы не было null
          })),
        },
      },
      include: { sizes: true },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Ошибка при обновлении продукта" },
      { status: 500 }
    );
  }
}
