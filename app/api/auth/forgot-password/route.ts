import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
  const { email, newPassword, confirmNewPassword } = await req.json();

  if (!email || !newPassword || !confirmNewPassword) {
    return new Response("Missing fields", { status: 400 });
  }

  if (newPassword !== confirmNewPassword) {
    return new Response("Passwords do not match", { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  // Хэшируем пароль
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updateUser = await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  return NextResponse.json({ message: "Password updated successfully" });
}
