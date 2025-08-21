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
      <div className="relative flex justify-center">
        <img src={image} alt="image" className="object-cover max-lg:h-[300px] object-[80%] "/>
        <p className="absolute top-30 text-center text-white font-bold text-[59px] w-[90%] 
        max-lg:text-[40px] max-lg:top-20
        ">
          {text}
        </p>
      </div>
  );
};
