import axios from "axios";
import { getHeaders } from "./accessToken";
import {
  Package,
  PackageData,
  PackageRequest,
  PackageResponse,
} from "@/types/package";

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

// package/find-one/cm5tv68uk0000ls5wfg245m0q
export const PackageDetail = async (id: string): Promise<Package> => {
  try {
    const response = await axios.get<Package>(
      `${baseURL}package/find-one/${id}`,
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error finding package",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to find one package"
    );
  }
};

export const UpdatePackage = async (
  id: string,
  data: PackageRequest
): Promise<PackageData> => {
  if (!id) throw new Error("package userId is required");
  if (!data) throw new Error("package data is required");

  try {
    const response = await axios.patch(
      `${baseURL}package/update/${id}`,
      data,
      getHeaders()
    );
    console.log({ data });
    return response.data;
  } catch (error: any) {
    console.error("Error updating package:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to update package"
    );
  }
};
