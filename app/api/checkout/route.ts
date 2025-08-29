import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { PaymentType } from "@/app/generated/prisma";
import { generateLiqPayForm } from "@/lib/liqpay";

interface OrderItem {
  productId: string;
  size: string;
  quantity: number;
}
interface OrderData {
  email: string;
  phone: string;
  region: string;
  city: string;
  branch: string;
  isPaid: boolean;
  payment: FrontPaymentType; // <-- строго enum
}
type FrontPaymentType = "cash" | "liqpay" | "byDetails";

export async function GET() {
  const session = await getServerSession(authOptions);
  const cookiesStore = cookies();

  let order;

  if (session) {
    const userId = session.user.id;
    order = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  } else {
    const guestId = (await cookiesStore).get(
      process.env.NEXT_COOKIE_NAME!
    )?.value;
    if (!guestId) {
      // Если гостя нет — возвращаем пустую корзину
      return NextResponse.json({ items: [] }, { status: 200 });
    }
    order = await prisma.order.findMany({
      where: { guestId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
  if (!order) {
    return NextResponse.json({ items: [] }, { status: 200 });
  } else {
    return NextResponse.json(order, { status: 200 });
  }
}
/*Создаём переменную order — она будет хранить данные о текущем заказе пользователя или гостя.

Проверяем, авторизован ли пользователь:

Для этого вызываем функцию getServerSession, которая возвращает информацию о текущей сессии.

Если сессия есть, значит пользователь вошёл в аккаунт.

Если пользователь авторизован:

Берём из сессии идентификатор пользователя userId.

Выполняем запрос к базе данных, чтобы найти первый заказ, связанный с этим userId.

При этом одновременно подгружаем связанные позиции заказа (items) и для каждой позиции — полную информацию о товаре (product).

Таким образом мы получаем заказ с его товарами и всеми деталями.

Если пользователь не авторизован (гость):

Получаем куки из запроса.

Пытаемся достать из куки guestId — уникальный идентификатор гостя.

Если guestId в куках нет, значит у гостя нет сохранённого заказа, и мы сразу возвращаем пустой заказ с пустым массивом товаров, чтобы избежать ошибок на клиенте.

Если guestId есть, ищем в базе заказ, связанный с этим guestId.

Также загружаем все позиции заказа и подробную информацию по каждому товару.

Проверяем результат поиска заказа:

Если заказ вообще не найден (ни для авторизованного пользователя, ни для гостя), возвращаем пустой заказ с пустым списком товаров.

Если заказ найден, возвращаем его с товарами.

Отправляем клиенту JSON с данными:

Если заказ найден — возвращаем все данные по заказу.

Если нет — возвращаем пустой массив товаров.*/


interface OrderData {
  email: string;
  phone: string;
  region: string;
  city: string;
  branch: string;
  payment: "cash" | "liqpay" | "byDetails";
}

export async function POST(req: Request): Promise<NextResponse> {
  const {
    items,
    orderData,
  }: {
    items: { productId: string; size: string; quantity: number }[];
    orderData: OrderData;
  } = await req.json();

  const session = await getServerSession(authOptions);
  const cookieStore = cookies();

  let userId: string | null = null;
  let guestId: string | null = null;

  if (session?.user?.id) {
    userId = session.user.id;
  } else {
    guestId = (await cookieStore).get("avecscookies")?.value ?? uuidv4();
  }
  // проверка stock ...
  const newOrder = await prisma.$transaction(async (prismaTx) => {
    const orderItemsData = await Promise.all(
      items.map(async (item) => {
        const product = await prismaTx.product.findUnique({
          where: { id: item.productId },
        });

        return {
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          price: product?.price ?? 0,
        };
      })
    );

    const total = orderItemsData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const paymentMap: Record<FrontPaymentType, PaymentType> = {
      cash: PaymentType.CASH, // <-- маленькими буквами
      liqpay: PaymentType.CARD,
      byDetails: PaymentType.CARD,
    };
    const lastOrder = await prisma.order.findFirst({
      orderBy: { orderNumber: "desc" },
    });

    const orderNumber = (lastOrder?.orderNumber ?? 0) + 1;
    const createdOrder = await prismaTx.order.create({
      data: {
        userId,
        guestId,
        orderNumber,
        email: orderData.email,
        phone: orderData.phone,
        region: orderData.region,
        city: orderData.city,
        branch: orderData.branch,
        payment: paymentMap[orderData.payment],
        status: "PENDING",
        isPaid: false,
        total,
        items: { create: orderItemsData },
      },
      include: { items: true },
    });
    return createdOrder;
  });

  if (orderData.payment === "liqpay") {
    const { data, signature } = generateLiqPayForm(
      newOrder.id,
      newOrder.total,
      "Оплата замовлення"
    );
    return NextResponse.json({ order: newOrder, liqpay: { data, signature } });
  }

  const response = NextResponse.json(newOrder);

  if (!session && guestId && !(await cookieStore).get("avecscookies")) {
    response.cookies.set("avecscookies", guestId, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}

export async function DELETE() {
  try {
    // Сначала удаляем все OrderItem
    await prisma.orderItem.deleteMany();

    // Потом удаляем все Order
    const result = await prisma.order.deleteMany();

    return NextResponse.json({ deletedCount: result.count });
  } catch (error) {
    console.error("Ошибка при удалении заказов и позиций:", error);
    return NextResponse.json(
      { error: "Ошибка при удалении заказов" },
      { status: 500 }
    );
  }
}


