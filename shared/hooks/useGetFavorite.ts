// useGetFavorite.ts
import { FavoriteItem } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFavorite = () => {
  return useQuery({
    queryKey: ["favorite"],
    queryFn: async () => {
      const { data } = await axios.get<FavoriteItem[]>("/api/favorite");
      return data.map((favorite) => favorite.product);
    },
  });
};
