"use client";
import React from "react";
import { useProducts } from "../hooks/useProducts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/types/product";
import useCartStore from "@/store/useCartStore";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

interface Props {
  className?: string;
}

export const ModalAddToCart: React.FC<Props> = ({ className }) => {
  const { isAddToCart, addToCartMessage } = useCartStore();
  return (
    <div
      className={cn(
        "fixed top-14 right-10 w-[420px] h-[80px] z-[60] flex items-center gap-3 bg-accent text-primary px-4 py-2 border-1 border-primary shadow-lg transition-all duration-300",
        isAddToCart
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      )}
    >
      <ShoppingCart size={20} />
      <div className="font-semibold text-md flex ">
        {addToCartMessage?.size ? (
          <p>
            {addToCartMessage?.title}
            {" - "}
            {addToCartMessage?.color}{" "}
            <span className="text-sm font-extralight">додано до кошика</span>
          </p>
        ) : (
          <p>
            <span className="text-sm font-extralight">Будь ласка, виберіть розмір перед тим, як додати в кошик</span>
          </p>
        )}
      </div>
    </div>
  );
};
