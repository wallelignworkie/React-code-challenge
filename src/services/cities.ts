import axios from "axios";

// API call to create a new city
export const CreateCities = async (data: { name: string }): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token"); // Retrieve token from localStorage

    const response = await axios.post(
      "https://tamagn-express-api.onrender.com/api/v1/cities/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      }
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
export const getCities = async (): Promise<{ id: number; name: string }[]> => {
  const token = localStorage.getItem("access_token"); // Retrieve token from localStorage

  try {
    const response = await axios.get(
      "https://tamagn-express-api.onrender.com/api/v1/cities/find-all",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      }
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
