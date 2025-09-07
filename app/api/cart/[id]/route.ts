import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "@/lib/auth";


export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { quantity } = await req.json();

  if (typeof quantity !== "number" || quantity < 1) {
    return NextResponse.json({ error: "Quantity must be at least 1" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  const guestId = (await cookies()).get("avecscookies")?.value;

  const cartItem = await prisma.cartItem.findUnique({
    where: { id },
    include: { cart: true },
  });

  if (!cartItem) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  if (session) {
    // Проверка авторизованного пользователя
    if (cartItem.cart.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } else {
    // Проверка гостя
    if (!guestId || cartItem.cartId !== guestId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const updatedItem = await prisma.cartItem.update({
    where: { id },
    data: { quantity },
  });

  console.log("✅ Updated cart item:", updatedItem);
  return NextResponse.json(updatedItem);
}


export async function DELETE(
  req: Request,
  {
  params,
}: {
  params: Promise<{id: string }>;
}
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const cookiesStore = cookies();
  if (session) {
    const userId = session.user.id;
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: { cart: true },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // проверка владельца
    if (cartItem.cart.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } else {
    const guestId = (await cookiesStore).get("avecscookies")?.value;
    const cartItem = await prisma.cartItem.findUnique({
      where: { id:guestId },
      include: { cart: true },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // проверка владельца
    if (cartItem.cart.guestId !== guestId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const deletedItem = await prisma.cartItem.delete({
    where: { id },
  });

  return NextResponse.json(deletedItem);
}
