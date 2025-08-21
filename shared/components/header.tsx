"use client";
import { categoryProducts } from "@/constants/categoryProducts";
import useCartStore from "@/store/useCartStore";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React, { use, useState } from "react";
import { useGetCart } from "../hooks/useGetCart";
import { useSession } from "next-auth/react";
import { ModalAddToCart } from "./modal-add-to-cart";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BurgerMenu } from "./burger-menu";

interface Props {
  className?: string;
}

const secondMenuItems = [
  {
    title: "Чоловікам",
    href: "/men",
    gender: "men",
    category: categoryProducts.filter((category) =>
      category.gender.includes("men")
    ),
  },
  {
    title: "Жінкам",
    href: "/women",
    gender: "women",
    category: categoryProducts.filter((category) =>
      category.gender.includes("women")
    ),
  },
  {
    title: "Аксесуари",
    href: "/accessories",
    category: [],
  },
  {
    title: "Avecs",
  },
  {
    title: "Sale",
  },
];

export const Header: React.FC<Props> = ({ className }) => {
  const {
    fetchCart: { data },
  } = useGetCart();

  const { data: sessionData, status } = useSession();
  const { toggleCart } = useCartStore();

  const deleteOrder = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/checkout`);
    },
  });
  const [active, setActive] = useState(false);
  return (
    <div
      className={cn(
        "flex items-center justify-between px-10 py-4  sticky top-0 bg-secondary shadow-md  z-40 max-lg:px-2"
      )}
    >
      {active && <BurgerMenu active={active} setActive={setActive} />}

      <ModalAddToCart />
      <div className="flex items-center gap-20">
        <Link href="/">
          <img src="/logo.png" alt="logo" className="w-26 max-lg:w-18" />
        </Link>

        <ul className={cn("flex gap-10 relative", "max-lg:hidden")}>
          {secondMenuItems.map((item, i) => (
            <li key={i} className="relative group cursor-pointer">
              <span className="hover:text-chart-1 transition-all text-lg text-chart-2 tracking-widest">
                {item.title}
              </span>

              {/* Выпадающее меню */}
              {item.category && (
                <div className="absolute left-0 top-4 mt-2 hidden group-hover:block bg-white shadow-lg rounded-lg p-4 z-50">
                  <Link href={`${item.href}`}>
                    <p className="hover:text-chart-1 transition-all text-sm font-extrabold mb-2">
                      Переглянути всі
                    </p>
                  </Link>
                  <ul className="flex flex-col gap-4 min-w-[200px]">
                    {item.category.map((cat, j) => (
                      <li key={j}>
                        <Link
                          href={`/${item.gender}/${cat.categorySlug}`}
                          className="block hover:text-chart-1 transition-all text-md text-chart-2 "
                        >
                          {cat.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <label
          className={cn(
            "relative flex items-center transition-all duration-300 border-b border-accent-foreground focus-within:border focus-within:border-accent-foreground focus-within:rounded-xl ",
            "max-lg:hidden"
          )}
        >
          <Search className="absolute left-3 text-gray-500 pointer-events-none transition-all duration-300 " />
          <input
            className="outline-none pl-10 pr-4 py-2 w-40 transition-all duration-300 focus:w-90"
            placeholder="Пошук"
          />
        </label>

        {/* Кнопки */}
        <div className="relative flex items-center gap-4 ">
          <Link
            href={status === "authenticated" ? "/my-account" : "/auth/signin"}
            suppressHydrationWarning
          >
            {status === "authenticated" ? (
              sessionData?.user.firstName
            ) : (
              <User />
            )}
          </Link>
          <Link href="/" className="relative">
            <Heart />
            <span className="absolute top-0 left-4 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"></span>
          </Link>
          <div className="relative">
            <ShoppingCart onClick={toggleCart} className=" cursor-pointer" />
            <span className="absolute top-0 left-4 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              {data?.length}
            </span>
          </div>
          <Menu className="hidden max-lg:block" onClick={()=> setActive(true)}/>
        </div>
      </div>
    </div>
  );
};
