import axios from "axios";
import { getHeaders } from "./accessToken";
import { Agent, AgentData, AgentRequest } from "@/types";

const baseURL = import.meta.env.VITE_API_BASE_URL;
// Create an agent
export const CreateAgent = async (data: AgentRequest): Promise<AgentData> => {
  try {
    const response = await axios.post(
      `${baseURL}agent/create`,
      data,
      getHeaders()
    );
    console.log({ response });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating agent:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to create agent");
  }
};

// Get all agents
export const getAgents = async (): Promise<Agent[]> => {
  try {
    const response = await axios.get(`${baseURL}agent/find-all`, getHeaders());
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching agents:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch agents");
  }
};

export const getAgent = async (id: string): Promise<Agent[]> => {
  try {
    const response = await axios.get(
      `${baseURL}agent/find-one/${id}`,
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching agent:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch agent");
  }
};
