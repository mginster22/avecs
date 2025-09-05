"use client";
import { Button } from "@/shared/ui/button";
import { InputCustom } from "@/shared/ui/input-custom";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ForgotPasswordForm } from "./forgot-password-form";

interface Props {
  className?: string;
}

export const LoginForm: React.FC<Props> = ({ className }) => {

  const [active, setActive] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { status } = useSession();
  const [disabled, setDisabled] = useState(false);

  const handleLogin = async () => {
    setDisabled(true); // сразу дизейблим кнопку
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      setDisabled(false); // если не залогинился — снова активируем
    }
    if (status === "authenticated") {
      setDisabled(true); // если залогинился — кнопку можно скрыть или оставить disabled
    }
  }, [status]);

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
        <div className="flex justify-start w-1/2">
          <button className="text-sm text-chart-1 hover:underline cursor-pointer " onClick={() => setActive(true)}>
            Забули пароль?
          </button>
        </div>
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
      <button
        onClick={handleLogin}
        disabled={disabled}
        className={`cursor-pointer mx-auto flex items-center  px-4 py-2 rounded hover:underline ${
          disabled ? "bg-gray-400 cursor-not-allowed" : ""
        }`}
      >
        {disabled ? "Подождите..." : "Увійти через Google"}
        <img src="/assets/google.png" alt="google" className="w-12" />
      </button>
      {/* забыли пароль */}

      <Link href="/auth/signup" className="mx-auto">
        <span className="max-lg:text-sm">
          Немає облікового запису?
          <span className="text-chart-1"> Реєстрація</span>
        </span>
      </Link>
      {active && <ForgotPasswordForm setActive={() => setActive(false)} />}
    </div>
  );
};
