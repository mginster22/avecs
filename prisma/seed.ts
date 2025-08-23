import { PrismaClient } from "@/app/generated/prisma";
import { products } from "../constants/products";

const prisma = new PrismaClient();

async function main() {
  // for (const product of products) {
  //   await prisma.product.upsert({
  //     where: { slug: product.slug },
  //     update: {},
  //     create: {
  //       ...product,
  //       gender: product.gender as "men" | "women",
  //       img: product.img as string[],
  //       peculiarities: product.peculiarities as string[],
  //       composition: product.composition as string[],
  //       description: product.description as string,
  //       sizes: {
  //         create: product.sizes.map((s) => ({
  //           size: s.size,
  //           quantity: s.quantity,
  //         })),
  //       },
  //     },
  //   });
  // }
await prisma.product.upsert({
  where: { slug: "women-legincu-30570-1" },
  update: {},
  create: {
    gender: "women",
    category: "Легінси",
    categorySlug: "legincu",
    title: "Легінси Avecs темно-сірі з технологією Flat Seams",
    season: "Демисезон",
    model: "30570-1",
    slug: "women-legincu-30570-1",
    price: 1343,
    color: "gray",
    colorLabel: "",
    composition: ["Нейлон 69%", "Поліестер 18%", "Спандекс 13%"],
    peculiarities: [
      "Soft touch",
      "Breathable",
      "Sweat Wiking",
    ],
    description: "Жіночі легінси AVECS ...",
    img: [
      "/legincu/model(30570-17)/1.webp",
      "/legincu/model(30570-17)/2.webp",
      "/legincu/model(30570-17)/3.webp",
    ],
    sizes: {
      create: [
        { size: "M", quantity: 10 },
        { size: "L", quantity: 5 },
        { size: "XL", quantity: 5 },
      ],
    },
  },
});


  // const users = [
  //   {
  //     email: "mginster234942@gmail.com",
  //     password: "2322",
  //     name: "Vlad",
  //     role: "ADMIN",
  //   },
  //   {
  //     email: "vladvlad@gmail.com",
  //     password: "2322",
  //     name: "Vladislav",
  //     role: "USER",
  //   },
  // ];
  // for (const user of users) {
  //   await prisma.user.upsert({
  //     where: { email: user.email },
  //     update: {},
  //     create: {
  //       email: user.email,
  //       password: user.password,
  //       firstName: user.name,
  //       lastName: user.name,
  //       role: user.role as "USER" | "ADMIN",
  //     },
  //   });
  // }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
