import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  title: string;
  img: string;
  children?: React.ReactNode;
  isSignUp?: boolean;
}

export const AuthItemsBlock: React.FC<Props> = ({
  isSignUp,
  title,
  img,
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col pb-10", className)}>
      <div className="relative overflow-hidden">
        <img src={img} className="max-lg:h-60 max-lg:object-cover" />
        <h1
          className={cn(
            "uppercase text-secondary text-[60px] font-bold absolute top-40 left-1/3   select-none  max-lg:text-[40px] max-sm:top-1/3 max-sm:left-10 ",isSignUp && "top-30 left-30 max-lg:text-[20px] max-lg:left-0 max-lg:right-0 "
          )}
        >
          {title}
        </h1>
      </div>

      <div className="flex mt-10 px-4 max-lg:flex-col-reverse">
        {/* text block left */}
        <div className="flex flex-col gap-4 w-1/2 max-lg:w-full max-lg:gap-0">
          <h2 className="uppercase font-bold text-3xl max-lg:text-xl max-lg:mt-4">
            Ви автоматично отримуєте:
          </h2>
          <ul className="mt-4 text-md text-gray-600 flex flex-col gap-4 max-lg:text-sm">
            <li>- нарахування бонусів за кожну покупку.</li>
            <li>- спеціальні пропозиції для зареєстрованих користувачів..</li>
            <li>- сповіщення про нові колекції.</li>
            <li>- супровід персонального менеджера.</li>
            {isSignUp && (
              <li>
                Якщо ви вже зареєстровані, перейдіть на сторінку{" "}
                <Link href="/auth/signin">
                  <span className="text-chart-1">входу в систему.</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
        {/* form */}
        {children}
      </div>
    </div>
  );
};
