import { create } from "zustand";

interface UserState {
  role: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setRole: (role: string | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void; // Clear both role and tokens
}

const useUserStore = create<UserState>((set) => ({
  role: localStorage.getItem("userRole"),
  accessToken: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token"),

  setRole: (role) => {
    if (role) localStorage.setItem("userRole", role);
    set({ role });
  },

  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    set({ accessToken, refreshToken });
  },

  clearAuth: () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    set({ role: null, accessToken: null, refreshToken: null });
  },
}));

export default useUserStore;
