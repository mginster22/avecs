import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";



import { Product } from "@/types/product";
import { SwiperBlock } from "./swiper-block";

interface Props {
  className?: string;
  products: Product[];
}

export const NewCollectionBlock: React.FC<Props> = ({
  products,
  className,
}) => {
  // Берём последние 8 товаров
  const newProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 8);

  return (
    <div className={cn("flex px-4 mt-10 gap-10 pb-20","max-lg:flex-col")}>
      {/* Левая часть  */}
      <div className="flex flex-col gap-4 w-1/3">
        <h1 className={cn("uppercase text-6xl max-w-40")}>Топові новинки</h1>
        <Link href="/men">
          <Button variant={"red"} size={"red"}>
            Чоловікам
          </Button>
        </Link>
        <Link href="/women">
          <Button variant={"red"} size={"red"}>
            Жінкам
          </Button>
        </Link>
      </div>

      {/* Правая часть - слайдер */}
      <div className="w-[76%] flex items-center  max-lg:w-full">
        <SwiperBlock products={newProducts} isAdaptive={true}/>
      </div>
    </div>
  );
};
