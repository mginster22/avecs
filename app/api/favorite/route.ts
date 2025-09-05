import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = session.user.id;
  const favoriteItems = await prisma.favorite.findMany({
    where: { userId },
    include: { product: true },
  });

  return NextResponse.json(favoriteItems);
}

export async function POST(req: Request) {
  const { productId } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Ви повинні бути авторизовані" },
      { status: 400 }
    );
  }

  const userId = session.user.id;

  // Проверяем, есть ли уже в избранном
  const existing = await prisma.favorite.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  if (existing) {
    // Если есть → удаляем
    const deleted = await prisma.favorite.delete({
      where: { userId_productId: { userId, productId } },
      include: { product: true },
    });
    return NextResponse.json({ action: "removed", favorite: deleted });
  } else {
    // Если нет → создаем
    const created = await prisma.favorite.create({
      data: {
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
      },
      include: { product: true },
    });
    return NextResponse.json({ action: "added", favorite: created });
  }
}
