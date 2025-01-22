import axios from "axios";
import { getHeaders } from "./accessToken";
import { PackageRequest, PackageResponse, Package } from "@/types/package";

export const CreatePackage = async (
  data: PackageRequest
): Promise<PackageResponse> => {
  try {
    const response = await axios.post(
      "https://tamagn-express-api.onrender.com/api/v1/package/create",
      data,
      getHeaders()
    );
    console.log({ response });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating package:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to create package"
    );
  }
};

// Get all packages
export const getPackages = async (): Promise<Package[]> => {
  try {
    const response = await axios.get(
      "https://tamagn-express-api.onrender.com/api/v1/package/find-all",
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching packages:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch packages"
    );
  }
};
