import { PrismaClient } from "@/app/generated/prisma";
import { products } from "../constants/products";

const prisma = new PrismaClient();

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        gender: product.gender as "men" | "women",
        img: product.img as string[],
        peculiarities: product.peculiarities as string[],
        composition: product.composition as string[],
        description: product.description as string,
        sizes: {
          create: product.sizes.map((s) => ({
            size: s.size,
            quantity: s.quantity,
          })),
        },
      },
    });
  }
// await prisma.product.upsert({
//   where: { slug: "men-futbolki-30498-17" },
//   update: {},
//   create: {
//     gender: "men",
//     category: "Футболки",
//     categorySlug: "futbolki",
//     title: "Футболка 30498-17",
//     season: "Літо",
//     model: "30498-17",
//     slug: "men-futbolki-30498-17",
//     price: 1174,
//     color: "gray",
//     colorLabel: "Сіра",
//     composition: ["Нейлон 69%", "Поліестер 18%", "Спандекс 13%"],
//     peculiarities: [
//       "Soft touch",
//       "Breathable",
//       "Sweat Wiking",
//     ],
//     description: "Чоловіча футболка AVECS ...",
//     img: [
//       "/sweater/model(50518)/1.webp",
//       "/sweater/model(50518)/2.webp",
//     ],
//     sizes: {
//       create: [
//         { size: "S", quantity: 10 },
//         { size: "M", quantity: 5 },
//       ],
//     },
//   },
// });


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
