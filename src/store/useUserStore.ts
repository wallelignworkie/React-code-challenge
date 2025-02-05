import { create } from "zustand";

// Define the User type
interface User {
  id: string;
  firstName: string;
  email: string;
  role: string;
}

interface UserState {
  role: string | null;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setRole: (role: string | null) => void;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

const useUserStore = create<UserState>((set) => ({
  role: localStorage.getItem("userRole"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  accessToken: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token"),

  setRole: (role) => {
    if (role) localStorage.setItem("userRole", role);
    else localStorage.removeItem("userRole");
    set({ role });
  },

  setUser: (user) => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
    set({ user });
  },

  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    set({ accessToken, refreshToken });
  },

  clearAuth: () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    set({ role: null, user: null, accessToken: null, refreshToken: null });
  },
}));

export default useUserStore;
