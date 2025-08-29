import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

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

// app/api/products/route.ts

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const gender = formData.get("gender") as string;
    const category = formData.get("category") as string;
    const categorySlug = formData.get("categorySlug") as string;
    const title = formData.get("title") as string;
    const season = formData.get("season") as string;
    const model = formData.get("model") as string;
    const slug = formData.get("slug") as string;
    const price = Number(formData.get("price"));
    const color = formData.get("color") as string;
    const colorLabel = formData.get("colorLabel") as string;
    const composition = JSON.parse(formData.get("composition") as string);
    const peculiarities = JSON.parse(formData.get("peculiarities") as string);
    const description = formData.get("description") as string;
    const sizes = JSON.parse(formData.get("sizes") as string); // [{size:"S", quantity:10}]
    const files = formData.getAll("images") as File[];

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `products/${category}/${model}`,
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else if (result?.secure_url) resolve(result.secure_url);
            else reject(new Error("No URL returned"));
          }
        );
        stream.end(buffer);
      });
      uploadedUrls.push(url);
    }

    const product = await prisma.product.create({
      data: {
        gender: "men",
        category: "Вітровка",
        categorySlug: "men-vitrovka",
        title: "Чоловіча вітровка Avecs",
        season: "Демисезон",
        model: "50262/57",
        slug: "men-vitrovka-50262-57",
        price: 4555,
        color: "brown",
        colorLabel: "Коричнева",
        composition: [""],
        peculiarities: [""],
        description: "",
        img: [],
        sizes: {
          create: [],
        },
      },
      include: { sizes: true },
    });

    return NextResponse.json({ product });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
