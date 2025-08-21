import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { firstName, lastName, email, password,phone } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email и пароль обязательны" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return NextResponse.json(
      { message: "Пользователь с таким email уже существует" },
      { status: 400 }
    );
  }
  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password:hashedPassword,
      firstName,
      lastName,
      phone
    },
  });
  return NextResponse.json(user);
}
