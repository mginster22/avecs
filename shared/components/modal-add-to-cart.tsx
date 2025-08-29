"use client";
import React from "react";
import useCartStore from "@/store/useCartStore";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import useFavoriteStore from "@/store/useFavorite";

interface Props {
  className?: string;
}

export const ModalAddToCart: React.FC<Props> = ({ className }) => {
  const { isAddToCart, addToCartMessage } = useCartStore();
  const { addToFavoriteMessage, isAddToFavorite } = useFavoriteStore();
  return (
    <div
      suppressHydrationWarning
      className={cn(
        "fixed top-24 right-10 max-w-[700px] w-fit max-h-[80px] h-full z-[60] flex items-center gap-3 bg-accent text-primary px-4 py-2 border-1 border-primary shadow-lg transition-all duration-300 max-lg:right-4  max-lg:h-[60px] max-lg:max-w-[400px]",
        isAddToCart || isAddToFavorite
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-4 pointer-events-none",
        className
      )}
    >
      <ShoppingCart size={20} />
      {"error" in (addToCartMessage ?? {}) ||
      "error" in (addToFavoriteMessage ?? {}) ? (
        <p>
          <span className="text-sm font-extralight">
            {addToCartMessage?.error}
            {addToFavoriteMessage?.error}
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
          {addToFavoriteMessage && (
            <div className="flex items-center gap-1 text-sm">
              <p className="font-extralight">
                {addToFavoriteMessage.action === "added"
                  ? "Ви додали"
                  : "Видалено з"}
              </p>

              <span className="font-bold">{addToFavoriteMessage.title}</span>

              <span>
                {addToFavoriteMessage.action === "added" ? "у" : "з"}{" "}
                <strong>вподобання!</strong>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
