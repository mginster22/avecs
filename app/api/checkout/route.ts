import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

interface OrderItem {
  productId: string;
  size: string;
  quantity: number;
}

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

export async function POST(req: Request) {
  //Получаем список товаров из тела запроса

  const {
    items,
    orderData,
  }: {
    items: { productId: string; size: string; quantity: number }[];
    orderData: {
      email: string;
      phone: string;
      region: string;
      city: string;
      branch: string;
    };
  } = await req.json();

  // Получаем сессию пользователя и куки
  //Проверяем, авторизован ли пользователь (получаем сессию).
  //Получаем доступ к кукам запроса, чтобы работать с гостевым идентификатором.
  const session = await getServerSession(authOptions);
  const cookieStore = cookies();

  //Определяем пользователя или гостя
  let userId: string | null = null;
  let guestId: string | null = null;

  //Если пользователь авторизован — запоминаем его userId.
  //Если нет — пытаемся взять guestId из куки.
  //Если куки с гостевым идентификатором нет — генерируем новый guestId (уникальный ID).
  //Запись новой куки откладываем, чтобы сделать после успешного создания заказа.
  if (
    session &&
    session.user &&
    typeof session.user.id === "string" &&
    session.user.id.length > 0
  ) {
    userId = session.user.id;
    guestId = null;
  } else {
    guestId = (await cookieStore).get("avecscookies")?.value ?? null;
    if (!guestId) {
      guestId = uuidv4();
    }
    userId = null;
  }

  //Проверяем наличие и количество каждого товара на складе
  /*Для каждого товара из списка ищем его в базе.
  Eсли товара нет — возвращаем ошибку 404.
  Если на складе меньше товара, чем заказано — возвращаем ошибку 409 с сообщением об остатке. */
  for (const item of items) {
    const productSize = await prisma.productSize.findFirst({
      where: {
        productId: item.productId,
        size: item.size,
      },
      select: { quantity: true, product: { select: { title: true } } },
    });

    if (!productSize) {
      return NextResponse.json(
        {
          error: `Размер "${item.size}" для товара ${item.productId} не найден`,
        },
        { status: 404 }
      );
    }

    if (productSize.quantity < item.quantity) {
      return NextResponse.json(
        {
          error: `Недостаточно товара "${productSize.product.title}" размера ${item.size}. Остаток: ${productSize.quantity}`,
        },
        { status: 409 }
      );
    }
  }

  // Создаём заказ и позиции заказа в одной транзакции, одновременно уменьшая stock
  /**
    Внутри транзакции (чтобы все операции были атомарными):
    Для каждого товара берём актуальную цену и формируем данные для позиций заказа.
    Создаём запись заказа с привязкой к пользователю или гостю, статусом "pending" и создаём связанные позиции заказа с нужными productId, quantity, price.
    Обновляем количество товара на складе, уменьшая stock на заказанное количество.
    Возвращаем созданный заказ.
  */
  const order = await prisma.$transaction(async (prismaTx) => {
    const orderItemsData = await Promise.all(
      items.map(async (item) => {
        const product = await prismaTx.product.findUnique({
          where: { id: item.productId },
        });

        return {
          productId: item.productId,
          quantity: item.quantity,
          size: item.size, // 🔹 сохраняем размер
          price: product?.price ?? 0,
        };
      })
    );

    const total = orderItemsData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const newOrder = await prismaTx.order.create({
      data: {
        userId,
        guestId,
        email: orderData.email,
        phone: orderData.phone,
        region: orderData.region,
        city: orderData.city,
        branch: orderData.branch,
        status: "PENDING",
        total,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    // 🔹 уменьшаем количество у конкретного размера
    for (const item of items) {
      await prismaTx.productSize.updateMany({
        where: {
          productId: item.productId,
          size: item.size,
        },
        data: {
          quantity: { decrement: item.quantity },
        },
      });
    }

    return newOrder;
  });

  // Формируем ответ с установкой куки для гостя, если она была создана только что
  const response = NextResponse.json(order);

  if (!session && guestId && !(await cookieStore).get("avecscookies")) {
    response.cookies.set("avecscookies", guestId, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 дней
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

interface UpdateOrderStatusBody {
  orderId: string;
  status: string; // например "paid", "shipped" и т.п.
}

// export async function PUT(req: Request) {
//   try {
//     const { orderId, status }: UpdateOrderStatusBody = await req.json();

//     if (!orderId || !status) {
//       return NextResponse.json(
//         { error: "orderId и status обязательны" },
//         { status: 400 }
//       );
//     }

//     // Обновляем статус заказа
//     const updatedOrder = await prisma.order.update({
//       where: { id: orderId },
//       data: { status },
//       include: {
//         items: {
//           include: {
//             product: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json(updatedOrder);
//   } catch (error) {
//     console.error("Ошибка обновления статуса заказа:", error);
//     return NextResponse.json(
//       { error: "Не удалось обновить статус заказа" },
//       { status: 500 }
//     );
//   }
// }
