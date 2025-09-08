"use client";
import { filters } from "@/constants/filters";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useClickAway } from "react-use";

interface Props {
  className?: string;
  selectedOptions: Record<string, string[]>;
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  priceRange: { min: number; max: number };
  setPriceRange: React.Dispatch<
    React.SetStateAction<{ min: number; max: number }>
  >;
  toggleOptionSimple: (categoryId: string, optionValue: string) => void;
}

export const ModalFilters: React.FC<Props> = ({
  className,
  selectedOptions,
  setSelectedOptions,
  priceRange,
  setPriceRange,
  toggleOptionSimple,
}) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState(false);
  const menuRef = React.useRef(null);
  useClickAway(menuRef, () => {
    setActiveMenu(false);
  });

  return (
    <div className="relative">
      <div
        className={cn(
          "fixed top-0 left-0 w-screen h-screen bg-black/50 z-40 transition-opacity duration-300 min-lg:hidden ",
          {
            "opacity-100 pointer-events-auto": activeMenu,
            "opacity-0 pointer-events-none": !activeMenu,
          }
        )}
      >
        <div
          ref={menuRef}
          className={cn(
            "fixed top-0 left-0 h-screen w-140 max-lg:w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-out flex flex-col p-4"
          )}
        >
          {/* Заголовок */}
          {!activeFilter && <h1 className="mb-10 text-lg font-bold">Фільтр</h1>}

          {/* Основное меню */}
          {!activeFilter &&
            filters.map(({ id, name }) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className="border-b border-gray-200 p-3 w-full text-start flex items-center justify-between"
              >
                {name} <ChevronRight size={16} />
              </button>
            ))}

          {/* Сабменю */}
          {activeFilter &&
            filters
              .filter((f) => f.id === activeFilter)
              .map(({ id, name, options, type }) => (
                <div key={id} className="flex flex-col h-full">
                  {/* Заголовок + кнопка назад */}
                  <div className="flex items-center mb-6">
                    <button
                      className="flex items-center gap-1 text-sm text-gray-600"
                      onClick={() => setActiveFilter(null)}
                    >
                      <ChevronLeft size={16} /> Назад
                    </button>
                    <h2 className="ml-4 font-bold">{name}</h2>
                  </div>

                  {/* Опции */}
                  <div className="flex flex-col gap-3 overflow-y-auto">
                    {type === "checkbox" &&
                      options?.map(({ label, count, color }) => (
                        <label
                          key={label}
                          className="flex items-center justify-between gap-2 cursor-pointer mb-1 group"
                        >
                          <span className="flex items-center gap-2">
                            <input
                              className="peer hidden"
                              type="checkbox"
                              checked={
                                selectedOptions[id]?.includes(color ?? label) ||
                                false
                              }
                              onChange={() =>
                                toggleOptionSimple(id, color ?? label)
                              }
                            />
                            <span className="w-7 h-7 border border-gray-300 flex items-center justify-center peer-checked:bg-chart-1 peer-checked:border-chart-1 duration-100 transition-all">

                            </span>
                            {label}
                          </span>
                          {count && (
                            <span className="text-[10px] bg-chart-4 p-[3px] rounded-full">
                              {count}
                            </span>
                          )}
                        </label>
                      ))}

                    {type === "range" && (
                      <div className="flex flex-col gap-4">
                        <div>
                          <label>Min: </label>
                          <input
                            type="range"
                            min={0}
                            max={9000}
                            step={10}
                            value={priceRange.min}
                            onChange={(e) =>
                              setPriceRange((prev) => ({
                                ...prev,
                                min: Math.min(Number(e.target.value), prev.max),
                              }))
                            }
                          />
                        </div>
                        <div>
                          <label>Max: </label>
                          <input
                            type="range"
                            min={0}
                            max={9000}
                            step={10}
                            value={priceRange.max}
                            onChange={(e) =>
                              setPriceRange((prev) => ({
                                ...prev,
                                max: Math.max(Number(e.target.value), prev.min),
                              }))
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
      <button
        onClick={() => setActiveMenu(!activeMenu)}
        className={cn(
          "fixed -left-8 top-1/2 bg-chart-1 z-50 -rotate-90 flex items-center gap-2 min-lg:hidden  px-3 py-2 text-sm text-secondary rounded-sm",
          { "opacity-0 pointer-events-none": activeMenu }
        )}
      >
        <SlidersHorizontal size={16} />
        Фільтр
      </button>
    </div>
  );
};
