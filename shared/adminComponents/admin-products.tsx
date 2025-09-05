"use client";

import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductItem } from "../components";
import Link from "next/link";
import { ProductForm } from "./product-create-form";

interface Props {
  className?: string;
}

export const AdminProducts: React.FC<Props> = ({ className }) => {
  const { data: products, isLoading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  if (!products) return null;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={className}>
      <Link href="/admin">Admin panel</Link>

      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 p-4">
        {products.map((product) => (
          <div key={product.id} className="border p-2 rounded flex flex-col gap-4">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
              onClick={() =>{
                  setSelectedProduct(product)
                  console.log(selectedProduct)
              }}
            >
              Изменить
            </button>
            <ProductItem key={product.slug} product={product} />
          </div>
        ))}
      </div>

      {/* Модалка */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-3xl relative overflow-y-auto max-h-180">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4 p-4">
                Редактирование товара
              </h2>
              <button className="" onClick={() => setSelectedProduct(null)}>
                ✕
              </button>
            </div>
            <ProductForm
              initialData={selectedProduct}
              onSuccess={() => setSelectedProduct(null)} // закрыть после сохранения
            />
          </div>
        </div>
      )}
    </div>
  );
};
