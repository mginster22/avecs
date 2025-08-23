"use client";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  if (!orderId) return null;

  const { data, isLoading } = useQuery({
    queryKey: ["myOrders", orderId],
    queryFn: async () => {
      const res = await axios.get(`/api/checkout/${orderId}`);
      return res.data;
    },
    refetchInterval: 2000,  // проверяем каждые 2 сек
    retry: 20,               // попытки пока не придёт isPaid=true
  });

  if (isLoading)
    return <p className="text-center mt-20">⏳ Завантаження...</p>;
  if (!data)
    return (
      <p className="text-center mt-20 text-red-500">
        ❌ Замовлення не знайдено
      </p>
    );

  return (
    <div className="max-w-xl mx-auto mt-20 text-center p-6 rounded-2xl shadow-lg bg-white">
      {data.isPaid ? (
        <>
          <h1 className="text-2xl font-bold mb-4">✅ Оплата успішна!</h1>
          <p className="mb-2">Дякуємо за замовлення!</p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-yellow-600">
            ⏳ Оплата в процесі...
          </h1>
          <p className="mb-2">Очікуємо підтвердження платежу</p>
        </>
      )}
      <div className="mt-4">
        <p>Номер вашого замовлення:</p>
        <p className="font-bold">{data.orderNumber}</p>
      </div>
    </div>
  );
}
