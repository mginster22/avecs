import crypto from "crypto";
const LIQPAY_PUBLIC_KEY = process.env.LIQPAY_PUBLIC_KEY!;
const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY!;

export function generateLiqPayForm(
  orderId: string,
  amount: number,
  description: string
) {
  const data = {
    public_key: LIQPAY_PUBLIC_KEY,
    version: 3,
    action: "pay",
    amount: Number(amount.toFixed(2)),
    currency: "UAH",
    description,
     sandbox: 1, 
    order_id: orderId,
    result_url: `https://avecs.vercel.app/success?orderId=${orderId}`,
    server_url: `https://avecs.vercel.app/api/liqpay/callback`,
  };

  const dataStr = Buffer.from(JSON.stringify(data)).toString("base64");
  const signature = crypto
    .createHash("sha1")
    .update(LIQPAY_PRIVATE_KEY + dataStr + LIQPAY_PRIVATE_KEY)
    .digest("base64");

  return { data: dataStr, signature };
}



