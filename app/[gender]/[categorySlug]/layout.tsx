import { Metadata } from "next";
import { categoryProducts } from "@/constants/categoryProducts";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    gender: string;
    categorySlug: string;
  }>;
}

// Функция генерации метаданных
export async function generateMetadata({
  params,
}: {
  params: Promise<{ gender: string; categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug, gender } = await params;

  const category = categoryProducts.find(
    (cat) => cat.categorySlug === categorySlug
  );

  const genderMap: Record<string, string> = {
    men: "Чоловікам",
    women: "Жінкам",
    accessories: "Аксесуари",
    unisex: "Унісекс",
  };

  const genderFilter = genderMap[gender] || "";

  return {
    title: category
      ? `${category.title} – ${genderFilter}`
      : "Категорія",
    description: `Асортимент ${category?.title || ""} для ${genderFilter} від бренду Avecs`,
  };
}

export default async function CategoryLayout({
  children,
  params,
}: LayoutProps) {
  const { gender, categorySlug } = await params;

  return <section>{children}</section>;
}
