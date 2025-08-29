
export interface ProductSize {
  id: string;
  size: string; // например "S"
  quantity: number; // сколько штук осталось
}
export interface Product {
  id: string;
  category: string;
  categorySlug: string;
  title: string;
  gender: string;
  model: string;
  slug: string;
  description: string;
  composition: string[];
  peculiarities: string[];
  price: number;
  season: string;
  sizes?: ProductSize[];
  color: string;
  colorLabel: string;
  img: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  cartId: string;
  product: Product;
  size: string;
  createdAt: string;
  updatedAt: string;
}
export interface Cart {
  id: string; // уникальный идентификатор корзины
  items: CartItem[]; // массив товаров в корзине
  userId?: string | null; // id зарегистрированного пользователя (если корзина авторизованного)
  guestId?: string | null; // уникальный id для гостя (например, cookie)
  createdAt: Date; // дата создания корзины
  updatedAt: Date; // дата последнего обновления корзины
}

export interface CartWithItems {
  id: string;
  userId: string | null;
  guestId: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: {
    id: string;
    quantity: number;
    size: string;
    product: {
      id: string;
      title: string;
      price: number;
      img: string[];
      // остальные поля продукта
    };
  }[];
}
export interface FavoriteItem{
  id:string;
  productId:string
  userId:string
  product:Product
}
export interface OrderItems{
  id:string;
  orderId:string;
  price:number;
  quantity:number;
  size:string;
  productId:string;
  product:Product;
  createdAt:Date;
  updatedAt:Date  
}