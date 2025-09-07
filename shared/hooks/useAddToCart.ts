import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useCartStore from "@/store/useCartStore"; // <-- твой Zustand
import { CartItem, Product } from "@/types/product";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { showAddToCart } = useCartStore();

  const addToCart = useMutation({
    mutationFn: async ({
      productId,
      size,
      product,
    }: {
      productId: string;
      size?: string;
      product: Product;
    }) => {
      const res = await axios.post("/api/cart", { productId, size, product });
      return res.data;
    },

    onMutate: async (data) => {
      if (!data.size) {
        showAddToCart({ error: "Выберите размер перед добавлением в корзину" });
        throw new Error("No size selected");
      }

      const sizeObj = data?.product?.sizes?.find((s) => s.size === data.size);
      if (!sizeObj) {
        showAddToCart({ error: "Такого размера нет у товара" });
        throw new Error("Size not found");
      }

      // 🟢 1. Проверяем сразу, если товара изначально нет на складе
      if (sizeObj.quantity === 0) {
        showAddToCart({
          error: `На жаль закінчився розмір`,
        });
        throw new Error("Out of stock");
      }

      // 🟢 2. Смотрим корзину
      const previousCart = queryClient.getQueryData<CartItem[]>(["cart"]) ?? [];

      const existing = previousCart.find(
        (item) => item.productId === data.productId && item.size === data.size
      );
      const alreadyInCart = existing ? existing.quantity : 0;

      // 🟢 3. Если уже набрали всё, что есть на складе
      if (alreadyInCart >= sizeObj.quantity) {
        showAddToCart({
          error: `Ви вже додали всі ${sizeObj.quantity} шт. розміру ${data.size}`,
        });
        throw new Error("Max quantity reached");
      }

      // 🟢 4. Если можно добавить
      showAddToCart({
        title: data.product.title,
        color: data.product.colorLabel,
        size: data.size,
      });

      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const optimisticItem: CartItem = {
        id: `optimistic-${data.productId}-${data.size}`,
        cartId: "optimistic",
        productId: data.productId,
        product: data.product,
        size: data.size,
        quantity: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData<CartItem[]>(["cart"], (old = []) => {
        if (existing) {
          return old.map((item) =>
            item.productId === data.productId && item.size === data.size
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  updatedAt: new Date().toISOString(),
                }
              : item
          );
        } else {
          return [...old, optimisticItem];
        }
      });

      return { previousCart };
    },

    onSuccess: (data) => {
      console.log("useAddToCart", data);
      // showAddToCart({
      //   title: data.product.title,
      //   color: data.product.colorLabel, // если у тебя в product есть colorLabel
      //   size: data.size,
      // });
      // ✅ если успешно добавили

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error, _variables, context) => {
      console.log(error);

      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
      if (error instanceof Error && error.message === "Max quantity reached") {
        // ничего не делаем — сообщение уже показано в onMutate
        return;
      }
      // showAddToCart({ error: "На жаль закінчився розмір" });
    },
  });

  return { addToCart };
};
