import { cn } from "@/lib/utils";
import { LoginForm } from "@/shared/components/forms/login-form";
import React from "react";

interface Props {
  className?: string;
}

const LoginPage: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex flex-col pb-10", className)}>
      {/* img block */}
      <div className="relative ">
        <img src="/login.png" />
        <h1 className="uppercase text-secondary text-[60px] font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none">
          Авторизація
        </h1>
      </div>

      <div className="flex mt-10 px-4">
        {/* text block left */}
        <div className="flex flex-col gap-4 w-1/2 ">
          <h2 className="uppercase font-bold text-3xl">
            Ви автоматично отримуєте:
          </h2>
          <ul className="mt-4 text-md text-gray-600 flex flex-col gap-4">
            <li>- нарахування бонусів за кожну покупку.</li>
            <li>- спеціальні пропозиції для зареєстрованих користувачів..</li>
            <li>- сповіщення про нові колекції.</li>
            <li>- супровід персонального менеджера.</li>
          </ul>
        </div>
        {/* form */}
        <div className="flex flex-col gap-4 w-1/2 ">
          <h2 className="mx-auto text-4xl font-bold">Увійти</h2>
          <span className="mx-auto text-gray-600 text-md">
            Увійти за допомогою Email адреси:
          </span>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
