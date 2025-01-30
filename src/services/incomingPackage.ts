import axios from "axios";
import { getHeaders } from "./accessToken";
import { Shipment } from "@/types/incomingPackage";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// get incoming data
export const getIncomingPackage = async (): Promise<Shipment[]> => {
  try {
    const response = await axios.get(
      `${baseURL}package/find-incoming`,
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching income data:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch income data"
    );
  }
};

export const acceptIncomingPackage = async (
  trackingNumber: string
): Promise<void> => {
  try {
    const response = await axios.post(
      `${baseURL}package/received-incoming/${trackingNumber}`,
      {},
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error accepting package",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to accept package"
    );
  }
};
