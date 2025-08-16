"use client";
import React, { useState, useRef, useEffect } from "react";
import { filters } from "@/constants/filters";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  selectedOptions: Record<string, string[]>;
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  priceRange: { min: number; max: number };
  setPriceRange: React.Dispatch<
    React.SetStateAction<{ min: number; max: number }>
  >;
  isCategorySlug?: boolean;
}

export default function FiltersInputGroup({
  isCategorySlug,
  selectedOptions,
  setSelectedOptions,
  priceRange,
  setPriceRange,
}: Props) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenCategory(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // функция переключение много опций для checkbox когда будет много опций для checkbox
  const toggleOptionSimple = (categoryId: string, optionValue: string) => {
    setSelectedOptions((prev) => {
      const prevArray = prev[categoryId] || [];
      let newArray;

      if (prevArray.includes(optionValue)) {
        // если есть — удаляем
        newArray = prevArray.filter((v) => v !== optionValue);
      } else {
        // если нет — добавляем
        newArray = [...prevArray, optionValue];
      }

      return { ...prev, [categoryId]: newArray };
    });
  };



  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-4 mt-10",
        isCategorySlug && "grid-cols-3"
      )}
      ref={containerRef}
    >
      {filters
        .filter(({ id }) => {
          if (!isCategorySlug) return true; // если флаг не включен — показываем всё
          return id === "color" || id === "season" || id === "price"; // показываем только нужные
        })
        .map(({ id, name, options, type }) => (
          <div key={id} className="relative">
            <button
              onClick={() => toggleCategory(id)}
              className="bg-chart-4 p-3 w-full text-start flex items-center justify-between"
            >
              {name} <ChevronDown />
            </button>

            {openCategory === id && (
              <div className="absolute left-0 top-0 bg-white shadow-xl p-4 w-full z-50">
                <div
                  className="flex items-center justify-between mb-2"
                  onClick={() => toggleCategory(id)}
                >
                  <p>{name.toUpperCase()}</p>
                  <ChevronDown />
                </div>

                {type === "checkbox" &&
                  options?.map(({ label, count, color }) => (
                    <label
                      key={label}
                      className="flex items-center justify-between gap-2 cursor-pointer mb-1"
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={
                            selectedOptions[id]?.includes(color ?? label) ||
                            false
                          }
                          onChange={() =>
                            toggleOptionSimple(id, color ?? label)
                          }
                        />
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
                      <label>Min: {priceRange.min}</label>
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
                      <label>Max: {priceRange.max}</label>
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
            )}
          </div>
        ))}
    </div>
  );
}
