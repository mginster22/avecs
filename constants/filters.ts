export type Filter = {
  id: string;
  name: string;
  type: string;
  options?: {
    label: string;
    count?: number;
    color?: string;
    gender?: string;
  }[];
};
export const filters: Filter[] = [
  {
    id: "sizes",
    name: "Розмір",
    type: "checkbox",
    options: [
      { label: "S" },
      { label: "M" },
      { label: "L" },
      { label: "XL" },
      { label: "XXL" },
    ],
  },
  {
    id: "color",
    name: "Колір",
    type: "checkbox",
    options: [
      { label: "Чорний", color: "black" },
      { label: "Сiрий", color: "gray" },
      { label: "Графіт", color: "graphite" },
      { label: "Блакитний", color: "blue" },
      { label: "Темно-синій", color: "dark blue" },
    ],
  },
  {
    id: "season",
    name: "Сезон",
    type: "checkbox",
    options: [
      { label: "Зима" },
      { label: "Літо" },
      { label: "Демисезон" },
    ],
  },
 
  {
    id: "price",
    name: "Ціна",
    type: "range",
  },
];
