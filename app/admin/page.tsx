import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

if (user?.role !== "ADMIN") {
  return (
    <div className=" ">
      <p className="text-red-500 text-[60px]">А-а-аааааа куда полез</p>
    </div>
  );
}
  return (
    <div className="flex mt-10 gap-10">
      <Link href="/admin/create-product" className="border-1 p-4">
        Створити товар
      </Link>
      <Link href="/admin/all-products" className="border-1 p-4">
        Всі товари
      </Link>
      <Link href="/admin/blog-create" className="border-1 p-4">
        Створити блог пост
      </Link>
    </div>
  );
}
