import { ProductForm } from "@/shared/adminComponents/product-create-form";
import Link from "next/link";
import React from "react";

const CreateProducPage = () => {
  return (
    <div>
      <div className="pb-10">
        <Link href="/admin" className="text-md text-chart-1 border-1 p-2 ">
          Админ головна
        </Link>
      </div>
      <ProductForm />
    </div>
  );
};

export default CreateProducPage;
