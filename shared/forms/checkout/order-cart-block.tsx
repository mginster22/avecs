"use client";
import { cn } from "@/lib/utils";
import { ProductItem } from "@/shared/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { CartItem } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";

interface Props {
  className?: string;
  items: CartItem[];
  bonus: number;
  setBonus: (value: number) => void;
}

export const OrderCartBlock: React.FC<Props> = ({
  items,
  className,
  bonus,
  setBonus,
}) => {
  const { status } = useSession();
  
  const { data, isLoading } = useQuery({
    queryKey: ["user-bonus"],
    queryFn: async () => {
      const res = await axios.get("/api/user/update-bonus");
      return res.data.bonusPoints;
    },
      enabled:status === "authenticated"
  });
  const getPriceWithDiscount = (price: number, discount: number) =>
    Math.round(price - price * (discount / 100));

  const itemsTotal = items.reduce(
    (acc: number, { product, quantity }: CartItem) =>
      acc +
      getPriceWithDiscount(product.price, product.discount ?? 0) * quantity,
    0
  );

  const totalPrice = Math.max(itemsTotal - bonus, 0);

  return (
    <div className={cn("w-1/2 max-lg:w-full ")}>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <p>Кошик</p>
          </AccordionTrigger>
          <AccordionContent>
            {/* бонусы */}

            {status==="authenticated"&&<div className="flex items-center gap-4 mb-4">
              <input
                type="number"
                max={data}
                min={0}
                value={bonus}
                onChange={(e) => {
                  let value = Number(e.target.value);

                  if (value > data) {
                    value = data;
                  } else if (value < 0) {
                    value = 0;
                  }

                  setBonus(value);
                }}
                placeholder="Бонусні бали"
                className="border-1 w-1/7 py-1"
              />
              <p className="text-gray-500 underline">
                Доступно бонусних балів: {data}
              </p>
            </div>}
            
            <ul className="flex flex-col gap-4 h-80 overflow-scroll max-lg:pb-10">
              {items
                .sort(
                  (a: CartItem, b: CartItem) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )
                .map((item) => (
                  <ProductItem
                    key={item.id}
                    cartItemId={item.id}
                    product={item.product}
                    cartCheckOutProduct={true}
                    quantity={item.quantity}
                    size={item.size}
                  />
                ))}
            </ul>
            <p className="mt-4 text-xl pb-10">Всього: {totalPrice} грн</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
