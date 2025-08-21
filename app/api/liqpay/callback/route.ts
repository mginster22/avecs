// app/api/liqpay/callback/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY!;

export async function POST(req: Request) {
  const form = await req.formData();
  const data = form.get("data") as string;
  const signature = form.get("signature") as string;

  const expectedSign = crypto
    .createHash("sha1")
    .update(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY)
    .digest("base64");

  if (signature !== expectedSign) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf8"));
  console.log(decoded)

  if (decoded.status === "success" || decoded.status === "sandbox") {
    await prisma.order.update({
      where: { id: decoded.order_id },
      data: {
        status: "PAID",
        isPaid: true,
      },
    });
  }

  return NextResponse.json({ ok: true });
}

