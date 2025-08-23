// app/api/liqpay/callback/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { PaymentType } from "@/app/generated/prisma"; // импортируй свой enum PaymentType

const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY!;

export async function POST(req: Request) {
  const form = await req.formData();
  const data = form.get("data") as string;
  const signature = form.get("signature") as string;

  const expectedSign = crypto
    .createHash("sha1")
    .update(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY)
    .digest("base64");

  if (signature !== expectedSign)
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });

  const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf8"));
  const { order_id, items, email, phone, region, city, branch, userId, guestId, total } = decoded;

  if (decoded.status === "success" || decoded.status === "sandbox") {
    const newOrder = await prisma.$transaction(async (prismaTx) => {
      const createdOrder = await prismaTx.order.create({
        data: {
          userId: userId || null,
          guestId: guestId || null,
          orderNumber: Number(order_id),
          email,
          phone,
          region,
          city,
          branch,
          payment: PaymentType.CARD,
          status: "PAID",
          isPaid: true,
          total,
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              size: item.size,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: { items: true },
      });

      // списываем со склада
      for (const item of items) {
        await prismaTx.productSize.update({
          where: { productId_size: { productId: item.productId, size: item.size } },
          data: { quantity: { decrement: item.quantity } },
        });
      }

      return createdOrder;
    });

    return NextResponse.json({ ok: true, order: newOrder });
  }

  return NextResponse.json({ ok: false, message: "Payment not successful" }, { status: 400 });
}

