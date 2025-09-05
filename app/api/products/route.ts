import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export const config = {
  api: {
    bodyParser: false, // Отключаем bodyParser для загрузки файлов
  },
};



export async function POST(req: Request) {
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
      sizes, // <-- массив { size, stock }
    } = body;

    const product = await prisma.product.create({
      data: {
        title,
        category,
        categorySlug,
        gender,
        model,
        discount,
        slug,
        description,
        composition,
        peculiarities,
        price,
        season,
        color,
        colorLabel,
        img,
        sizes: {
          create: sizes.map((s: { size: string; stock: number }) => ({
            size: s.size,
            quantity: s.stock,
          })),
        },
      },
      include: {
        sizes: true, // чтобы вернуть сразу размеры
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка при создании продукта" }, { status: 500 });
  }
}





export async function GET() {
  try {
    const data = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        sizes: true,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}



