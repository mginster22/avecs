"use client";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber"); // orderId

  const { data, isLoading } = useQuery({
    queryKey: ["myOrders", orderNumber],
    queryFn: async () => {
      if (!orderNumber) return null;
      const res = await axios.get(`/api/checkout/${orderNumber}`);
      return res.data;
    },
    refetchInterval: 2000, // пока LiqPay не обновит статус
  });

  if (isLoading) {
    return <p className="text-center mt-20">⏳ Завантаження...</p>;
  }
  
  if (!data) {
    return <p className="text-center mt-20 text-red-500">❌ Замовлення не знайдено</p>;
  }
  console.log(data)

  return (
    <div className="max-w-xl mx-auto mt-20 text-center p-6 rounded-2xl shadow-lg bg-white">
      {data.isPaid ? (
        <>
          <h1 className="text-2xl font-bold mb-4">✅ Оплата успішна!</h1>
          <p className="mb-2">Дякуємо за замовлення!</p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-red-600">❌ Оплату скасовано</h1>
          <p className="mb-2">Ваше замовлення не оплачене.</p>
          <p className="text-gray-600">Спробуйте ще раз.</p>
        </>
      )}

      <div className="mt-4">
        <p>Номер вашого замовлення:</p>
        <p className="font-bold">{data.orderNumber}</p>
      </div>
    </div>
  );
}
