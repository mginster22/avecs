import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { CartItem } from "@/types/product";
import React from "react";
import { ProductItem } from "../../product-item";

interface Props {
  className?: string;
  items: CartItem[];
}

export const OrderCartBlock: React.FC<Props> = ({ items, className }) => {
  const totalPrice = () => {
    return items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };
  return (
    <div className={cn("w-1/2 max-lg:w-full")}>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <p>Кошик</p>
          </AccordionTrigger>
          <AccordionContent>
            <p>Всього: {totalPrice()} грн</p>
            <ul className="flex flex-col gap-4 h-80 overflow-scroll">
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
