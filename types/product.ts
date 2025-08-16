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
  sizes: string[];
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
  product: Product;
  size: string;
}
export interface Cart {
  id: string;            // уникальный идентификатор корзины
  items: CartItem[];     // массив товаров в корзине
  userId?: string | null; // id зарегистрированного пользователя (если корзина авторизованного)
  guestId?: string | null; // уникальный id для гостя (например, cookie)
  createdAt: Date;       // дата создания корзины
  updatedAt: Date;       // дата последнего обновления корзины
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
    product: {
      id: string;
      title: string;
      price: number;
      img: string[];
      // остальные поля продукта
    };
  }[];
}