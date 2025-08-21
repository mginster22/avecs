import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateQuantityCartOrder = () => {
  const queryClient = useQueryClient();

  const updateQuantity = useMutation({
    mutationKey: ["updateQuantity"],
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const res = await axios.patch(`/api/cart/${id}`, { quantity });
      return res.data; // важно!
    },
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<any>(["cart"]);

      queryClient.setQueryData(["cart"], (old: any[] = []) =>
        old.map((item) => (item.id === id ? { ...item, quantity } : item))
      );

      return { previousCart };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["cart"] });
    // },
  });

  return { updateQuantity };
};
