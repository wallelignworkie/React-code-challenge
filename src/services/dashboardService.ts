import axios from "axios";
import { getHeaders } from "./accessToken";

interface CardData {
  packages: number;
  users: number;
  price: number;
}
const baseURL = import.meta.env.VITE_API_BASE_URL;

// Get all agents
export const getAgentOverviewData = async (): Promise<CardData> => {
  try {
    const response = await axios.get(
      `${baseURL}analytics/agent/overview`,
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching overview data:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch overview data"
    );
  }
};

export const getAdminOverviewData = async (): Promise<CardData> => {
  try {
    const response = await axios.get(
      `${baseURL}analytics/admin/overview`,
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching overview data:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch overview data"
    );
  }
};
