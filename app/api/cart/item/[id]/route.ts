import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } } // id = cartItem.id
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = params;
    const cookiesStore = cookies();

    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: { cart: true },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // проверка на владельца
    if (session) {
      if (cartItem.cart.userId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else {
      const cartId = (await cookiesStore).get("avecscookies")?.value;
      if (!cartId || cartItem.cart.id !== cartId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    // полностью удаляем cartItem, без уменьшения quantity
    await prisma.cartItem.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
