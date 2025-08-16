import { cn } from "@/lib/utils";
import { ChartNoAxesGantt, Info } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  description?: string;
  composition?: string[];
  peculiarities?: string[];
  color?: string;
  season?: string;
  gender?: string;
}

export const CharachteristikProductBlock: React.FC<Props> = ({
  description,
  className,
  composition,
  peculiarities,
  color,
  season,
  gender,
}) => {
  return (
    <div className="mt-10 w-[80%]">
      <h1
        className={cn("uppercase font-bold text-2xl flex items-center gap-2")}
      >
        <span className="bg-gray-300 p-[4px] rounded-xs">
          <Info size={20} />
        </span>
        Опис
      </h1>
      <p className={cn("mt-4 w-[76%] text-sm")}>{description}</p>
      <ul className={cn("flex flex-col gap-2 mt-4")}>
        <h1 className={cn("uppercase font-bold")}>Особливості</h1>
        {peculiarities?.map((itme, i) => (
          <li key={i} className="text-sm">
            -{itme}
          </li>
        ))}
      </ul>
      <ul className={cn("flex flex-col gap-2 mt-4")}>
        <h1 className={cn("uppercase font-bold")}>Склад</h1>
        {composition?.map((itme, i) => (
          <li key={i} className="text-sm">
            -{itme}
          </li>
        ))}
      </ul>
      <ul className="mt-4 border-t-2 pt-8 border-gray-400 flex flex-col gap-4">
        <h2 className="flex items-center gap-2 uppercase font-bold text-2xl">
          <ChartNoAxesGantt size={20} /> Характеристики
        </h2>
        <li className="flex items-center justify-between bg-gray-200 px-2 rounded-[4px]">
            БРЕНД
          <span className="w-1/2 py-2 ">AVECS</span>
        </li>
        <li className="flex items-center justify-between px-2">
            Колір
          <span className="w-1/2 py-2 ">{color}</span>
        </li>
        <li className="flex items-center justify-between bg-gray-200 px-2 rounded-[4px]">
            Сезон
          <span className="w-1/2 py-2 ">{season}</span>
        </li>
        <li className="flex items-center justify-between px-2">
            Стать
          <span className="w-1/2 py-2 ">{gender}</span>
        </li>
      </ul>
    </div>
  );
};
