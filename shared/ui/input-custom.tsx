import { cn } from "@/lib/utils";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
interface Props {
  className?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  labelName?: string;
  isPhone?: boolean;
  isCheckout?: boolean;
  onChange?: (value: string) => void; // ← тут меняем на string
}

export const InputCustom: React.FC<Props> = ({
  isPhone = false,
  className,
  isCheckout = false,
  ...props
}) => {
  return (
    <label
      className={cn("w-1/2 max-lg:w-full ", isCheckout && "w-full")}
      title={props.labelName}
    >
      <p className="mb-2 text-lg text-gray-500 max-lg:text-sm">
        {props.labelName}
      </p>

      {!isPhone ? (
        <input
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          className={cn(
            "px-4 focus:outline-none border-1 py-3 w-full",
            isCheckout && "max-lg:py-[10px]",
            className
          )}
          onChange={(e) => props.onChange?.(e.target.value)} // ← теперь string
        />
      ) : (
        <PhoneInput
          country={"ua"}
          specialLabel=""
          countryCodeEditable={false}
            disableDropdown={true}  
          value={props.value}
          onChange={(val) => props.onChange?.("+" + val)} // ← всегда с "+"
          onlyCountries={["ua"]}
          masks={{ ua: "(..) ...-..-.." }}
          inputStyle={{ width: "100%" }}
          inputClass={cn(
            "px-4 focus:outline-none border-1 py-6 w-full",
            isCheckout && "max-lg:py-[20px]",
            className
          )}
        />
      )}
    </label>
  );
};
