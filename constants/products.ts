/* Сделать динамический роутинг по /product/[model]/[variantSubModel]
При переходе брать model и variantSubModel из URL и показывать нужный вариант. */
export interface ProductSize {
  size: string; // например "S"
  quantity: number; // сколько штук осталось
}
export interface Product {
  category: string;
  categorySlug: string;
  title: string;
  gender: "men" | "women";
  model: string;
  slug: string;
  price: number;
  sizes: ProductSize[];
  color: string;
  colorLabel: string;
  img: string[];
  season: string;
  description?: string;
  peculiarities: string[];
  composition: string[];
}

export const products: Product[] = [
  //Кофта/Худі
  {
    category: "Кофта/Худі",
    categorySlug: "hudi-sweter",
    title: "Худі Avecs",
    season: "Демисезон",
    gender: "men",

    composition: ["Нейлон 69%  ", "Поліестер 18%", "Спандекс 13%"],
    peculiarities: [
      "Технологія 'Soft touch'",
      "Властивості тканини 'Breathable'",
      "Технологія 'Sweat Wiking'",
      "Технологія 'Sustainable'",
      "Технологія 'lightweight'",
    ],
    description:
      "Чоловіча футболка AVECS - це симбіоз високих технологій і комфорту, ідеально підходить для спортивних та повсякденних образів. Технологія 'Soft Touch', забезпечує неперевершений комфорт, завдяки м'якій та приємній на дотик тканині. Технологія 'Breathable' надасть чудову 'дихаючість', Ви забудете про почуття дискомфорту через вологу або спекотну погоду. Виріб пропускає повітря та вологу, дозволяючи Вашій шкірі дихати, що робить її ідеальною як для спортивних занять, так і для повсякденного використання. Технологія 'Sweat Wiking' - це просочення тканини спеціальними розчинами, які гарантують відведення поту з тіла ще до того, як він поглинеться тканиною. Обираючи футболку AVECS, Ви обираєте не просто одяг, а новий рівень комфорту. ",
    model: "50518/23",
    slug: "men-kofta-hudi-50518-23",
    price: 2368,
    sizes: [
      { size: "S", quantity: 10 },
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 30 },
      { size: "XXL", quantity: 30 },
    ],
    colorLabel: "Темно-синя",
    color: "dark blue",
    img: [
      "/sweater/model(50518)/1.webp",
      "/sweater/model(50518)/2.webp",
      "/sweater/model(50518)/3.webp",
      "/sweater/model(50518)/4.webp",
      "/sweater/model(50518)/5.webp",
    ],
  },
  {
    category: "Кофта/Худі",
    categorySlug: "hudi-sweter",
    title: "Худі Avecs",
    model: "50518/1",
    season: "Демисезон",
    composition: ["Нейлон 69%  ", "Поліестер 18%", "Спандекс 13%"],

    peculiarities: [
      "Технологія 'Soft touch'",
      "Властивості тканини 'Breathable'",
      "Технологія 'Sweat Wiking'",
      "Технологія 'Sustainable'",
      "Технологія 'lightweight'",
    ],
    description:
      "Чоловіча футболка AVECS - це симбіоз високих технологій і комфорту, ідеально підходить для спортивних та повсякденних образів. Технологія 'Soft Touch', забезпечує неперевершений комфорт, завдяки м'якій та приємній на дотик тканині. Технологія 'Breathable' надасть чудову 'дихаючість', Ви забудете про почуття дискомфорту через вологу або спекотну погоду. Виріб пропускає повітря та вологу, дозволяючи Вашій шкірі дихати, що робить її ідеальною як для спортивних занять, так і для повсякденного використання. Технологія 'Sweat Wiking' - це просочення тканини спеціальними розчинами, які гарантують відведення поту з тіла ще до того, як він поглинеться тканиною. Обираючи футболку AVECS, Ви обираєте не просто одяг, а новий рівень комфорту. ",
    gender: "men",
    slug: "men-kofta-hudi-50518-1",
    price: 2368,
    sizes: [
      { size: "S", quantity: 10 },
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 30 },
      { size: "XXL", quantity: 30 },
    ],
    color: "black",
    colorLabel: "Чорне",
    img: [
      "/sweater/model(50518)/6.webp",
      "/sweater/model(50518)/7.webp",
      "/sweater/model(50518)/8.webp",
      "/sweater/model(50518)/9.webp",
      "/sweater/model(50518)/10.webp",
    ],
  },
  {
    category: "Кофта/Худі",
    categorySlug: "hudi-sweter",
    gender: "men",
    season: "Демисезон",
    composition: ["Нейлон 69%  ", "Поліестер 18%", "Спандекс 13%"],

    peculiarities: [
      "Технологія 'Soft touch'",
      "Властивості тканини 'Breathable'",
      "Технологія 'Sweat Wiking'",
      "Технологія 'Sustainable'",
      "Технологія 'lightweight'",
    ],
    description:
      "Чоловіча футболка AVECS - це симбіоз високих технологій і комфорту, ідеально підходить для спортивних та повсякденних образів. Технологія 'Soft Touch', забезпечує неперевершений комфорт, завдяки м'якій та приємній на дотик тканині. Технологія 'Breathable' надасть чудову 'дихаючість', Ви забудете про почуття дискомфорту через вологу або спекотну погоду. Виріб пропускає повітря та вологу, дозволяючи Вашій шкірі дихати, що робить її ідеальною як для спортивних занять, так і для повсякденного використання. Технологія 'Sweat Wiking' - це просочення тканини спеціальними розчинами, які гарантують відведення поту з тіла ще до того, як він поглинеться тканиною. Обираючи футболку AVECS, Ви обираєте не просто одяг, а новий рівень комфорту. ",
    title: "Кофта флісова Avecs",
    model: "50323/64",
    slug: "men-kofta-hudi-50323-64",
    price: 2368,
    sizes: [
      { size: "S", quantity: 10 },
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 30 },
      { size: "XXL", quantity: 30 },
    ],
    color: "blue",
    colorLabel: "Cиня",
    img: [
      "/sweater/model(50323)/1.webp",
      "/sweater/model(50323)/2.webp",
      "/sweater/model(50323)/3.webp",
      "/sweater/model(50323)/4.webp",
    ],
  },
  {
    category: "Кофта/Худі",
    categorySlug: "hudi-sweter",
    title: "Кофта флісова Avecs",
    season: "Демисезон",
    composition: ["Нейлон 69%  ", "Поліестер 18%", "Спандекс 13%"],

    peculiarities: [
      "Технологія 'Soft touch'",
      "Властивості тканини 'Breathable'",
      "Технологія 'Sweat Wiking'",
      "Технологія 'Sustainable'",
      "Технологія 'lightweight'",
    ],
    description:
      "Чоловіча футболка AVECS - це симбіоз високих технологій і комфорту, ідеально підходить для спортивних та повсякденних образів. Технологія 'Soft Touch', забезпечує неперевершений комфорт, завдяки м'якій та приємній на дотик тканині. Технологія 'Breathable' надасть чудову 'дихаючість', Ви забудете про почуття дискомфорту через вологу або спекотну погоду. Виріб пропускає повітря та вологу, дозволяючи Вашій шкірі дихати, що робить її ідеальною як для спортивних занять, так і для повсякденного використання. Технологія 'Sweat Wiking' - це просочення тканини спеціальними розчинами, які гарантують відведення поту з тіла ще до того, як він поглинеться тканиною. Обираючи футболку AVECS, Ви обираєте не просто одяг, а новий рівень комфорту. ",
    gender: "men",
    model: "50323/17",
    slug: "men-kofta-hudi-50323-17",
    price: 2368,
    sizes: [
      { size: "S", quantity: 10 },
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 30 },
      { size: "XXL", quantity: 30 },
    ],
    color: "graphite",
    colorLabel: "Темно-сіра",
    img: [
      "/sweater/model(50323)/5.webp",
      "/sweater/model(50323)/6.webp",
      "/sweater/model(50323)/7.webp",
    ],
  },
  {
    category: "Кофта/Худі",
    categorySlug: "hudi-sweter",
    season: "Літо",
    composition: ["Нейлон 69%  ", "Поліестер 18%", "Спандекс 13%"],

    peculiarities: [
      "Технологія 'Soft touch'",
      "Властивості тканини 'Breathable'",
      "Технологія 'Sweat Wiking'",
      "Технологія 'Sustainable'",
      "Технологія 'lightweight'",
    ],
    description:
      "Чоловіча футболка AVECS - це симбіоз високих технологій і комфорту, ідеально підходить для спортивних та повсякденних образів. Технологія 'Soft Touch', забезпечує неперевершений комфорт, завдяки м'якій та приємній на дотик тканині. Технологія 'Breathable' надасть чудову 'дихаючість', Ви забудете про почуття дискомфорту через вологу або спекотну погоду. Виріб пропускає повітря та вологу, дозволяючи Вашій шкірі дихати, що робить її ідеальною як для спортивних занять, так і для повсякденного використання. Технологія 'Sweat Wiking' - це просочення тканини спеціальними розчинами, які гарантують відведення поту з тіла ще до того, як він поглинеться тканиною. Обираючи футболку AVECS, Ви обираєте не просто одяг, а новий рівень комфорту. ",
    gender: "men",
    title: "Кофта флісова Avecs",
    model: "50323/1",
    slug: "men-kofta-hudi-50323-1",
    price: 2368,
    sizes: [
      { size: "S", quantity: 10 },
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 30 },
      { size: "XXL", quantity: 30 },
    ],
    color: "black",
    colorLabel: "Чорна",
    img: [
      "/sweater/model(50323)/8.webp",
      "/sweater/model(50323)/9.webp",
      "/sweater/model(50323)/10.webp",
    ],
  },
  {
    category: "Спортивні костюми",
    categorySlug: "tracksuit",
    season: "Зима",
    composition: ["Нейлон 69%  ", "Поліестер 18%", "Спандекс 13%"],

    peculiarities: [
      "Технологія 'Soft touch'",
      "Властивості тканини 'Breathable'",
      "Технологія 'Sweat Wiking'",
      "Технологія 'Sustainable'",
      "Технологія 'lightweight'",
    ],
    description:
      "Чоловіча футболка AVECS - це симбіоз високих технологій і комфорту, ідеально підходить для спортивних та повсякденних образів. Технологія 'Soft Touch', забезпечує неперевершений комфорт, завдяки м'якій та приємній на дотик тканині. Технологія 'Breathable' надасть чудову 'дихаючість', Ви забудете про почуття дискомфорту через вологу або спекотну погоду. Виріб пропускає повітря та вологу, дозволяючи Вашій шкірі дихати, що робить її ідеальною як для спортивних занять, так і для повсякденного використання. Технологія 'Sweat Wiking' - це просочення тканини спеціальними розчинами, які гарантують відведення поту з тіла ще до того, як він поглинеться тканиною. Обираючи футболку AVECS, Ви обираєте не просто одяг, а новий рівень комфорту. ",
    gender: "men",
    title: "Спортивний костюм мікрофліс AVECS",
    model: "50499/1",
    slug: "men-tracksuit-50499-1",
    price: 4756,
    sizes: [
      { size: "S", quantity: 10 },
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 30 },
      { size: "XXL", quantity: 30 },
    ],
    color: "black",
    colorLabel: "Чорний",
    img: [
      "/tracksuit/model(50499)/1.webp",
      "/tracksuit/model(50499)/2.webp",
      "/tracksuit/model(50499)/3.webp",
      "/tracksuit/model(50499)/4.webp",
    ],
  },
  {
    category: "Спортивні костюми",
    categorySlug: "tracksuit",
    gender: "men",
    title: "Спортивний костюм AVECS",
    season: "Демисезон",
    composition: ["Нейлон 69%  ", "Поліестер 18%", "Спандекс 13%"],

    peculiarities: [
      "Технологія 'Soft touch'",
      "Властивості тканини 'Breathable'",
      "Технологія 'Sweat Wiking'",
      "Технологія 'Sustainable'",
      "Технологія 'lightweight'",
    ],
    description:
      "Чоловіча футболка AVECS - це симбіоз високих технологій і комфорту, ідеально підходить для спортивних та повсякденних образів. Технологія 'Soft Touch', забезпечує неперевершений комфорт, завдяки м'якій та приємній на дотик тканині. Технологія 'Breathable' надасть чудову 'дихаючість', Ви забудете про почуття дискомфорту через вологу або спекотну погоду. Виріб пропускає повітря та вологу, дозволяючи Вашій шкірі дихати, що робить її ідеальною як для спортивних занять, так і для повсякденного використання. Технологія 'Sweat Wiking' - це просочення тканини спеціальними розчинами, які гарантують відведення поту з тіла ще до того, як він поглинеться тканиною. Обираючи футболку AVECS, Ви обираєте не просто одяг, а новий рівень комфорту. ",
    model: "50512/94",
    slug: "men-tracksuit-50512-94",
    price: 4756,
    sizes: [
      { size: "S", quantity: 10 },
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 30 },
      { size: "XXL", quantity: 30 },
    ],
    color: "gray",
    colorLabel: "Сірий",
    img: [
      "/tracksuit/model(50512)/1.webp",
      "/tracksuit/model(50512)/2.webp",
      "/tracksuit/model(50512)/3.webp",
    ],
  },
  {
    category: "Спортивні костюми",
    categorySlug: "tracksuit",
    season: "Літо",
    composition: ["Нейлон 69%  ", "Поліестер 18%", "Спандекс 13%"],

    peculiarities: [
      "Технологія 'Soft touch'",
      "Властивості тканини 'Breathable'",
      "Технологія 'Sweat Wiking'",
      "Технологія 'Sustainable'",
      "Технологія 'lightweight'",
    ],
    description:
      "Чоловіча футболка AVECS - це симбіоз високих технологій і комфорту, ідеально підходить для спортивних та повсякденних образів. Технологія 'Soft Touch', забезпечує неперевершений комфорт, завдяки м'якій та приємній на дотик тканині. Технологія 'Breathable' надасть чудову 'дихаючість', Ви забудете про почуття дискомфорту через вологу або спекотну погоду. Виріб пропускає повітря та вологу, дозволяючи Вашій шкірі дихати, що робить її ідеальною як для спортивних занять, так і для повсякденного використання. Технологія 'Sweat Wiking' - це просочення тканини спеціальними розчинами, які гарантують відведення поту з тіла ще до того, як він поглинеться тканиною. Обираючи футболку AVECS, Ви обираєте не просто одяг, а новий рівень комфорту. ",
    gender: "women",
    title: "Спортивний костюм AVECS",
    model: "50472/7/",
    slug: "women-tracksuit-50472-7",
    price: 4756,
    sizes: [
      { size: "S", quantity: 10 },
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 30 },
      { size: "XXL", quantity: 30 },
    ],
    color: "bewevuy",
    colorLabel: "Бежевий",
    img: [
      "/tracksuit/model(50472-7)/1.webp",
      "/tracksuit/model(50472-7)/2.webp",
      "/tracksuit/model(50472-7)/3.webp",
      "/tracksuit/model(50472-7)/4.webp",
      "/tracksuit/model(50472-7)/5.webp",
      "/tracksuit/model(50472-7)/6.webp",
      "/tracksuit/model(50472-7)/7.webp",
    ],
  },
  {
    gender: "men",
    category: "Футболки",
    categorySlug: "futbolki",
    title: "Футболка 30498-17",
    season: "Літо",
    model: "30498-17",
    slug: "men-futbolki-30498-17",
    price: 1174,
    color: "gray",
    colorLabel: "Сіра",
    composition: ["Нейлон 69%", "Поліестер 18%", "Спандекс 13%"],
    peculiarities: ["Soft touch", "Breathable", "Sweat Wiking"],
    description: "Чоловіча футболка AVECS ...",
    img: ["/sweater/model(50518)/1.webp", "/sweater/model(50518)/2.webp"],
    sizes: [
      { size: "S", quantity: 10 },
      { size: "M", quantity: 5 },
    ],
  },
  
];
