import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProducts = () => {
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get<Product[]>("/api/products");
      return data;
    },
  });
  return { data, isLoading };
};
