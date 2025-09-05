import prisma from "@/lib/prisma";
import { InfoCartBlock } from "@/shared/components";

const BlogMainPage = async () => {
  const posts = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
  console.log(posts);

  return (
    <div className="p-4 grid grid-cols-4 gap-3 max-lg:grid-cols-1">
      {posts.map((post) => (
        <InfoCartBlock
          key={post.id}
          img={post.img}
          title={post.title}
          link={`/blog-main/${post.id}`}
          isBlog={true}
          description={post.description}
        />
      ))}
    </div>
  );
};

export default BlogMainPage;
