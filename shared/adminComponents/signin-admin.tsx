"use client";
import React from "react";

interface Props {
  className?: string;
  adminPassword?: string;
  setSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SigninAdmin: React.FC<Props> = ({
  className,
  adminPassword,
  setSuccess,
}) => {
  const [password, setPassword] = React.useState("");
   const [error, setError] = React.useState("");
  const handlerSubmit = () => {
    if (password === adminPassword) {
      setSuccess?.(true);
    } else {
      setError("Неверный пароль");
    }
  };
  return (
    <div className={className}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-1 px-4 py-1"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handlerSubmit}>Подтвердить</button>
    </div>
  );
};
