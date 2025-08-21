"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface OrderItem {
  productId: string;
  quantity: number;
  size: string;
}
interface OrderData {
  email: string;
  phone: string;
  region: string;
  city: string;
  branch: string;
}
interface CreateOrderPayload {
  items: OrderItem[];
  orderData: OrderData;
}
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ items, orderData }: CreateOrderPayload) => {
      const { data } = await axios.post("/api/checkout", { items, orderData });
      return data;
    },
    onSuccess: (newOrder) => {
      queryClient.setQueryData(["myOrders"], (old: any[] = []) => [
        newOrder,
        ...old,
      ]);
      queryClient.invalidateQueries({ queryKey: ["myOrders"] }); // обновит сервером
    },
    
    onError: (err: any) => {
      console.error("Ошибка при создании заказа:", err);
    },
  });
};
