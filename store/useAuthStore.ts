import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  register: (user: User) => void;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      
      register: (user) =>
        set({
          user,
          isAuthenticated: false,
        }),

     
      login: () =>
        set({
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
