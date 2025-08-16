// app/[gender]/[categorySlug]/layout.tsx
import { Metadata } from "next";
import { categoryProducts } from "@/constants/categoryProducts";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    gender: string;
    categorySlug: string;
  };
}

// Функция, которую Next.js вызовет для генерации метаданных
export async function generateMetadata({
  params,
}: {
  params: { gender: string; categorySlug: string };
}): Promise<Metadata> {
  const { categorySlug, gender } = await params;
  const category = categoryProducts.find(
    (cat) => cat.categorySlug === categorySlug
  );

  return {
    title: category
      ? `${category.title} - ${
          gender === "men" ? "Чоловіча колекція" : "Жіноча колекція"
        }`
      : "Категорія",
    description: `Асортимент ${category?.title || ""} для ${
      gender === "men" ? "чоловіків" : "жінок"
    } від бренду Avecs`,
  };
}

export default async function CategoryLayout({
  children,
  params,
}: LayoutProps) {
  

  return (
    <div className=" px-4 py-8">

      <section>{children}</section>
    </div>
  );
}
