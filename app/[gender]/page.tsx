import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { GenderPageItems } from "@/shared/components/gender-page-items";
import { ChevronRight, House } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  params: {
    gender: string;
    category: string; // "men" или "women"
  };
}

// Вспомогательная функция, чтобы сгруппировать товары по категории

const GenderPage: React.FC<Props> = async ({ params, className }) => {
  const { gender, category } = await params;
  const products = await prisma.product.findMany();

  // Фильтруем товары по гендеру

  const genderMap: Record<string, string> = {
    men: "Чоловікам",
    women: "Жінкам",
    accessories: "Аксесуари",
  };

  const genderFilter = genderMap[gender] || "";
  return (
    <div className={cn("flex flex-col gap-4 mt-10")}>
      <nav className="mb-4 text-sm text-gray-600 px-4 flex items-center gap-1">
        <Link href="/">
          <House size={16} />
        </Link>
        <ChevronRight size={16} />
        <Link href={`/${gender}`} className="hover:underline">
          {genderFilter}
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-6 px-4">{genderFilter}</h1>
      <GenderPageItems gender={gender} products={products} />
    </div>
  );
};

export default GenderPage;
