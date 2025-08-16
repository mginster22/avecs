import { create } from "zustand";

interface AddToCartMessage {
  title?: string;
  color?: string;
  size?: string;
}

interface CartStore {
  isOpen: boolean;
  isAddToCart: boolean;
  addToCartMessage: AddToCartMessage | null;
  toggleCart: () => void;
  toggleIsAddToCart: () => void;
  showAddToCart: (msg: AddToCartMessage) => void;
}

const useCartStore = create<CartStore>((set) => ({
  isOpen: false,
  isAddToCart: false,
  addToCartMessage: null,

  toggleIsAddToCart: () =>
    set((state) => ({ isAddToCart: !state.isAddToCart })),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  showAddToCart: (msg) => {
    set({ addToCartMessage: msg });
    set({ isAddToCart: true });

    setTimeout(() => {
      set({ isAddToCart: false, addToCartMessage: null });
    }, 2500);
  },
}));

export default useCartStore;
