import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  //1.Смотрим, авторизован ли пользователь
  const session = await getServerSession(authOptions);
  const cookiesStore = cookies();

  let cart;
  if (session) {
    const userId = session.user.id;
    cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
    if (!cart) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }
    return NextResponse.json(cart, { status: 200 });
  } else {
    const guestId = (await cookiesStore).get("avecscookies")?.value;
    if (!guestId) {
      // Если гостя нет — возвращаем пустую корзину
      return NextResponse.json({ items: [] }, { status: 200 });
    }
    cart = await prisma.cart.findFirst({
      where: { guestId },
      include: { items: { include: { product: true } } },
    });
    if (!cart) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }
    return NextResponse.json(cart, { status: 200 });
  }
}

//3. Если гость

export async function POST(req: Request) {
  const { productId, quantity = 1, size } = await req.json();
  const session = await getServerSession(authOptions);
  const cookiesStore = cookies();
  let cart;

  if (session) {
    const userId = session.user.id;
    cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }
  } else {
    let guestId = (await cookiesStore).get("avecscookies")?.value;

    if (!guestId) {
      guestId = uuidv4();
      (await cookiesStore).set("avecscookies", guestId);
    }
    cart = await prisma.cart.findFirst({ where: { guestId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { guestId } });
    }
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
    },
  });
  if (existingItem) {
    const updatedItem = await prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
    return NextResponse.json(updatedItem, { status: 200 });
  } else {
    const newItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        size,
        quantity,
      },
    });
    return NextResponse.json(newItem, { status: 200 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const cookiesStore = cookies();

  if (session) {
    const userId = session.user.id;
    await prisma.cartItem.deleteMany({ where: { cart: { userId } } });
    const cart = await prisma.cart.deleteMany({ where: { userId } });
    return NextResponse.json(cart);
  } else {
    const guestId = (await cookiesStore).get("avecscookies")?.value;
    await prisma.cartItem.deleteMany({ where: { cart: { guestId } } });
    const cart = await prisma.cart.deleteMany({ where: { guestId } });
    return NextResponse.json(cart);
  }
}
