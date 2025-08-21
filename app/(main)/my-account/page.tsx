"use client";
import { cn } from "@/lib/utils";
import { MainImageBlock } from "@/shared/components/main-image-block";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
interface Props {
  className?: string;
}

interface UserMenuItem {
  title: string;
  values: {
    title: string;
    link?: string;
  }[];
}
const userMenuItems: UserMenuItem[] = [
  {
    title: "Мої замовлення",
    values: [
      { title: "Вподобання", link: "/favorite" },
      { title: "Історія замовлень", link: "/orders" },
    ],
  },
  {
    title: "Мої бонуси",
    values: [
      { title: "Доступні купони", link: "/favorite" },
      { title: "Бонусні бали", link: "/orders" },
    ],
  },
  {
    title: "Обліковий запис",
    values: [
      { title: "Контактна інформація", link: "/favorite" },
      { title: "Зміна пароля", link: "/orders" },
      { title: "Вихід" },
    ],
  },
];
const MyAccountPage: React.FC<Props> = ({ className }) => {

    
  return (
    <div className={cn("pb-10 flex flex-col gap-10", className)}>
      <MainImageBlock text="Вітаємо вас в особистому кабінеті AVECS!" />
      <div className="grid grid-cols-3 gap-4 px-4 mt-10 max-lg:grid-cols-1 max-lg:mt-0">
        {userMenuItems.map((item, i) => (
          <div key={i} className="flex flex-col gap-4 border-1 p-4">
            <p className="font-bold uppercase">{item.title}</p>
            {item.values.map((value, j) =>
              value.link ? (
                <Link href={value.link} key={j}>
                  <p className="hover:text-chart-1 transition-all border-b-4 border-b-gray-300 pb-4 w-[80%]">
                    {value.title}
                  </p>
                </Link>
              ) : (
                <p onClick={()=>signOut({callbackUrl:"/"})} key={j} className="pb-4 w-[80%] hover:text-chart-1 transition-all cursor-pointer">
                  {value.title}
                </p>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAccountPage;
