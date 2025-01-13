import { create } from "zustand";

interface UserState {
  role: string | null; // Role can be "admin", "agent", "user", or null
  setRole: (role: string | null) => void; // Function to set the role
  clearRole: () => void; // Function to clear the role (log out)
}

const useUserStore = create<UserState>((set) => ({
  role: localStorage.getItem("userRole"), // Load role from localStorage
  setRole: (role) => {
    if (role) localStorage.setItem("userRole", role);
    set({ role });
  },
  clearRole: () => {
    localStorage.removeItem("userRole");
    set({ role: null });
  },
}));

export default useUserStore;
