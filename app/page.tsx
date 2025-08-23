import prisma from "@/lib/prisma";
import { BannerBlock, InfoCartBlock, NewCollectionBlock } from "@/shared/components";

export default async function Home() {
  const products = await prisma.product.findMany({
    include: {
      sizes: true,
    },
  });
  return (
    <div className="">
      <BannerBlock />
      <div className="grid grid-cols-2 gap-4 px-4 mt-10 max-lg:grid-cols-1">
        <InfoCartBlock link="/men" className="flex-1/2" img="/assets/men.jpg" title="ЧОЛОВІКАМ" isClassName/>
        <InfoCartBlock link="/women" className="flex-1/2" img="/assets/women.jpg" title="ЖІНКАМ" isClassName/>
      </div>
      <NewCollectionBlock products={products}/>
      
    </div>
  );
}
