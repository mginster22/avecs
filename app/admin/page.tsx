"use client"
import React from "react";
import { SigninAdmin } from "@/shared/adminComponents/signin-admin";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const [success, setSuccess] = React.useState(false);
  const session = useSession();
  const user = session?.data?.user;
  const adminPassword = "2322";

    const isAdmin = user?.role === "ADMIN" || success; 
  if (!isAdmin) {
    return (
      <div className=" ">
        <p className="text-red-500 text-[60px]">А-а-аааааа куда полез</p>
        <SigninAdmin
          adminPassword={adminPassword}
          setSuccess={setSuccess}
        />
      </div>
    );
  }
  return (
    <>
      {success && (
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
      )}
    </>
  );
}
