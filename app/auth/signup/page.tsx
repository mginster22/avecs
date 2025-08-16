"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

const SignUp: React.FC<Props> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const router = useRouter();
  const handlersubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/signup", {
      email,
      password,
      firstName,
      lastName,
    });
    router.push("/auth/signin");
  };
  return (
    <div className={className}>
      <h1>Регистрация</h1>

      <form onSubmit={handlersubmit}>
        <input
          className=" border-2 p-4 bg-amber-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className=" border-2 p-4 bg-amber-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          className=" border-2 p-4 bg-amber-400"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="firstName"
        />
        <input
          className=" border-2 p-4 bg-amber-400"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="lastName"
        />
        <button className=" border-2 p-4 bg-amber-400" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default SignUp;
