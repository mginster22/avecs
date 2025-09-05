import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  className?: string;
  img?: string;
  title?: string;
  link?: string;
  isClassName?: boolean;
  isBlog?: boolean;
  description?: string;
}

export const InfoCartBlock: React.FC<Props> = ({
  className,
  img,
  title,
  link,
  isClassName,
  isBlog = false,
  description,
}) => {
  return (
    <div className={cn("flex flex-col gap-4 items-start",isBlog && "gap-2", className)}>
      {link && (
        <Link
          href={link}
          className={cn("overflow-hidden ", isClassName && "cursor-pointer")}
        >
          <img
            src={img}
            alt={title}
            className={cn(
              "transition-transform duration-300 ease-in-out",
              isClassName && "hover:scale-120 "
            )}
          />
        </Link>
      )}
      <p className={cn("font-bold",isBlog && "text-2xl", isClassName && "text-5xl ")}>{title}</p>
      {isBlog && description && <p className="text-gray-500 text-sm">{description}</p>}
      {link && isBlog === false && (
        <Link href={link}>
          <Button variant="red" size="red">
            ПЕРЕЙТИ
          </Button>
        </Link>
      )}
    </div>
  );
};
