import axios from "axios";
import { getHeaders } from "./accessToken";
import { FormInputs, MyProfile } from "@/types/profile";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Get all agents
export const getMyProfile = async (): Promise<MyProfile> => {
  try {
    const response = await axios.get(
      `${baseURL}profile/get-my-profile`,
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
};

export const updateProfile = async (data: FormInputs): Promise<FormInputs> => {
  try {
    const response = await axios.patch(
      `${baseURL}profile/update`,
      data,
      getHeaders()
    );
    console.log({ response });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error Updating profile:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to Updating profile"
    );
  }
};
