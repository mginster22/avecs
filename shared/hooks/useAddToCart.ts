import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddToCart = () => {
    const queryClient = useQueryClient();
  const addToCart = useMutation({
    mutationFn: async ({
      productId,
      size,
    }: {
      productId: string;
      size?: string;
    }) => {
      return axios.post("/api/cart", { productId, size });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return { addToCart };
};
