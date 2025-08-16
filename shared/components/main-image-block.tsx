import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  image?: string;
  text?: string;
}

export const MainImageBlock: React.FC<Props> = ({
  image = "/account.jpg",
  text,
  className,
}) => {
  return (
    <div className={cn("", className)}>
      <div className="relative flex justify-center">
        <img src={image} alt="image" />
        <p className="absolute top-30 text-center text-white font-bold text-[59px] w-[90%] ">
          {text}
        </p>
      </div>
    </div>
  );
};
