"use client";
import { categoryProducts } from "@/constants/categoryProducts";
import { cn } from "@/lib/utils";
import { Facebook, Instagram } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  className?: string;
  active:boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>
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
  { title: "Avecs" },
  { title: "Sale" },
];

export const BurgerMenu: React.FC<Props> = ({setActive, className }) => {
  const { data: session } = useSession();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleSubMenu = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-screen h-screen bg-black/50 z-40 transition-opacity duration-300"
      )}
      onClick={() => setActive(false)}
    >
      <div
        className={cn(
          "absolute top-13 right-2 bg-chart-5 text-secondary w-90 ",
          className
        )}
          onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-10">
          {session?.user ? (
            <div className="bg-[#3464AC] px-4 py-2">
              <p>Мій кабінет</p>
            </div>
          ) : (
            <div>
              <p>Увійти</p>
            </div>
          )}
        </div>
        <ul className="flex flex-col gap-4 px-4">
          {secondMenuItems.map((item, i) => (
            <li
              key={i}
              className="relative border-b-1 pb-2 cursor-pointer"
              onClick={() => toggleSubMenu(i)}
            >
              <p className="font-light">{item.title}</p>

              {/* Подменю показывается только для активного пункта */}
              {item.category && item.category.length > 0 && (
                <>
                  <ul
                    className={cn(
                      "absolute z-50 top-10 left-0 h-[300px] px-4 w-full flex flex-col gap-2 bg-[#3464AC] overflow-y-auto transition-all duration-300",
                      activeIndex === i
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    )}
                  >
                    {item.category.map((sub, j) => (
                      <li key={j} className="border-b-1 py-2">
                        <Link
                          href={`/${item.gender}/${sub.categorySlug}`}
                          className="font-light"
                           onClick={() => setActive(false)}
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
        <p className="px-4 border-b-1 py-4 mt-10"> AVECS COMMUNITY</p>
        <div className="flex  items-center justify-center gap-4 pb-10 mt-10">
          <p className="p-2 bg-primary">
            <Instagram />
          </p>
          <p className="p-2 bg-primary">
            <Facebook />
          </p>
        </div>
      </div>
    </div>
  );
};
