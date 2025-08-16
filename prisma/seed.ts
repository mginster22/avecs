/*************  ✨ Windsurf Command ⭐  *************/
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
        sizes: product.sizes as string[],
        img: product.img as string[],
        peculiarities: product.peculiarities as string[],
        composition: product.composition as string[],
        description: product.description as string,
      },
    });
  }
  const users = [
    {
      email: "mginster234942@gmail.com",
      password: "2322",
      name: "Vlad",
      role: "ADMIN",
    },
    {
      email: "vladvlad@gmail.com",
      password: "2322",
      name: "Vladislav",
      role: "USER",
    },
  ];
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        password: user.password,
        firstName: user.name,
        lastName: user.name,
        role: user.role as "USER" | "ADMIN",
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
