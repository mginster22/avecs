"use client";
import { cn } from "@/lib/utils";
import useCartStore from "@/store/useCartStore";
import React, { useEffect } from "react";
import { CartItem } from "@/types/product";
import { ProductItem } from "./product-item";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useGetCart } from "../hooks/useGetCart";
import { useDeleteCart } from "../hooks/useDeleteCart";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCreateOrder } from "../hooks/useCreateOrder";

interface Props {
  className?: string;
}

export const ModalCart: React.FC<Props> = ({ className }) => {
  const createOrder = useCreateOrder();
  const { isOpen, toggleCart } = useCartStore();
  const pathname = usePathname(); // текущий путь
  //Получаем корзину с сервера query
  useEffect(() => {
    if (isOpen) {
      toggleCart();
    }
  }, [pathname]);
  const {
    fetchCart: { data, isLoading },
  } = useGetCart();

  //Очищаем корзину с сервера
  const { deleteCart } = useDeleteCart();

  if (!data) return null;

  const totalPrice = data.reduce(
    (acc: number, { product, quantity }: CartItem) =>
      acc + product.price * quantity,
    0
  );
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {/* затемнённый фон */}
      <div
        onClick={toggleCart}
        className={cn(
          "fixed top-0 left-0 w-screen h-screen bg-black/50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      />
     
      {/* панель корзины */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-140 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-out flex flex-col max-lg:w-full",
          isOpen ? "translate-x-0" : "translate-x-full",
           data.length === 0 && "w-70 max-lg:w-50"
        )}
      >
        {/* Header */}
        {data.length > 0 && (
          <div className="px-4 py-2 flex items-center justify-between border-b">
            <X size={28} onClick={toggleCart} className="cursor-pointer" />
            <span
              className="text-md font-semibold hover:text-chart-1 transition-all cursor-pointer"
              onClick={() => deleteCart.mutate()}
            >
              Видалити кошик
            </span>
          </div>
        )}

        {/* Items list */}
        <div className="flex-1 px-4 overflow-y-auto mt-4 flex flex-col gap-4">
          {data.length > 0 ? (
            data
              .sort(
                (a: CartItem, b: CartItem) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              )
              .map((cartItem: CartItem) => (
                <ProductItem
                  key={cartItem.id}
                  product={cartItem.product}
                  cartItemProduct
                  itemTotal={cartItem.product.price * cartItem.quantity}
                  quantity={cartItem.quantity}
                  size={cartItem.size}
                  cartItemId={cartItem.id}
                />
              ))
          ) : (
            <div className="text-center mt-10 text-gray-500">
              Ваш кошик порожній {":("}
            </div>
          )}
        </div>

        {/* Footer */}
        {data.length > 0 && (
          <div className="border-t px-4 py-4">
            <div className="flex items-center justify-between text-2xl font-semibold uppercase text-[#374151] mb-4">
              <span>Всього:</span>
              <span>{totalPrice} грн</span>
            </div>

            {totalPrice > 2000 && (
              <p className="text-center text-gray-500 mb-4 text-sm">
                Ви отримуєте безкоштовну доставку
              </p>
            )}

            <div className="flex gap-4">
              <Link href="/cart" className="w-1/2">
                <Button className="w-full h-14" variant="red">
                  Переглянути кошик
                </Button>
              </Link>
              <Link href="/checkout" className="w-1/2">
                <Button className="w-full h-14" variant="red">
                  {createOrder.isPending
                    ? "Створюємо замовлення..."
                    : "Оформити замовлення"}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
