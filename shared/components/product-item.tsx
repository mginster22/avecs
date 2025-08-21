"use client";
import { cn } from "@/lib/utils";
import useCartStore from "@/store/useCartStore";
import { Product } from "@/types/product";
import { Delete, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useAddToCart } from "../hooks/useAddToCart";
import Image from "next/image";
import { useDeleteCartItem } from "../hooks/useDeleteCartItem";
import { useUpdateQuantityCartOrder } from "../hooks/useUpdateQuantityCartOrder";

interface Props {
  className?: string;
  product: Product;
  cartItemProduct?: boolean;
  cartCheckOutProduct?: boolean;
  itemTotal?: number;
  quantity?: number;
  size?: string | undefined;
  cartItemId?: string;
}

export const ProductItem: React.FC<Props> = ({
  product,
  cartItemId,
  className,
  cartItemProduct = false,
  cartCheckOutProduct = false,
  itemTotal,
  quantity,
  size,
}) => {
  const [activeSize, setActiveSize] = React.useState<string | undefined>(
    undefined
  );

  // Запрос query на доавлние в корзину
  const { addToCart } = useAddToCart();
  const { deleteCartItem } = useDeleteCartItem();
  //Под корзиной будет показываться модалка modal-add-to-cart
  const { showAddToCart } = useCartStore();

  //МОЙ ГЛАВНЫЙ АпДЕЙТ + и -
  const { updateQuantity } = useUpdateQuantityCartOrder();
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

  const handleIncrement = () => {
    if (!cartItemId || !quantity) return;
    updateQuantity.mutate({ id: cartItemId, quantity: quantity + 1 });
  };
  const handleDecrement = () => {
    if (!cartItemId || !quantity) return;
    updateQuantity.mutate({ id: cartItemId, quantity: quantity - 1 });
  };

  const totalPriceProduct = product.price * quantity!;
  return (
    <div
      className={cn(
        "group select-none flex flex-col gap-4 h-full",
        //Переиспользую компонент для корзины!!
        cartItemProduct && "flex-row h-[145px] ",
        cartCheckOutProduct && "flex-row items-start  max-h-[150px] mt-3 h-full max-lg:mt-8",
      )}
    >
      {/* Картинка блок! */}
      <div
        className={cn(
          "overflow-hidden relative  ",
          //Переиспользую компонент для корзины!!
          cartItemProduct && "w-1/5 max-lg:w-1/6",
          cartCheckOutProduct && "w-22"
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
            width={1900}
            height={1900}
            priority={true}
            alt={product.title}
            className={cn(
              "transition-transform duration-300 ease-in-out hover:scale-110 object-cover h-fit w-fit",
              cartCheckOutProduct && " object-contain"
            )}
          />
        </Link>
        {!cartItemProduct && !cartCheckOutProduct && (
          <div
            className={cn(
              "hidden group-hover:flex absolute bottom-0 left-1/2 -translate-x-1/2 gap-2 bg-chart-5 px-3 py-2 max-w-[250px] w-fit text-secondary max-lg:flex max-lg:max-w-[180px] max-sm:overflow-x-auto"
            )}
          >
            {product.sizes?.map(({ size, id }) => (
              <p
                key={id}
                className={cn(
                  "border-1 border-white px-2 text-[14px] hover:border-chart-1 hover:text-chart-1 cursor-pointer",
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
        )}
      </div>

      {/* Блок под картнкой */}
      <div
        className={cn(
          "flex flex-col justify-between gap-2 flex-1",
          //Переиспользую компонент для корзины!!
          cartItemProduct && "justify-baseline ",
          cartCheckOutProduct && "justify-baseline gap-0"
        )}
      >
        <p
          className={cn(
            "uppercase max-lg:text-xs",
            //Переиспользую компонент для корзины!!
            cartItemProduct &&
              "text-xl font-bold max-lg:text-sm flex justify-between ",
            cartCheckOutProduct && "flex justify-between max-lg:text-[10px] "
          )}
        >
          {product.title} - {product.model} - {product.colorLabel}{" "}
          {(cartCheckOutProduct || cartItemProduct) && (
            <button
              className="cursor-pointer"
              onClick={() => {
                if (!cartItemId) return;
                deleteCartItem.mutate(cartItemId);
              }}
            >
              <Delete size={28} />
            </button>
          )}
        </p>
        {cartCheckOutProduct && <p className="max-lg:text-[10px] flex-1">Модель:{product.model}</p>}

        {(cartItemProduct || cartCheckOutProduct) && (
          <span
            className={cn(
              "text-sm text-gray-600 uppercase",
              cartItemProduct && "max-lg:text-xs",
              cartCheckOutProduct
                ? "flex items-center text-[14px] font-light mt-4 max-lg:mt-1 max-lg:text-[11px] max-lg:underline max-lg:text-primary"
                : "font-bold"
            )}
          >
            Розмір:
            <p
              className={cn(
                "",
                cartItemProduct &&
                  "maxl-lg:text-md max-lg:text-primary max-lg:underline"
              )}
            >
              {size}
            </p>
          </span>
        )}

        {/*кнопки для ордера CHHECKOUT FORM!! + или - */}

        {cartCheckOutProduct && (
          <div className="flex items-center gap-4 max-lg:mt-2">
            <button
              className="bg-gray-950 text-white px-2 py-[2px] disabled:opacity-50"
              onClick={handleDecrement}
              disabled={quantity === 1}
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              className="bg-gray-950 text-white px-2 py-[2px] disabled:opacity-50"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        )}

        <span
          className={cn(
            " flex items-center justify-between text-xl",
            cartCheckOutProduct && "mt-2 max-lg:text-sm",
            cartItemProduct && " max-lg:text-sm"
          )}
        >
          {cartItemProduct ? itemTotal : product.price} ГРН
          <span
            onClick={() => {
              if (
                !addToCart.isPending &&
                !cartItemProduct &&
                !cartCheckOutProduct
              ) {
                handleAddToCart(product.id);
              }
            }}
            className={cn(
              "px-[10px] py-[6px] bg-chart-5 rounded-md transition-all cursor-pointer hover:bg-chart-1 hover:text-white",
              cartCheckOutProduct
                ? " cursor-not-allowed pointer-events-none bg-white "
                : cartItemProduct
                ? "bg-white"
                : ""
            )}
          >
            {cartCheckOutProduct ? (
              <p className="text-foreground">Разом: {totalPriceProduct}</p>
            ) : cartItemProduct ? (
              <span>x {quantity}</span>
            ) : (
              <ShoppingCart size={20} color="white" />
            )}
          </span>
        </span>
      </div>
    </div>
  );
};
