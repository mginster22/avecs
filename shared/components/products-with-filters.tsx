"use client";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import React, { useMemo, useState } from "react";
import FiltersInputGroup from "./filters-input-group";
import { ProductItem } from "./product-item";
import { Product } from "@/types/product";

interface Props {
  className?: string;
  genderType?: string;
  itemsFilter: Product[];
  isCategorySlug?: boolean;
  // получае itemsFilter из сервера так быстрее грузит в 30 раз!
}

export const ProductsWithFilters: React.FC<Props> = ({
  isCategorySlug,
  itemsFilter,
  className,
  genderType,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});

  const [priceRange, setPriceRange] = useState({ min: 0, max: 9000 });

  const filteredProducts = useMemo(() => {
    return itemsFilter.filter((product: any) => {
      // Пол сравниваем
      if (genderType && product.gender !== genderType) return false;
      // Цена
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false;
      }
      // Проверяем, есть ли вообще выбранные фильтры
      //cоздаем hasAnyFilter = выводим мой обьект selectedOptions=допустим {name:"vlad"} в масив Object.values(selectedOptions) получится ["vlad"] и делаем проверку что бы этот масив не был пустой если пкстой выходим
      const hasAnyFilter = Object.values(selectedOptions).some(
        (arr) => arr.length > 0
      );
      if (!hasAnyFilter) return true;

      // Проходим по выбранным фильтрам

      for (const [categoryId, selectedValues] of Object.entries(
        selectedOptions
      )) {
        if (selectedValues.length === 0) continue;

        let productValue;

        if (categoryId === "size") {
          productValue = product.sizes;
        } else {
          productValue = product[categoryId];
        }

        if (productValue == null) continue; // у товара нет такого поля

        if (Array.isArray(productValue)) {
          // Если поле - массив (например, размеры)
          // Проверяем, что хотя бы один выбранный фильтр совпадает с товаром
          if (!selectedValues.some((v) => productValue.includes(v))) {
            return false;
          }
        } else {
          // Если поле - строка
          if (!selectedValues.includes(productValue)) {
            return false;
          }
        }
      }

      return true;
    });
  }, [itemsFilter, selectedOptions, priceRange]);

  return (
    <div className="mt-2 px-4">
      <div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal />
          <h1 className="text-2xl font-light text-chart-2">Фільтр</h1>
        </div>
        <FiltersInputGroup
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          isCategorySlug={isCategorySlug}
        />
      </div>
      <div className={cn("grid grid-cols-4 gap-4  mt-10", className)}>
        {filteredProducts.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div>
    </div>
  );
};
