"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  const [active, setActive] = React.useState<number | null>(null);
  const footerItems = [
    {
      title: "ОБЛІКОВИЙ ЗАПИС",
      items: [
        { title: "Вхід", href: "/signin" },
        { title: "Реєстрація", href: "/signUp" },
      ],
    },

    {
      title: "ДОВІДКА",
      items: [
        { title: "Доставка", href: "" },
        { title: "Повернення", href: "" },
        { title: "Політика безпеки", href: "" },
        { title: "Умови згоди", href: "" },
        { title: "Контакти", href: "" },
        { title: "Блог", href: "" },
      ],
    },
    {
      title: "ІНФОРМАЦІЯ",
      items: [
        { title: "Про AVECS", href: "" },
        { title: "Місія AVECS", href: "" },
        { title: "AVECS CLUB", href: "" },
        { title: "Технології", href: "" },
        { title: "Відгуки", href: "" },
      ],
    },
    {
      title: "КОНТАКТИ",
      items: [
        { title: "+380982865134", href: "" },
        { title: "+380639585200", href: "" },
        { title: "contact.avecs@gmail.com", href: "" },
        { title: "Пн-Сб з 9:00-19:00 Нд - вихiдний", href: "" },
        { title: "м.Одеса, вул. Базова 17", href: "" },
      ],
    },
    {
      title: "МАПА САЙТУ",
      items: [
        { title: "Чоловікам", href: "/signin" },
        { title: "Жінкам", href: "/signUp" },
        { title: "Аксесуари", href: "/signUp" },
        { title: "Акції", href: "/signUp" },
        { title: "Всі категорiї", href: "/signUp" },
      ],
    },
  ];
  return (
    <div className={cn("bg-primary p-4 flex gap-20 max-lg:flex-col-reverse")}>
      {/* left */}
      <div className="flex flex-col gap-4">
        <img src="/assets/logo-footer.svg" alt="logo" className="w-50" />
        <div className="flex gap-4 items-center">
          <img src="/assets/liqpay.svg" className="w-6" />
          <img src="/assets/mr.svg" className="w-6" />
          <img src="/assets/pay.svg" className="w-6" />
          <img src="/assets/pp.svg" className="w-6" />
          <img src="/assets/rozetka.svg" className="w-6" />
          <img />
        </div>
      </div>
      <ul className="grid grid-cols-4 text-secondary max-lg:grid-cols-1 max-lg:gap-2">
        {footerItems.map((item, i) => (
          <li key={i} className="flex flex-col gap-2">
            <div
              className={cn(
                "flex justify-between items-center",
                item.title === "МАПА САЙТУ" && "-mt-26 max-lg:mt-0"
              )}
            >
              <p
                onClick={() => setActive((prev) => (prev === i ? null : i))}
                className={cn("font-bold")}
              >
                {item.title}
              </p>
              <ChevronDown className="hidden max-lg:block" />
            </div>
            {item.items.map((item, j) => (
              <Link
                href={item.href}
                key={j}
                className={cn("max-lg:hidden", active === i && "max-lg:block")}
              >
                <p className="hover:text-chart-1 transition-all">
                  {item.title}
                </p>
              </Link>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};
