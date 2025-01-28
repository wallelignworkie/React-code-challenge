import axios from "axios";
import { getHeaders } from "./accessToken";
import {
  ForwardPackageData,
  forwardPackageRequest,
} from "@/types/forwardPackage";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// package/forward
export const CreateForwardPackage = async (
  data: forwardPackageRequest & { trackingNumber: string }
): Promise<ForwardPackageData> => {
  console.log("Payload sent to API:", data); // Debugging payload
  try {
    const response = await axios.post(
      `${baseURL}package/forward`,
      data,
      getHeaders()
    );
    console.log("API Response:", response);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error forwarding package:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to forward package"
    );
  }
};
