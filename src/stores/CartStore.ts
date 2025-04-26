import { Product } from "@/types/Product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = Product & {
  quantity: number;
};
type CartSore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
  totalCart: () => number;
};

export const useCartStore = create(
  persist<CartSore>(
    (set, get) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
            console.log("Producto actualizado en el carrito:", item);
            console.log("Estado actual del carrito:", updatedCart);
            return { cart: updatedCart };
          } else {
            const newItem = { ...item, quantity: 1 };
            const newCart = [...state.cart, newItem];
            console.log("Nuevo producto añadido al carrito:", newItem);
            console.log("Estado actual del carrito:", newCart);
            return { cart: newCart };
          }
        }),
      removeFromCart: (item) =>
        set((state) => ({
          cart: state.cart.reduce((acc: CartItem[], cartItem) => {
            if (cartItem.id === item.id) {
              if (cartItem.quantity > 1) {
                acc.push({ ...cartItem, quantity: cartItem.quantity - 1 });
              }
            } else {
              acc.push(cartItem);
            }
            return acc;
          }, []),
        })),
      removeItem: (item) =>
        set((state) => ({
          cart: state.cart.filter((cartItem) => cartItem.id !== item.id),
        })),
      clearCart: () => set({ cart: [] }),
      totalCart: () => {
        const state = get().cart;
        const total = state.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        return total > 0 ? total : 0;
      },
    }),
    {
      name: "cart-storage", // Nombre para identificar en localStorage
      skipHydration: false, // No omitir la hidratación del estado
    }
  )
);
