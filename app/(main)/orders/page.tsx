"use client";
import { cn } from "@/lib/utils";
import { ProductItem } from "@/shared/components";
import { CartWithItems, OrderItems, Product } from "@/types/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface Props {
  className?: string;
}

const UserOrderPage: React.FC<Props> = ({ className }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["myOrders"],
    refetchInterval: 4000,
    queryFn: async() => {
      const res = await axios.get<CartWithItems[]>("/api/checkout");
      return res.data;
    },
  });
  if (!data) return null;
  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки заказов</p>;
  console.log(data)
  return (
    <div className={className}>
      <h1>Мої замовлення</h1>
      {data.length === 0 && <p>У вас ещё нет заказов</p>}
      <div className="grid grid-cols-5 gap-2 max-lg:grid-cols-1 px-4">
        {data
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((order: any) => (
            <div key={order.id} className="border p-2 flex flex-col ">
              <div>
                <p>Замовлення #{order.orderNumber}</p>
                <p>Статус: {order.status==="PAID" ? "Оплачено" : "Не оплачено"}</p>
                <p>Всього: {order.total} ГРН</p>
                <p className="font-bold">Місто {order.city}</p>
                <p className="font-bold">Відділення {order.branch}</p>
              </div>
              <ul className={cn("max-h-60 overflow-scroll flex flex-col gap-2")}>
                {order.items.map((item: OrderItems) => (
                  <ProductItem
                    product={item.product}
                    key={item.id}
                    quantity={item.quantity}
                    size={item.size}
                    orderItem={true}
                  />
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserOrderPage;
