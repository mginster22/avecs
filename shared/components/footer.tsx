import { cn } from "@/lib/utils";
import React from "react";


interface Props {
    className?: string;
  }
  
 export const Footer: React.FC<Props> = ({ className }) => {
      return ( 
          <div className={cn("bg-primary p-4 flex justify-between items-center")}>
            {/* left */}
              {/* <div className="flex flex-col gap-4">
                <img src="/logo-footer.svg" alt="logo" className="w-50"/>
                <div className="flex gap-4 items-center">
                    <img src="/liqpay.svg" className="w-6"/>
                    <img src="/mr.svg" className="w-6"/>
                    <img src="/pay.svg" className="w-6"/>
                    <img src="/pp.svg" className="w-6"/>
                    <img src="/rozetka.svg" className="w-6"/>
                    <img/>
                </div>
              </div> */}

              {/* middle */}

          </div>
      );
  };



  