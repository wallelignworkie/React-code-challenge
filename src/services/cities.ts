import axios from "axios";
import { getHeaders } from "./accessToken";

const baseURL = import.meta.env.VITE_API_BASE_URL;
// API call to create a new city
export const CreateCities = async (data: { name: string }): Promise<any> => {
  try {
    const response = await axios.post(
      `${baseURL}cities/create`,
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
    const response = await axios.get(`${baseURL}cities/find-all`, getHeaders());

    return response.data; // Return the API response data
  } catch (error: any) {
    console.error(
      "Error fetching cities:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch cities"); // Throw a more user-friendly error
  }
};

// cities/find-one/mekele
export const FindOneCity = async (id: string): Promise<void> => {
  try {
    const response = await axios.get(
      `${baseURL} cities/find-one/${id}}`,
      getHeaders()
    );

    return response.data; // Return the API response data
  } catch (error: any) {
    console.error(
      "Error find one city:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to find one city"); // Throw a more user-friendly error
  }
};
// cities/update/adama
export const UpdateCity = async (id: string, name: string): Promise<void> => {
  try {
    const response = await axios.patch(
      `${baseURL}cities/update/${id}`,
      { name }, // Pass the updated data
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating city:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to update city");
  }
};

// cities/delete/mekele
export const DeleteCity = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(
      `${baseURL}cities/delete/${id}`,
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error deleting city:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to delete city");
  }
};
