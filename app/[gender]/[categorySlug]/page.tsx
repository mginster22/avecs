// @prefix tssnips
// @description

import prisma from "@/lib/prisma";
import CategorySlugItems from "@/shared/components/category-slug-items";
import React from "react";
import { products } from '@/constants/products';

interface Props {
  className?: string;
  params: {
    gender: string; // "men" или "women"
    categorySlug: string;
    slug: string;
  };
}

const CategorySlugPage: React.FC<Props> = async ({ params, className }) => {
  

  const { gender, categorySlug } = await params;

  const paramsItems = {
    gender,
    categorySlug,
  };
  const products = await prisma.product.findMany(
    {
      where: {
        categorySlug,
        gender
      },
    }
  );
  return (
    <CategorySlugItems paramsItems={paramsItems} productsCategorySlug={products}/>
  );
};

export default CategorySlugPage;
