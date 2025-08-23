"use client";
import React from "react";
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
        "fixed top-14 right-10 max-w-[480px] w-full max-h-[120px] h-full z-[60] flex items-center gap-3 bg-accent text-primary px-4 py-2 border-1 border-primary shadow-lg transition-all duration-300 max-lg:right-4  max-lg:h-[60px] max-lg:max-w-[400px]",
        isAddToCart
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      )}
    >
      <ShoppingCart size={20} />
      {"error" in (addToCartMessage ?? {}) ? (
        <p>
          <span className="text-sm font-extralight">
            {addToCartMessage?.error}
          </span>
        </p>
      ) : (
        <div className="font-semibold text-md flex ">
          {addToCartMessage?.size && (
            <p className="">
              {addToCartMessage?.title}
              {" - "}
              {addToCartMessage?.color}{" "}
              <span className="text-sm font-extralight">додано до кошика</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
