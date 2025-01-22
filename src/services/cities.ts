import axios from "axios";
import { getHeaders } from "./accessToken";

// API call to create a new city
export const CreateCities = async (data: { name: string }): Promise<any> => {
  try {
    const response = await axios.post(
      "https://tamagn-express-api.onrender.com/api/v1/cities/create",
      data,
      getHeaders()
    );

    return response.data; // Return the API response data
  } catch (error: any) {
    console.error(
      "Error creating city:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to create city"); // Throw a more user-friendly error
  }
};

// API call to get all cities
export const getCities = async (): Promise<{ id: string; name: string }[]> => {
  try {
    const response = await axios.get(
      "https://tamagn-express-api.onrender.com/api/v1/cities/find-all",
      getHeaders()
    );

    return response.data; // Return the API response data
  } catch (error: any) {
    console.error(
      "Error fetching cities:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch cities"); // Throw a more user-friendly error
  }
};

// API call to get all cities
export const DeleteCity = async (): Promise<{ id: number }[]> => {
  try {
    const response = await axios.get(
      "https://tamagn-express-api.onrender.com/api/v1/cities/find-all",
      getHeaders()
    );

    return response.data; // Return the API response data
  } catch (error: any) {
    console.error(
      "Error fetching cities:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch cities"); // Throw a more user-friendly error
  }
};
