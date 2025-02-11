import axios from "axios";
import { getHeaders } from "./accessToken";
import { Agent, AgentData, AgentRequest } from "@/types/agent";

const baseURL = import.meta.env.VITE_API_BASE_URL;
// Create an agent
export const CreateAgent = async (data: AgentRequest): Promise<AgentData> => {
  try {
    const response = await axios.post(
      `${baseURL}agent/create`,
      data,
      getHeaders()
    );

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
      "Error updating agents:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch agents");
  }
};

export const getAgent = async (id: string): Promise<Agent> => {
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

// Fetch agent details by ID
export const getAgentById = async (id: string): Promise<Agent> => {
  if (!id) throw new Error("Agent ID is required");

  try {
    const response = await axios.get(
      `${baseURL}agent/find-one/${id}`,
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching agent:", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch agent");
  }
};

export const UpdateAgent = async (
  userId: string,
  data: AgentRequest
): Promise<AgentData> => {
  if (!userId) throw new Error("Agent userId is required");
  if (!data) throw new Error("Agent data is required");

  try {
    const response = await axios.patch(
      `${baseURL}agent/update/${userId}`,
      data,
      getHeaders()
    );
    console.log({ data });
    return response.data;
  } catch (error: any) {
    console.error("Error updating agent:", error);
    throw new Error(error?.response?.data?.message || "Failed to update agent");
  }
};

// agent/find-by-city/dire_dawa
export const getAgentsByCity = async (cityId: string): Promise<Agent[]> => {
  try {
    if (!cityId) return Promise.resolve([]);
    const response = await axios.get(
      `${baseURL}agent/find-by-city/${cityId}`,
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
