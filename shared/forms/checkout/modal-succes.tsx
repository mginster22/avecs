"use client";

import React, {  useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { CartItem, Product } from "@/types/product";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  email: string;
  inputRegion: string;
  inputCity: string;
  inputBranch: string;
  phone: string;
}

export const ModalSuccess: React.FC<Props> = ({
  items,
  email,
  isOpen,
  phone,
  inputBranch,
  inputCity,
  inputRegion,
  onClose,
}) => {
  // Чтобы закрывать модалку по Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className=" bg-white rounded-2xl shadow-lg p-6 w-160 max-w-[90%] animate-fadeIn">
        <h2 className="text-2xl font-semibold text-center text-chart-1 mb-4">
          Ваш заказ успешно создан!
        </h2>
        <div className="flex justify-between">
          <ul className="w-1/2 ">
            {items.map((item, index) => (
              <li key={index} className="mb-4">
                <p className="text-md  max-w-50 font-bold">
                  {item.product.title} {item.product.model}
                </p>
                <div className="flex gap-2">
                  <img
                    src={item.product.img[0]}
                    alt={item.product.title}
                    className="w-25 mt-2"
                  />
                  <div className="flex flex-col gap-2 mt-2">
                    <p className="text-md ">
                      Ціна:
                      <span className="font-bold">
                        {item.product.price} грн
                      </span>
                    </p>
                    <p className="">Кількість: {item.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="w-1/2 flex flex-col gap-10 mt-10">
            <div className="flex flex-col gap-4">
              <p className="text-md font-bold mb-2">Контактна інформація:</p>
              <p className="text-md ">Email: {email}</p>
              <p className="text-md ">Телефон: {phone}</p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-md font-bold mb-2">Адреса доставки:</p>
              <p className="text-md ">Регіон: {inputRegion}</p>
              <p className="text-md ">Місто: {inputCity}</p>
              <p className="text-md ">Відділення: {inputBranch}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button variant="red" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
};
