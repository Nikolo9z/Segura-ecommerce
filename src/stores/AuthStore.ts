import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem("auth-storage");
      },
      isLoggedIn: () => !!get().user,
    }),
    {
      name: "auth-storage",
    }
  )
);
