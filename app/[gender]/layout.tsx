// app/[gender]/[categorySlug]/layout.tsx
import { Metadata } from "next";
import { products } from "@/constants/products";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    gender: string;
  };
}

// Функция, которую Next.js вызовет для генерации метаданных
export async function generateMetadata({
  params,
}: {
  params: { gender: string };
}): Promise<Metadata> {
  const { gender } = await params;
  const categoryGender = products.find((item) => item.gender === gender);

  return {
    title: gender
      ? `${gender === "men" ? "Чоловіча колекція" : "Жіноча колекція"}`
      : "Категорія",
    description: `Асортимент ${categoryGender?.title || ""} для ${
      gender === "men" ? "чоловіків" : "жінок"
    } від бренду Avecs`,
  };
}

export default async function GenderLayout({ children, params }: LayoutProps) {
  const { gender } = await params;

  return <div >{children}</div>;
}
