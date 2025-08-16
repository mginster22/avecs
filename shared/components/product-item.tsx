"use client";
import { cn } from "@/lib/utils";
import useCartStore from "@/store/useCartStore";
import { Product } from "@/types/product";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useAddToCart } from "../hooks/useAddToCart";
import Image from "next/image";

interface Props {
  className?: string;
  product: Product;
  cartItemProduct?: boolean;
  itemTotal?: number;
  quantity?: number;
  size?: string | undefined;
}

export const ProductItem: React.FC<Props> = ({
  product,
  className,
  cartItemProduct,
  itemTotal,
  quantity,
  size,
}) => {
  const [activeSize, setActiveSize] = React.useState<string | undefined>(
    undefined
  );
  // Запрос query на доавлние в корзину 
  const { addToCart } = useAddToCart();

//Под корзиной будет показываться модалка modal-add-to-cart
  const { showAddToCart } = useCartStore();

//Добавление в корзину 
  const handleAddToCart = (productId: string) => {
    if (!activeSize) {
      showAddToCart({}); // передаём пустое сообщение, значит ошибка выбора размера
      return;
    }
    showAddToCart({
      title: product.title,
      color: product.color,
      size: activeSize,
    });
    addToCart.mutate({ productId, size: activeSize });
  };

  return (
    <div
      key={product.slug}
      className={cn(
        "group select-none flex flex-col gap-4 h-full",
        //Переиспользую компонент для корзины!!
        cartItemProduct && "flex-row h-[145px]"
      )}
    >
      {/* Картинка блок! */}
      <div
        className={cn(
          "overflow-hidden relative  ",
          //Переиспользую компонент для корзины!!
          cartItemProduct && "w-1/5"
        )}
      >
        <div className="p-1 rounded-md bg-secondary hidden absolute top-2 right-2   group-hover:block z-40">
          <Heart size={20} />
        </div>
        <Link
          href={`/${product.gender}/${product.categorySlug}/${product.slug}`}
        >
          <Image
            src={`${product.img[0]}`}
            width={500}
            height={500}
            priority={true}
            alt={product.title}
            className={cn(
              "transition-transform duration-300 ease-in-out hover:scale-110"
            )}
          />
        </Link>
        <div
          className={cn(
            "hidden group-hover:flex absolute bottom-0 left-1/2 -translate-x-1/2  gap-2 bg-chart-5 px-3 py-2 max-w-[200px] w-fit text-secondary",
            //Переиспользую компонент для корзины!!
            cartItemProduct && "group-hover:hidden"
          )}
        >
          {product.sizes.map((size, i) => (
            <p
              key={size}
              className={cn(
                " border-1 border-white px-2 text-[14px] hover:border-chart-1 hover:text-chart-1 cursor-pointer",
                activeSize &&
                  activeSize === size &&
                  "bg-secondary border-chart-1 text-chart-1"
              )}
              onClick={() =>
                setActiveSize((prev) => (prev === size ? undefined : size))
              }
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      {/* Блок под картнкой */}
      <div
        className={cn(
          "flex flex-col justify-between gap-2 flex-1",
          //Переиспользую компонент для корзины!!
          cartItemProduct && "flex-1 "
        )}
      >
        <p
          className={cn(
            "uppercase",
            //Переиспользую компонент для корзины!!
            cartItemProduct && "text-xl font-bold"
          )}
        >
          {product.title} - {product.model} - {product.colorLabel}
        </p>

        {cartItemProduct && (
          <span className={cn("text-sm text-gray-600 font-bold uppercase")}>
            Розмір:
            <p>{size}</p>
          </span>
        )}

        <span className={cn(" flex items-center justify-between text-xl")}>
          {cartItemProduct ? itemTotal : product.price} ГРН
          <span
            onClick={() => {
              if (!addToCart.isPending && !cartItemProduct)
                handleAddToCart(product.id);
            }}
            className={cn(
              "px-[10px] py-[6px] bg-chart-5 rounded-md transition-all cursor-pointer hover:bg-chart-1 hover:text-white",
              cartItemProduct && "bg-white",
              addToCart.isPending &&
                "opacity-50 cursor-not-allowed pointer-events-none"
            )}
          >
            {cartItemProduct ? (
              <span> x {quantity}</span>
            ) : (
              <ShoppingCart size={20} color="white" />
            )}
          </span>
        </span>
      </div>
    </div>
  );
};
