import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useCartStore from "@/store/useCartStore"; // <-- твой Zustand

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { showAddToCart } = useCartStore();

  const addToCart = useMutation({
    mutationFn: async ({
      productId,
      size,
    }: {
      productId: string;
      size?: string;
    }) => {
      const res = await axios.post("/api/cart", { productId, size });
      return res.data;
    },
    onSuccess: (data) => {
      console.log("useAddToCart",data)
      // ✅ если успешно добавили
      showAddToCart({
        title: data.product?.title, // если на бэке возвращаешь продукт
        color: data.product?.colorLabel,
        size: data.size,
      });

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      console.log(error)
      // ❌ если бэк вернул ошибку
      const message = error.response?.data?.error || "Ошибка при добавлении";
      showAddToCart({ error: message });
    },
  });

  return { addToCart };
};
