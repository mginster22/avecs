import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  description?: string;
  composition?: string[];
  peculiarities?: string[];
}

export const CharachteristikProductBlock: React.FC<Props> = ({
  description,
  className,
  composition,
  peculiarities,
}) => {
  return (
    <div className="mt-10">
      <h1 className={cn("uppercase font-bold text-2xl flex items-center gap-2")}>
       <span className="bg-gray-500 p-1 rounded-md"><Info size={14} /></span>
        Опис
        </h1>
      <p className={cn("mt-4 w-[76%] text-sm")}>{description}</p>
      <ul className={cn("flex flex-col gap-2 mt-4")}>
        <h1 className={cn("uppercase font-bold")}>Особливості</h1>
        {peculiarities?.map((itme, i) => (
          <li key={i} className="text-sm">-{itme}</li>
        ))}
      </ul>
      <ul className={cn("flex flex-col gap-2 mt-4")}>
        <h1 className={cn("uppercase font-bold")}>Склад</h1>
        {composition?.map((itme, i) => (
          <li key={i} className="text-sm">-{itme}</li>
        ))}
      </ul>
    </div>
  );
};
