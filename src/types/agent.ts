export interface AgentRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  cityId?: string; // Optional, depending on your API
  gender?: string;
  age?: string;
  handlesUrgent: boolean;
  address: string;
}

export interface AgentData {
  id: string;
  handles_urgent: string;
  address: string;
  userId: string;
  status: string;
  firstName: string;
  createdAt: string;
  updatedAt: string;
  cityId: string;
}

export interface Agent {
  id: string;
  userId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  cityId: string;
  handles_urgent: boolean;
  address: string;
  user: {
    id: string;
    phone: string;
    email: string;
    password: string;
    role: string;
    firstName: string;
    lastName: string;
    gender: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  city: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

export type GetAgentsResponse = Agent[];

export interface FormInputs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  cityId: string;
  address: string;
  gender: string;
  age: string;
  handlesUrgent: boolean;
}
