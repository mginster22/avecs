import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  labelName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputCustom: React.FC<Props> = ({ className, ...props }) => {
  return (
    <label className={cn("w-1/2")} title={props.labelName}>
      <p className="mb-2 text-lg text-gray-500">{props.labelName}</p>
      <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        className={cn("px-4 focus:outline-none border-1 py-3 w-full", className)}
        onChange={props.onChange}
      />
    </label>
  );
};
