"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { ProductsWithFilters } from "./products-with-filters";
import { categoryProducts } from "@/constants/categoryProducts";
import Image from "next/image";

interface Props {
  className?: string;
  products: any;
  gender: string;
}

export const GenderPageItems: React.FC<Props> = ({
  gender,
  className,
  products,
}) => {
  const categoryGenderFilter = categoryProducts.filter((category) =>
    category.gender.includes(gender)
  );
  const genderKey: keyof CategoryImgMap = [
    "men",
    "women",
    "accessories",
  ].includes(gender)
    ? (gender as "men" | "women" | "accessories")
    : "men";
  interface CategoryImgMap {
    men?: string;
    women?: string;
    accessories?: string;
  }
  return (
    <div className={cn("flex flex-col gap-4 max-lg:gap-0")}>
      <div className="grid grid-cols-6 gap-4 px-4 max-lg:grid-cols-3 ">
        {categoryGenderFilter.map((category) => {
          const categoryImgMap = {
            men: category.imgMen,
            women: category.imgWomen,
            accessories: category.imgAccessories,
          };
          return (
            <Link
              href={`/${gender}/${category.categorySlug}`}
              key={category.categorySlug}
            >
              <div className="overflow-hidden ">
                <Image
                  width={500}
                  height={1500}
                  priority={true}
                  src={`${categoryImgMap[genderKey]}`}
                  alt={category.title}
                  className={cn(
                    "hover:scale-120 transition-transform duration-300 ease-in-out",
                    category.className
                  )}
                />
              </div>
              <h2>{category.title}</h2>
            </Link>
          );
        })}
      </div>
      <ProductsWithFilters genderType={gender} itemsFilter={products} />
    </div>
  );
};
