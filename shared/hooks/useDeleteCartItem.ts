import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  const deleteCartItem = useMutation({
    mutationKey: ["deleteCart"],
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/api/cart/item/${id}`);
      return res.data;
    },

    // 🔹 оптимистично убираем элемент до ответа сервера
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<any[]>(["cart"]);

      queryClient.setQueryData(["cart"], (old: any[] = []) =>
        old.filter(item => item.id !== id)
      );

      return { previousCart };
    },

    // 🔹 откат при ошибке
    onError: (_err, _id, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },

    // 🔹 синхронизация после запроса
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { deleteCartItem };
};
