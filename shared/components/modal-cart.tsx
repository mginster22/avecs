"use client";
import { cn } from "@/lib/utils";
import useCartStore from "@/store/useCartStore";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CartItem } from "@/types/product";
import { ProductItem } from "./product-item";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useGetCart } from "../hooks/useGetCart";
import { useDeleteCart } from "../hooks/useDeleteCart";

interface Props {
  className?: string;
}

export const ModalCart: React.FC<Props> = ({ className }) => {

  const { isOpen, toggleCart } = useCartStore();

  //Получаем корзину с сервера query 
  const {fetchCart:{data,isLoading}}=useGetCart()
  
  //Очищаем корзину с сервера
  const {deleteCart}=useDeleteCart()



  if (!data) return null;

  const totalPrice = data.reduce(
    (acc: number, { product, quantity }: CartItem) =>
      acc + product.price * quantity,
    0
  );
  if(isLoading) return <div>Loading...</div>
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
          "fixed top-0 right-0 h-screen w-140 bg-white shadow-lg p-4 z-50 transform transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
          data.length === 0 && "w-70"
        )}
      >
        {data.length > 0 && (
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-between">
            <X size={28} onClick={toggleCart} />
            <span
              className="text-md font-semibold hover:text-chart-1 transition-all cursor-pointer"
              onClick={() => deleteCart.mutate()}
            >
              Видалити кошик
            </span>
          </h2>
        )}
        {/* центральный блок с айтемами */}
        <div className="flex flex-col justify-between">
          <div className="overflow-y-auto h-[500px] flex flex-col gap-10 ">
            {data.length > 0 ? (
              data.map((cartItem: CartItem) => (
                <div key={cartItem.id}>
                  <ProductItem
                    product={cartItem.product}
                    cartItemProduct={true}
                    itemTotal={cartItem.product.price * cartItem.quantity}
                    quantity={cartItem.quantity}
                    size={cartItem.size}
                  />
                  <div className="border-b-1 mt-4"></div>
                </div>
              ))
            ) : (
              <div className="text-center mt-4">Ваш кошик порожній {":("} </div>
            )}
          </div>
          {/* нижний блок корзины */}
          {data.length > 0 && (
            <div className="flex flex-col justify-between">
              <div className="flex items-center justify-between mt-4 uppercase text-[#374151]">
                <span className="text-2xl font-semibold">Всього:</span>
                <span className="text-2xl font-semibold">{totalPrice} грн</span>
              </div>
              <div className="mt-4 w-full h-2 bg-chart-1 rounded-full"></div>
              {totalPrice>2000 && <p className="text-center mt-4 text-gray-500">Ви отримуєте безкоштовну доставку</p>}
              <div className="flex gap-4 mt-4 px-4">
                <Button className="w-1/2 h-14 cursor-pointer" variant={"red"}>Переглянути кошик</Button>
                <Button className="w-1/2 h-14 cursor-pointer" variant={"red"}>Оформити замовлення</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
