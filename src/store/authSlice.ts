import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  firstName: string;
  email: string;
  role: string;
}

interface AuthState {
  role: string | null;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

// Retrieve data from localStorage on page reload
const storedUser = localStorage.getItem("user");
const storedAccessToken = localStorage.getItem("access_token");
const storedRefreshToken = localStorage.getItem("refresh_token");

const initialState: AuthState = {
  role: storedUser ? JSON.parse(storedUser).role : null, // ✅ Get role from stored user
  user: storedUser ? JSON.parse(storedUser) : null,
  accessToken: storedAccessToken || null,
  refreshToken: storedRefreshToken || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.role = user.role; // ✅ Store role correctly
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.loading = false;
      state.error = null;

      // ✅ Save to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.role = null;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
