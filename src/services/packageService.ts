import axios from "axios";
import { getHeaders } from "./accessToken";
import { PackageRequest, PackageResponse } from "@/types/package";

const baseURL = import.meta.env.VITE_API_BASE_URL;
export const CreatePackage = async (
  data: PackageRequest
): Promise<PackageResponse> => {
  try {
    const response = await axios.post(
      `${baseURL}package/create`,
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
export const getPackages = async (page: number, pageSize: number) => {
  try {
    const response = await axios.get(
      `${baseURL}package/find-all?page=${page}&size=${pageSize}`,
      getHeaders()
    );
    return response.data; // { data: Package[], meta: { totalPages, currentPage } }
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

// package/delete/${id}
export const DeletePackage = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(
      `${baseURL}package/delete/${id}`,
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error deleting package:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to delete package"
    );
  }
};

// package/deliver/94656121245
export const deliverPackage = async (trackingNumber: string): Promise<void> => {
  try {
    const response = await axios.post(
      `${baseURL}package/deliver/${trackingNumber}`,
      {},
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error deliver package",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to deliver package"
    );
  }
};
