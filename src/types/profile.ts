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
export interface ValidateFormInputs extends FormInputs {
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
  confirmPassword: string;
}

interface Agent {
  id: string;
  userId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  cityId: string;
  handles_urgent: boolean;
  address: string;
}

export interface MyProfile {
  id: string;
  phone: string;
  email: string;
  password: string;
  role: "AGENT" | "USER" | "ADMIN";
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  address: string;
  avatartUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  agent?: Agent;
}
