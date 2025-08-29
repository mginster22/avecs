"use client";
import { CheckoutForm } from "@/shared/forms/checkout/checkout-form";

import { ChevronRight, House } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

const CheckoutPage: React.FC<Props> = ({ className }) => {
  return (
    <div className="pb-10">
      <nav className="mb-4 mt-4 text-sm text-gray-600 px-4 flex items-center gap-1 max-lg:mb-0">
        <Link href="/">
          <House size={16} />
        </Link>
        <ChevronRight size={16} />
        <Link href="" className="hover:underline">
          Оформлення замовлення
        </Link>
      </nav>
      <CheckoutForm className="px-4" />
    </div>
  );
};

export default CheckoutPage;
