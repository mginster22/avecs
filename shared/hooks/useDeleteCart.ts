import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteCart = () => {
    const queryClient = useQueryClient();
  const deleteCart = useMutation({
    mutationKey: ["deleteCart"],
    mutationFn: async () => axios.delete("/api/cart"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return { deleteCart };
};
