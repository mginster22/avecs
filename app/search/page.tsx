// @prefix tssnips
// @description
"use client";
import { ProductsWithFilters } from "@/shared/components";
import { useProducts } from "@/shared/hooks/useProducts";
import { useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  className?: string;
}

const genderMap = {
  men: "Чоловіки",
  women: "Жінки",
  unisex: "Унисекс",
};

const SearchPage: React.FC<Props> = ({ className }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const { data: products } = useProducts();
  console.log("Изначально", products);
  console.log(search);

  const filteredProducts = products?.filter(
    (product) =>
      product.title.toLowerCase().includes(search?.toLowerCase() || "") 
      
  );

  console.log("Отфильтрованные", filteredProducts);
  if (!filteredProducts) return null;
  return (
    <div className=" ">
      <ProductsWithFilters itemsFilter={filteredProducts} />
    </div>
  );
};

export default SearchPage;
