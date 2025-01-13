import axios from "axios";

interface LoginCredentials {
  email: string;
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
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    "https://tamagn-express-api.onrender.com/api/v1/auth/signin",
    credentials
  );
  return response.data;
};
