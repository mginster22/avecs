"use client";
import { ChevronRight, Heart, House } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { MoveLeft, MoveRight } from "lucide-react";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAddToCart } from "../hooks/useAddToCart";
import useCartStore from "@/store/useCartStore";
import { SwiperBlock } from "./swiper-block";
import { CharachteristikProductBlock } from "./charachteristik-product-block";

interface Props {
  className?: string;
  gender: string;
  slug: string;
  categorySlug: string;
  product: Product;
}

export const SlugPageBlock: React.FC<Props> = ({
  gender,
  slug,
  categorySlug,
  className,
  product,
}) => {
  const { addToCart } = useAddToCart();
  const { showAddToCart } = useCartStore();
  const [activeSize, setActiveSize] = React.useState<string | undefined>(
    undefined
  );

  const [activeSlide, setActiveSlide] = React.useState(0);

  // Добавим реф для Swiper
  const swiperRef = useRef<any>(null);

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };
  console.log(product);
  const handlAddToCart = (productId: string) => {
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
    <div className={className}>
      {/* Навигация */}
      <nav className="mb-4 text-sm text-gray-600 px-4 flex items-center">
        <Link href="/">
          <House size={16} />
        </Link>
        <ChevronRight size={18} />

        <Link href={`/${gender}`} className="hover:underline">
          {gender === "men" ? "Чоловікам" : "Жінкам"}
        </Link>
        <ChevronRight size={18} />
        <Link href={`/${gender}/${categorySlug}`} className="hover:underline">
          {product.category || categorySlug.replace("-", " ")}
        </Link>
        <ChevronRight size={18} />
        <Link href={`/${gender}/${categorySlug}`} className="hover:underline">
          {product.title || categorySlug.replace("-", " ")}
        </Link>
      </nav>

      <div className="flex gap-4 px-4">
        {/* Левый блок Картинка */}
        <div className="w-[65%]">
          <SwiperBlock
            productsImg={product.img}
            isProductImgs={true}
            swiperRef={swiperRef}
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
            goToSlide={goToSlide}
          />
        </div>

        {/* Правый блок */}
        <div className="flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between">
            <p className="text-[34px] font-bold w-[86%] uppercase leading-tight">
              {product.title} - {product.model} - {product.color}
            </p>
            <span className="bg-chart-1 rounded-md p-2 mt-4">
              <Heart size={24} color="white" />
            </span>
          </div>
          <div className="flex">
            <p className="ml-auto text-[12px] font-chart-2">
              Модель:{product.model}
            </p>
          </div>
          <span className="text-[34px] font-bold">{product.price} ГРН</span>
          {/* Размер */}
          <div className="flex items-center justify-between">
            <p className="text-md">Розмір:</p>
            <button className="flex items-center gap-2 text-[12px]">
              <img src="/ruletka.svg" className="w-10" />
              Розмірна сітка
            </button>
          </div>
          {/* sizes */}
          <div className="flex items-center gap-2">
            {product.sizes.map((size, i) => (
              <button
                className={cn(
                  "px-3 py-[2px] border-1 transition-all hover:bg-chart-1 hover:text-white cursor-pointer",
                  activeSize === size &&
                    "bg-secondary border-chart-1 text-chart-1"
                )}
                onClick={() =>
                  setActiveSize((prev) => (prev === size ? "" : size))
                }
                key={i}
              >
                {size}
              </button>
            ))}
          </div>
          <Button
            variant={"red"}
            className="w-full h-14 cursor-pointer uppercase"
          >
            Купити зараз
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant={"red"}
              className="w-[49.5%] h-14 cursor-pointer uppercase"
              onClick={() => handlAddToCart(product.id)}
            >
              В кошик
            </Button>
            <Button
              variant={"red"}
              className="w-[49%] h-14 cursor-pointer uppercase bg-black "
            >
              Оплата частинами
            </Button>
          </div>
          <h3>Доставка, оплата та обмін</h3>
          <p>
            Безкоштовна доставка територією України при замовленні на суму від
            2000 грн.
          </p>
          <p>
            Обов'язкова передоплата у розмірі 200 грн. Ця сума буде врахована в
            кінцевому розрахунку.
          </p>
          <p>
            <span className="font-bold">Безоплатний</span> обмін розміру.
          </p>
        </div>
      </div>

      {/* Мини-картинки снизу */}
      <div className="flex gap-4  px-4">
        {product.img.map((img, i) => (
          <div
            className={cn(
              "p-2 border-1 cursor-pointer",
              i === activeSlide && "border-chart-1"
            )}
            key={i}
            onClick={() => goToSlide(i)} // Меняем слайд при клике
          >
            <Image
              src={img}
              alt={product.title}
              width={100}
              height={100}
              className="h-auto w-20 object-cover"
            />
          </div>
        ))}
      </div>

      {/* charachteristic-block */}
      <CharachteristikProductBlock
        description={product.description}
        peculiarities={product.peculiarities}
        composition={product.composition}
      />
    </div>
  );
};
