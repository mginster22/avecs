"use client";
import { ProductsWithFilters } from "@/shared/components";
import { useProducts } from "@/shared/hooks/useProducts";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const SearchItems = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const { data: products } = useProducts();

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(search?.toLowerCase() || "")
  );

  if (!filteredProducts) return null;
  return <ProductsWithFilters itemsFilter={filteredProducts} />;
};

const SearchPage = () => {
  return (
    <Suspense>
      <SearchItems />
    </Suspense>
  );
};

export default SearchPage;
