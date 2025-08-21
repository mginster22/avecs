"use client";
import { CartWithItems } from "@/types/product";
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
    queryFn: async () => {
      const res = await axios.get<CartWithItems[]>("/api/checkout");
      return res.data;
    },
  });
  if (!data) return null;
  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки заказов</p>;
  return (
    <div className={className}>
      <h1>Мои заказы</h1>
      {data.length === 0 && <p>У вас ещё нет заказов</p>}
      {data
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((order: any) => (
          <div key={order.id} className="border p-4 mb-4">
            <p>Заказ #{order.id}</p>
            <p>Статус: {order.status}</p>
            <p>Итог: {order.total} ГРН</p>
            <p className="font-bold">ГОРОД {order.city}</p>
            <ul>
              {order.items.map((item: any) => (
                <li key={item.id}>
                  {item.product.title} — {item.quantity} шт — {item.price} ГРН
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default UserOrderPage;
