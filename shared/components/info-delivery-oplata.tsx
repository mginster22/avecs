import React from "react";

interface Props {
  className?: string;
}
const infoBlock = [
  {
    title: "Доставка",
    imgTitle: "/assets/delivery-icon.svg",
    items: [
      {
        title: " Нова Пошта",
        img: "/assets/novaposhta.svg",
      },
      {
        title: "Укрпошта",
        img: "/assets/ukrposhta.svg",
      },
      {
        title: "Точки видачі Rozetka",
        img: "/assets/rozetka.svg",
      },
      {
        title: "Meest ПОШТА",
        img: "/assets/meest-strilka.svg",
      },
    ],
  },
  {
    title: "Оплата",
    imgTitle: "/assets/delivery-icon.svg",
    items: [
      {
        title: "LiqPay",
        img: "/assets/liqpay.svg",
      },
      {
        title: "Оплата частинами Приват Банк",
        img: "/assets/pp.svg",
      },
      {
        title: "Миттєва розстрочка Приват Банк",
        img: "/assets/mr.svg",
      },
      {
        title: "Безготівковий розрахунок",
        img: "/assets/terminal.svg",
      },
      {
        title: "Післяплата",
        img: "/assets/nal.svg",
      },
    ],
  },
  {
    title: "Гарантії",
    imgTitle: "/assets/security.svg",
    items: [
      {
        title: "Поверненя",
        img: "/assets/vozvrat.svg",
      },
      {
        title: "Обмін",
        img: "/assets/obmen.svg",
      },
    ],
  },
];
export const InfoDeliveryOplata: React.FC<Props> = ({ className }) => {
  return (
    <div className="max-lg:mt-4">
      <div className="flex flex-col gap-6 ">
        {infoBlock.map((item, i) => (
          <div key={i} className="flex flex-col gap-2 border-1 border-gray-300 p-4">
            <h1 className="font-bold text-2xl flex items-center gap-2 ">
              <img src={item.imgTitle} alt="" className="w-6"/>
              {item.title}
            </h1>
            <div className="flex flex-col gap-2">
              {item.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <img src={item.img} alt="" className="w-6"/>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
