// lib/liqpay.ts
import crypto from "crypto";

const LIQPAY_PUBLIC_KEY = process.env.LIQPAY_PUBLIC_KEY!;
const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY!;

export function generateLiqPayForm(
  orderNumber: string,
  amount: number,
  description: string
) {
  const data = {
    public_key: LIQPAY_PUBLIC_KEY,
    version: 3,
    action: "pay",
    amount,
    currency: "UAH",
    description,
    order_id: orderNumber,
    result_url: `http://localhost:3000/success?orderNumber=${orderNumber}`,
    server_url: `https://2f126c028160.ngrok-free.app/api/liqpay/callback`,
  };

  const dataStr = Buffer.from(JSON.stringify(data)).toString("base64");
  const signature = crypto
    .createHash("sha1")
    .update(LIQPAY_PRIVATE_KEY + dataStr + LIQPAY_PRIVATE_KEY)
    .digest("base64");

  return { data: dataStr, signature };
}
