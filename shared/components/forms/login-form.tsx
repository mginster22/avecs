"use client";
import { Button } from "@/shared/ui/button";
import { InputCustom } from "@/shared/ui/input-custom";
import { signIn } from "next-auth/react";
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
    <form
      className="flex flex-col gap-4 justify-center items-center"
      onSubmit={handleSubmit}
    >
      <InputCustom
        labelName="E-Mail адреса"
        type="email"
        placeholder="E-Mail адреса"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputCustom
        labelName="Пароль"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant={"red"} size={"red"} className="w-1/2" type="submit">
        Увійти
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};
