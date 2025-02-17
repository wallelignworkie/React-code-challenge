import axios from "axios";
// import { baseUrl } from "./url";
interface LoginCredentials {
  phone: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  data: {
    id: string;
    email: string;
    role: string;
    firstName: string;
  };
  role: string;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;
export const signIn = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${baseURL}auth/signin`,
      credentials
    );

    return response.data;
  } catch (error: any) {
    console.error(" Error!!", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to Login");
  }
};
