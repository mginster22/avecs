import { create } from "zustand";

type AddToFavoriteMessage =
  | {
      title: string;
      model: string;
      action: "added" | "removed";
      error?: undefined;
    } // успех
  | {
      error: string;
      title?: undefined;
      model?: undefined;
      action?: "added" | "removed" | undefined;
    }; // ошибка
interface FavoriteStore {
  isAddToFavorite: boolean;

  addToFavoriteMessage: AddToFavoriteMessage | null;
  showAddToFavorite: (msg: AddToFavoriteMessage) => void;
}

const useFavoriteStore = create<FavoriteStore>((set) => ({
  isAddToFavorite: false,
  addToFavoriteMessage: null,
  showAddToFavorite: (msg) => {
    set({ addToFavoriteMessage: msg });
    set({ isAddToFavorite: true });

    setTimeout(() => {
      set({ isAddToFavorite: false, addToFavoriteMessage: null });
    }, 3500);
  },
}));

export default useFavoriteStore;
