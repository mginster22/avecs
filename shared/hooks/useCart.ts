import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCart = () => {
  const queryClient = useQueryClient();
  const { data: items, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await axios.get("/api/cart");
      return data.items;
    },
  });
  const deleteCart = useMutation({
    mutationKey: ["deleteCart"],
    mutationFn: async () => axios.delete("/api/cart"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const { mutate, isPending } = useMutation({
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
  return { items, isLoading, deleteCart, mutate, isPending };
};
