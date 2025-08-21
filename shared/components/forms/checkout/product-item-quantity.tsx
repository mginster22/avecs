"use client";
import React from "react";

const ProductItemQuantity: React.FC<{
  productId: string;
  cartItemId: string;
  quantity: number;
  size?: string;
  addToCart: any; // твой хук useAddToCart
  decrementCartItem: any; // твой хук useDecrementCartItem
}> = ({
  productId,
  cartItemId,
  quantity,
  size,
  addToCart,
  decrementCartItem,
}) => {
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleIncrement = () => {
    if (isUpdating) return;

    setIsUpdating(true);
    addToCart.mutate(
      { productId, size },
      {
        onSettled: () => setIsUpdating(false),
      }
    );
  };

  const handleDecrement = () => {
    if (isUpdating || quantity === 1) return;

    setIsUpdating(true);
    decrementCartItem.mutate(cartItemId, {
      onSettled: () => setIsUpdating(false),
    });
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className="bg-gray-950 text-white px-2 py-[2px] disabled:opacity-50"
        onClick={handleDecrement}
        disabled={quantity === 1 || isUpdating}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className="bg-gray-950 text-white px-2 py-[2px] disabled:opacity-50"
        onClick={handleIncrement}
        disabled={isUpdating}
      >
        +
      </button>
    </div>
  );
};

export default ProductItemQuantity;
