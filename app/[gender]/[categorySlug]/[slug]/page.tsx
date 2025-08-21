import prisma from "@/lib/prisma";
import { SlugPageBlock } from "@/shared/components";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  className?: string;
  params: {
    gender: string; // "men" или "women"
    categorySlug: string;
    slug: string;
  };
}

const SlugPage: React.FC<Props> = async ({ params, className }) => {
  const { gender, categorySlug, slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include:{
      sizes: true
    }
  });

  if (!product) {
    notFound();
  }
  return (
    <SlugPageBlock
      gender={gender}
      categorySlug={categorySlug}
      slug={slug}
      product={product}
    />
  );
};
export default SlugPage;
