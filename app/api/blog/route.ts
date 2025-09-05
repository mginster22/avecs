import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    
  try {
    const { title, img, description, text } = await request.json();

    if (!title || !img || !description || !text || text.length === 0) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newPost = await prisma.blog.create({
      data: {
        title,
        img,
        description,
        text: {
          set: text
        },
      },
    });
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const posts = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}