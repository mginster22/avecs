import { cn } from "@/lib/utils";
import { ProductsWithFilters } from "@/shared/components";
import { Product } from "@/types/product";
import { ChevronRight, House } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  paramsItems: {
    gender: string; // "men" или "women"
    categorySlug: string;
  };
  productsCategorySlug: Product[];
}

const CategorySlugItems: React.FC<Props> = ({
  productsCategorySlug,
  paramsItems,
  className,
}) => {
  const { gender, categorySlug } = paramsItems;

  const categoryTitle =
    productsCategorySlug.length > 0
      ? productsCategorySlug[0].category || productsCategorySlug[0].categorySlug
      : categorySlug.replace("-", " ");

  return (
    <div className={cn("flex flex-col ")}>
      <nav className="mt-4 mb-4 text-sm text-gray-600 px-4 flex items-center">
        <Link href="/">
          <House size={16} />
        </Link>
        <ChevronRight size={18} />

        <Link href={`/${gender}`} className="hover:underline">
          {gender === "men" ? "Чоловікам" : "Жінкам"}
        </Link>
        <ChevronRight size={18} />
        <Link href={`/${gender}/${categorySlug}`} className="hover:underline">
          {categoryTitle}
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-6 px-4 max-lg:mb-0">
        {categoryTitle}
      </h1>
      <ProductsWithFilters
        itemsFilter={productsCategorySlug}
        genderType={gender}
        isCategorySlug={true}
      />
    </div>
  );
};

export default CategorySlugItems;
