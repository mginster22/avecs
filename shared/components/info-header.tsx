import { DollarSign } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}
const firstMenuItems = [
  {
    name: "Оплата",
    href: "/",
  },
  {
    name: "Партнерам",
    href: "/",
  },
  {
    name: "Доставка",
    href: "/",
  },
  {
    name: "Гарантія",
    href: "/",
  },
  {
    name: "Контакти",
    href: "/",
  },
];
export const InfoHeader: React.FC<Props> = ({ className }) => {
  return (
    <div className="bg-[#25387C] px-10 py-2 flex items-center justify-between text-accent text-xs  max-lg:justify-center ">
      <div className="flex items-center gap-2 max-lg:hidden">
        <img src="/ua.svg" alt="ua" className="w-6" />
        <DollarSign color="white" />
      </div>
      <p className="ml-40 max-lg:ml-0">Безкоштовна доставка вiд 2000 грн</p>
      <ul className="flex gap-2 max-lg:hidden">
        {firstMenuItems.map((item, i) => (
          <Link
            href={item.href}
            key={item.name}
            className="hover:text-chart-1 transition-all"
          >
            <li key={i}>{item.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
