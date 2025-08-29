"use client"
import { ProductItem } from "@/shared/components";
import { FavoriteItem } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default  function FavoritesPage() {

  
  const {data:favoritesProduct} = useQuery({
    queryKey:["favorite"],
    queryFn: async () => {
      const {data:product} = await axios.get<FavoriteItem[]>("/api/favorite");
      return product;
    }
    
  })
if(!favoritesProduct){
  return null
}
  const favoriteProduct = favoritesProduct.map((favorite) => favorite.product);
  console.log(favoritesProduct)

  return <div className="grid grid-cols-4 gap-4 px-4">
    {favoriteProduct.map((product) => (
      <ProductItem key={product.slug} product={product}/>
    ))}
  </div>;
}
