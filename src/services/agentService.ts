import axios from "axios";
import { getHeaders } from "./accessToken";
import { Agent, AgentData, AgentRequest, GetAgentsResponse } from "@/types";

// Create an agent
export const CreateAgent = async (data: AgentRequest): Promise<AgentData> => {
  try {
    const response = await axios.post(
      "https://tamagn-express-api.onrender.com/api/v1/agent/create",
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
    const response = await axios.get(
      "https://tamagn-express-api.onrender.com/api/v1/agent/find-all",
      getHeaders()
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching agents:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch agents");
  }
};
