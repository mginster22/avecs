"use client";
import React from "react";
import { DeliveryCheckoutBlock } from "./delivery-checkout-block";
import { useGetCart } from "@/shared/hooks/useGetCart";
import { OrderCartBlock } from "./order-cart-block";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const CheckoutForm: React.FC<Props> = ({ className }) => {
  const {
    fetchCart: { data, isLoading },
  } = useGetCart();

  if (!data) return null;
  return (
    <div className={cn("flex gap-10 px-4 max-lg:flex-col")}>
      <DeliveryCheckoutBlock data={data}/>
      <OrderCartBlock items={data}/>
    </div>
  );
};
