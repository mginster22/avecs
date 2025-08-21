"use client";
import { Button } from "@/shared/ui/button";
import { InputCustom } from "@/shared/ui/input-custom";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  className?: string;
}

export const LoginForm: React.FC<Props> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false, // отключаем автоматический редирект
      email,
      password,
    });

    if (res?.error) {
      setError("Неверный email или пароль"); // выводим удобное сообщение
      return;
    }

    router.push("/"); // успешный логин → редирект на /
  };
  return (
    <div className="flex flex-col gap-4 w-1/2 max-lg:w-full">
      <h2 className="mx-auto text-4xl font-bold max-lg:text-2xl">Увійти</h2>
      <span className="mx-auto text-gray-600 text-md max-lg:text-sm">
        Увійти за допомогою Email адреси:
      </span>
      <form
        className="flex flex-col gap-4 justify-center items-center max-lg:items-start"
        onSubmit={handleSubmit}
      >
        <InputCustom
          labelName="E-Mail адреса"
          type="email"
          placeholder="E-Mail адреса"
          value={email}
          onChange={(value) => setEmail(value)}
        />
        <InputCustom
          labelName="Пароль"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(value) => setPassword(value)}
        />
        <Button
          variant={"red"}
          size={"red"}
          className="w-1/2 max-lg:w-full max-lg:h-10"
          type="submit"
        >
          Увійти
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <Link href="/auth/signup" className="mx-auto">
        <span className="max-lg:text-sm">
          Немає облікового запису?
          <span className="text-chart-1"> Реєстрація</span>
        </span>
      </Link>
    </div>
  );
};
