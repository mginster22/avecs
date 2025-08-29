import useFavoriteStore from "@/store/useFavorite";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useToggleFavorite = (productId: string) => {
  const queryClient = useQueryClient();
  const { showAddToFavorite } = useFavoriteStore();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/favorite", { productId });
      return data; // { action, favorite }
    },

    // ⚡ моментально обновляем кэш до ответа сервера
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["favorite"] });

      const prevFavorites = queryClient.getQueryData<any[]>(["favorite"]);

      const isAlreadyFavorite = prevFavorites?.some(
        (fav) => fav.product.id === productId
      );

      queryClient.setQueryData(["favorite"], (old: any[] = []) => {
        if (isAlreadyFavorite) {
          // убираем из избранного
          return old.filter((fav) => fav.product.id !== productId);
        } else {
          // добавляем заглушку (без полного продукта, пока ответ не пришёл)
          return [
            ...old,
            { product: { id: productId, title: "..." }, optimistic: true },
          ];
        }
      });

      return { prevFavorites };
    },

    // если ошибка → откатываем
    onError: (_err, _vars, context) => {
      if (context?.prevFavorites) {
        queryClient.setQueryData(["favorite"], context.prevFavorites);
      }
      showAddToFavorite({ error: "Ошибка при обновлении избранного" });
    },

    // ⚡ после ответа сервера → синк
    onSuccess: (data) => {
      queryClient.setQueryData(["favorite"], (old: any[] = []) => {
        if (data.action === "removed") {
          showAddToFavorite({
            title: "",
            model: "",
            action: "removed",
          });
          return old.filter(
            (fav) => fav.product.id !== data.favorite.product.id
          );
        } else if (data.action === "added") {
          showAddToFavorite({
            title: data.favorite.product.title,
            model: data.favorite.product.model,
            action: "added",
          });
          return [...old.filter(f => f.product.id !== productId), data.favorite];
        }
        return old;
      });
    },

    onSettled: () => {
      // окончательный синк с сервером
      queryClient.invalidateQueries({ queryKey: ["favorite"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
