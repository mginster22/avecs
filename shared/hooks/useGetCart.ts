import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetCart = () => {
  const fetchCart = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await axios.get("/api/cart");
      return data.items;
    },
  });
  return {fetchCart};
};
