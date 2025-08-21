"use client";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id"); // orderId
  const { data, isLoading } = useQuery({
    queryKey: ["myOrders", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await axios.get(`/api/checkout/${id}`);
      return res.data;
    },
    refetchInterval: 2000,
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (data) {
  }
  console.log(data);

  return (
    <div className="max-w-xl mx-auto mt-20 text-center p-6 rounded-2xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">✅ Оплата успішна!</h1>
      <p className="mb-2">Дякуємо за замовлення!</p>
    </div>
  );
}
