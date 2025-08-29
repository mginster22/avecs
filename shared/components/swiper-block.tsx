"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { MoveLeft, MoveRight } from "lucide-react";
import { Product } from "@/types/product";
import { ProductItem } from "./product-item";
import { cn } from "@/lib/utils";
import Image from "next/image";
interface Props {
  className?: string;
  products?: Product[];
  productsImg?: string[];
  isProductImgs?: boolean;
  swiperRef?: React.RefObject<any>;
  activeSlide?: number;
  isAdaptive?: boolean;
  setActiveSlide?: React.Dispatch<React.SetStateAction<number>>;
  goToSlide?: (index: number) => void;
}

export const SwiperBlock: React.FC<Props> = ({
  products,
  productsImg,
  isProductImgs = false,
  swiperRef,
 
  setActiveSlide,
 
}) => {
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={10}
      slidesPerView={isProductImgs ? 2.1 : 3.1}
      breakpoints={{
        0: {
          slidesPerView: isProductImgs ? 1.2 : 2,
        },
        480: {
          slidesPerView: isProductImgs ? 1.2 : 2,
        },
        768: {
          slidesPerView: isProductImgs ? 2.1 : 3.1,
        },
        1024: {
          slidesPerView: isProductImgs ? 2.1 : 3.1,
        },
        1280: {
          slidesPerView: isProductImgs ? 2.1 : 3.1,
        },
        1440: {
          slidesPerView: isProductImgs ? 2.1 : 3.1,
        },
        1600: {
          slidesPerView: isProductImgs ? 2.1 : 3.1,
        },
        1824: {
          slidesPerView: isProductImgs ? 2.1 : 3.1,
        },
      }}
      className="max-h-[800px] relative"
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      onInit={(swiper) => {
        if (isProductImgs && swiperRef) {
          swiperRef.current = swiper;
        }
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      }}
      onSlideChange={(swiper) => {
        if (isProductImgs && setActiveSlide) {
          setActiveSlide(swiper.activeIndex);
        }
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      }}
    >
      {isProductImgs
        ? productsImg?.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                src={img}
                alt={`slide-${i}`}
                width={500}
                height={500}
                priority={true}
                style={{ objectFit: "cover" }}
              />
            </SwiperSlide>
          ))
        : products?.map((product) => (
            <SwiperSlide key={product.slug}>
              <ProductItem product={product} />
            </SwiperSlide>
          ))}

      {/* Левая стрелка: всегда в DOM, но скрываем на первом слайде */}
      <div className="absolute z-20 top-[39%]">
        <div
          className={cn(
            "custom-prev p-2 bg-chart-1 border-1 border-chart-1 transition-all",
            "group hover:bg-white hover:border-chart-1",
            isBeginning && "opacity-0 pointer-events-none"
          )}
          aria-label="Previous"
        >
          <MoveLeft className="text-white group-hover:text-chart-1" size={20} />
        </div>
      </div>

      {/* Правая стрелка: скрываем на последнем слайде */}
      <div className="absolute z-20 right-0 top-[39%]">
        <div
          className={cn(
            "custom-next p-2 bg-chart-1 border-1 border-chart-1 transition-all",
            "group hover:bg-white hover:border-chart-1",
            isEnd && "opacity-0 pointer-events-none"
          )}
          aria-label="Next"
        >
          <MoveRight
            className="text-white group-hover:text-chart-1"
            size={20}
          />
        </div>
      </div>
    </Swiper>
  );
};
