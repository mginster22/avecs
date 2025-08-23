
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { OrderStatus } from "@/app/generated/prisma";
import crypto from "crypto";

const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY!;

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const data = form.get("data") as string;
    const signature = form.get("signature") as string;

    // 🔐 Проверка подписи
    const expected = crypto
      .createHash("sha1")
      .update(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY)
      .digest("base64");

    console.log("Incoming signature:", signature);
    console.log("Expected signature:", expected);

    if (signature !== expected) {
      console.warn("Bad signature");
      return NextResponse.json({ ok: false, message: "Bad signature" }, { status: 400 });
    }

    // Распаковываем данные
    const paymentData = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
    const orderId = paymentData.order_id; // UUID
    const status = paymentData.status;

    console.log("Payment status:", status);
    console.log("Order ID from LiqPay:", orderId);

    // Разрешаем sandbox и success как валидные статусы
    if (!["success", "sandbox"].includes(status)) {
      return NextResponse.json({ ok: false, message: "Payment not completed" });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      console.warn("Order not found");
      return NextResponse.json({ ok: false, message: "Order not found" }, { status: 404 });
    }

    if (order.isPaid) {
      console.log("Order already paid");
      return NextResponse.json({ ok: true });
    }

    // Обновление заказа и уменьшение stock
    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: order.id },
        data: { isPaid: true, status: OrderStatus.PAID },
      });

      for (const item of order.items) {
        await tx.productSize.updateMany({
          where: { productId: item.productId, size: item.size },
          data: { quantity: { decrement: item.quantity } },
        });
      }
    });

    console.log("Order payment completed successfully");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error in LiqPay callback:", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
