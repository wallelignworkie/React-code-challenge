import axios from "axios";
import { getHeaders } from "./accessToken";
import { Customer } from "@/types/customer";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// get customers
export const getCustomers = async (status: string): Promise<Customer> => {
  try {
    const response = await axios.get(
      `${baseURL}customer/find-all?status=${status}`,
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error loading Customer",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch customer"
    );
  }
};
