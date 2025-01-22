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
}

export const signIn = async (
  credentials: LoginCredentials,
  setLoading: (isLoading: boolean) => void
): Promise<LoginResponse> => {
  try {
    setLoading(true);
    const response = await axios.post<LoginResponse>(
      "https://tamagn-express-api.onrender.com/api/v1/auth/signin",
      credentials
    );
    setLoading(false);

    return response.data;
  } catch (error: any) {
    setLoading(false);
    console.error(" Error!!", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to Login");
  }
};
