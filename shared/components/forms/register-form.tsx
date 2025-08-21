"use client";
import { Button } from "@/shared/ui/button";
import { InputCustom } from "@/shared/ui/input-custom";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


interface Props {
  className?: string;
}

export const RegisterForm: React.FC<Props> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handlersubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/signup", {
      email,
      password,
      firstName,
      lastName,
      phone,
    });
    router.push("/auth/signin");
  };
  return (
    <div className="flex flex-col gap-4 w-1/2 max-lg:w-full">
      <h2 className="mx-auto text-4xl font-bold max-lg:text-2xl">Реєстрація</h2>
      <span className="mx-auto text-gray-600 text-md max-lg:text-sm">
        Створiть облiковий запис за хвилину
      </span>
      <form
        className="flex flex-col gap-4 justify-center items-center"
        onSubmit={handlersubmit}
      >
        <InputCustom
          labelName="Ім'я"
          type="text"
          placeholder="Ім'я"
          value={firstName}
          onChange={(val) => setFirstName(val)} // <-- string
        />
        <InputCustom
          labelName="Прізвище"
          type="text"
          placeholder="Прізвище"
          value={lastName}
          onChange={(val) => setLastName(val)}
        />
        <InputCustom
          labelName="E-Mail адреса"
          type="email"
          placeholder="E-Mail адреса"
          value={email}
          onChange={(val) => setEmail(val)}
        />
        <InputCustom
          labelName="Пароль"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(val) => setPassword(val)}
        />
        <InputCustom
          labelName="Телефон"
          isPhone
          value={phone}
          onChange={(val) => setPhone(val)}
        />

        <Button
          variant={"red"}
          size={"red"}
          className="w-1/2 max-lg:w-full max-lg:h-12"
          type="submit"
        >
          Регистрация
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};
