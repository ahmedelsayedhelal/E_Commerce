import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/app/components/types/product";

type CartItem = Product & {
  quantity: number;
};

type ShopState = {
  cart: CartItem[];
  wishlist: string[];

 
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  clearwishlist : ()=>void;

 
  toggleWishlist: (id: string) => void;
};

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],


      addToCart: (product) => {
        const cart = get().cart;
        const existing = cart.find((item) => item.id === product.id);

        if (existing) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1 }],
          });
        }
      },

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id, qty) => {
        if (qty < 1) return;
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity: qty } : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      clearwishlist: ()=> set({wishlist:[]}),

      toggleWishlist: (id) => {
        const wishlist = get().wishlist;
        set({
          wishlist: wishlist.includes(id)
            ? wishlist.filter((pid) => pid !== id)
            : [...wishlist, id],
        });
      },
    }),
    {
      name: "shop-storage", 
    }
  )
);
