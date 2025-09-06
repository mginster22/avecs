import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;
    const cookiesStore = cookies();

    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: { cart: true },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    console.log("db cartId:", cartItem.cart.id);
    // проверка на владельца
    if (session) {
      if (cartItem.cart.userId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else {
      const cartId = (await cookiesStore).get("avecscookies")?.value;
      console.log("cookie cartId:", cartId);
      if (!cartId || cartItem.cart.id !== cartId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }
    await prisma.cartItem.delete({ where: { id } });
    // полностью удаляем cartItem, без уменьшения quantity

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
