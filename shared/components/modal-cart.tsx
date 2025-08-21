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
          "fixed top-0 right-0 h-screen w-140 bg-white shadow-lg  z-50 transform transition-transform duration-500 ease-in-out max-lg:w-full max-lg:overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full",
          data.length === 0 && "w-70 max-lg:w-50"
        )}
      >
        {data.length > 0 && (
          <div className="px-4 py-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-between">
              <X size={28} onClick={toggleCart} />
              <span
                className="text-md font-semibold hover:text-chart-1 transition-all cursor-pointer"
                onClick={() => deleteCart.mutate()}
              >
                Видалити кошик
              </span>
            </h2>
          </div>
        )}
        <div className="flex flex-col justify-between">
          {/* центральный блок с айтемами */}
          <div className="px-4 overflow-y-auto h-[500px] flex flex-col gap-10 max-lg:h-[320px] max-lg:gap-4 max-lg:mt-2">
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
                    cartItemProduct={true}
                    itemTotal={cartItem.product.price * cartItem.quantity}
                    quantity={cartItem.quantity}
                    size={cartItem.size}
                    cartItemId={cartItem.id}
                  />
                ))
            ) : (
              <div className="text-center mt-4">Ваш кошик порожній {":("} </div>
            )}
          </div>
          {/* нижний блок корзины */}
          {data.length > 0 && (
            <div className="flex flex-col justify-between max-lg:border-t max-lg:border-gray-300 px-4">
              <div className="flex items-center justify-between text-2xl font-semibold mt-4 uppercase text-[#374151] max-lg:text-[18px]">
                <span className="">Всього:</span>
                <span className="">{totalPrice} грн</span>
              </div>

              {/* progress bar */}
              <div className="mt-4 w-full h-2 bg-chart-1 rounded-full"></div>
              {totalPrice > 2000 && (
                <p className="text-center mt-4 text-gray-500 max-lg:text-[12px]">
                  Ви отримуєте безкоштовну доставку
                </p>
              )}

              {/* buttons block */}
              <div className="flex items-center gap-4 mt-4 px-4 max-lg:px-0">
                <Link href="" className="w-1/2 cursor-pointer">
                  <Button className="w-full h-14 " variant={"red"}>
                    Переглянути кошик
                  </Button>
                </Link>
                <Link href={"/checkout"} className="w-1/2 cursor-pointer">
                  <Button
                    className="w-full h-14 cursor-pointer"
                    variant={"red"}
                  >
                    {createOrder.isPending
                      ? "Створюємо замовлення..."
                      : "Оформити замовлення"}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
