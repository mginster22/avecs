import prisma from "@/lib/prisma";
import { SlugPageBlock } from "@/shared/components";
import { notFound } from "next/navigation";

interface Params {
  gender: string;
  categorySlug: string;
  slug: string;
}

export default async function SlugPage({
  params,
}: {
  params: Promise<Params>; // ✅ важно: здесь Promise
}) {
  const { gender, categorySlug, slug } = await params; // ✅ нужен await


  const product = await prisma.product.findUnique({
    where: { slug },
    include: { sizes: true },
  });

  if (!product) notFound();
 const genderMap: Record<string, string> = {
    men: "Чоловікам",
    women: "Жінкам",
    accessories: "Аксесуари",
    unisex: "Унісекс",
  };

  const genderFilter = genderMap[gender] || "";
  return (
    <SlugPageBlock
      gender={gender}
      genderFilter={genderFilter}
      categorySlug={categorySlug}
      slug={slug}
      product={product}
    />
  );
}
