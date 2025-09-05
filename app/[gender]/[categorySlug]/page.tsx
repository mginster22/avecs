import prisma from "@/lib/prisma";
import CategorySlugItems from "@/shared/components/category-slug-items";
import React from "react";

const CategorySlugPage = async ({
  params,
}: {
  params: Promise<{ gender: string; categorySlug: string }>;
}) => {
  const { gender, categorySlug } = await params;

  const paramsItems = {
    gender,
    categorySlug,
  };
  const products = await prisma.product.findMany({
    where: {
      categorySlug,
      gender,
    },
    include: {
      sizes: true,
    },
  });
    const genderMap: Record<string, string> = {
    men: "Чоловікам",
    women: "Жінкам",
    accessories: "Аксесуари",
    unisex: "Унісекс",
  };

  const genderFilter = genderMap[gender] || "";

  return (
    <CategorySlugItems
      paramsItems={paramsItems}
      genderFilter={genderFilter}
      productsCategorySlug={products}
    />
  );
};

export default CategorySlugPage;
