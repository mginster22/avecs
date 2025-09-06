import prisma from "@/lib/prisma";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = await prisma.blog.findFirst({
    where: { id }, // Замените 1 на нужный ID поста
  });
  if (!post) {
    return <div>Пост не найден</div>;
  }
  console.log(post);

  return (
    <div className="flex gap-4 p-4">
      {/* левый блок */}
      
      <ul className="w-2/3 max-lg:w-full">
        <li>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <img src={post.img} className="object-cover w-full mb-4 min-lg:hidden max-lg:block"/>
          <h2 className="text-xl  mb-4">{post.title}</h2>
        </li>
        <li>
          {post.text.map((t, index) => (
            <p key={index} className="mb-4">
              {t}
            </p>
          ))}
        </li>
      </ul>
      <img src={post.img} className="object-cover w-1/4 max-lg:hidden"/>
    </div>
  );
};

export default PostPage;
