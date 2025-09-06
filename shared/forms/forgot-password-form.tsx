"use client";
import { cn } from "@/lib/utils";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

interface Props {
  className?: string;
  active?: boolean;
  setActive?: () => void;
  isPage?: boolean;
}

export const ForgotPasswordForm: React.FC<Props> = ({
  className,
  setActive,
  isPage = false,
}) => {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    await axios.patch(`/api/auth/forgot-password`, data);
    alert("Пароль змінено!");
    reset();
  };
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center",
        isPage && "relative bg-transparent h-auto w-auto top-0 left-0",
        className
      )}
      onClick={setActive}
    >
      <div
        className={cn(
          "fixed top-40  h-140 w-140 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-out flex flex-col max-lg:w-90 max-lg:h-100 max-lg:top-60",isPage && "relative top-10 h-100 z-50 max-lg:top-2 max-lg:h-80"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-4 w-full h-full"
        >
          <h2>Форма для зміни пароля</h2>

          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300  w-3/4"
          />
          <input
            {...register("newPassword")}
            type="password"
            placeholder="Новий пароль"
            className="p-2 border border-gray-300  w-3/4"
          />
          <input
            {...register("confirmNewPassword")}
            type="password"
            placeholder="Підтвердити новий пароль"
            className="p-2 border border-gray-300  w-3/4"
          />
          <Button
            variant={"red"}
            size={"red"}
            type="submit"
            className="  w-3/4"
          >
            Змінити пароль
          </Button>
        </form>
      </div>
    </div>
  );
};
