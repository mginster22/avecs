import prisma from "@/lib/prisma";
import {
  BannerBlock,
  InfoCartBlock,
  NewCollectionBlock,
} from "@/shared/components";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    include: {
      sizes: true,
    },
  });
  const posts = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
  const latestPosts = posts.slice(0, 4);
  const bannerSlider = [
    {
      desktop: "/assets/banner1.jpg",
      mobile: "/assets/main_slider_mob.png",
    },
    {
      desktop: "/assets/banner2.jpg",
      mobile: "/assets/summer_avecs_comfort_600x600.jpg",
    },
    {
      desktop: "/assets/banner3.png",
      mobile: "/assets/newColl.jpg",
    },
  ];
  return (
    <div className="">
      <BannerBlock bannerSlider={bannerSlider} />
      <div className="grid grid-cols-2 gap-4 px-4 mt-10 max-lg:grid-cols-1">
        <InfoCartBlock
          link="/men"
          className="flex-1/2"
          img="/assets/men.jpg"
          title="ЧОЛОВІКАМ"
          isClassName
        />
        <InfoCartBlock
          link="/women"
          className="flex-1/2"
          img="/assets/women.jpg"
          title="ЖІНКАМ"
          isClassName
        />
      </div>
      <NewCollectionBlock products={products} />
      <div className=" p-4">
        <h2 className="text-6xl font-bold "> Останні публікації в блозі</h2>
        <div className="p-4 grid grid-cols-4 gap-3 max-lg:grid-cols-1">
          {latestPosts.map((post) => (
            <InfoCartBlock
              key={post.id}
              img={post.img}
              title={post.title}
              link={`/blog-main/${post.id}`}
              isBlog={true}
            />
          ))}
        </div>
        <Link href="/blog-main" className="flex justify-center mt-4">
          <Button variant={"red"} size={"red"} className="cursor-pointer">
            Дізнатися більше
          </Button>
        </Link>
      </div>
    </div>
  );
}
