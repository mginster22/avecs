"use client";

import React, {  useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { CartItem } from "@/types/product";

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
        <div className="grid grid-cols-2 gap-4">
          {/* left */}
          <ul className="h-90 overflow-y-scroll">
            {items.map((item, index) => (
              <li key={index} className="mb-4">
                <p className="text-md  max-w-50 font-bold max-lg:text-xs">
                  {item.product.title} {item.product.model}
                </p>
                <div className="flex gap-2">
                  <img
                    src={item.product.img[0]}
                    alt={item.product.title}
                    className="w-25 mt-2 max-lg:w-16  "
                  />
                  <div className="flex flex-col gap-2 mt-2">
                    <p className="text-md max-lg:text-xs">
                      Ціна:
                      <span className="font-bold ">
                        {item.product.price} грн
                      </span>
                    </p>
                    <p className="max-lg:text-xs">Кількість: {item.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* right */}
          <div className=" flex flex-col gap-10 ">
            <div className="flex flex-col gap-4 max-lg:text-xs ">
              <p className="text-md font-bold mb-2 max-lg:mb-0 ">Контактна інформація:</p>
              <p className="text-md ">Email: {email}</p>
              <p className="text-md ">Телефон: {phone}</p>
            </div>
            <div className="flex flex-col gap-4 max-lg:text-xs">
              <p className="text-md font-bold mb-2 max-lg:mb-0">Адреса доставки:</p>
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
