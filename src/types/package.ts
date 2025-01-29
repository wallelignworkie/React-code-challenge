// types.ts

export interface PackageRequest {
  packageName: string;
  width: number;
  height: number;
  weight: number;
  length: number;
  priority: string;
  from: string; // City ID or name for the origin
  to: string; // City ID or name for the destination
  senderFirstName: string;
  senderLastName: string;
  senderPhoneNumber: string;
  senderAddress: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverPhoneNumber: string;
  receiverAddress?: string; // Optional if not included
  price: number;
  paymentType: string; // Payment method, e.g., "UPFRONT"
}

export interface PackageResponse {
  success: boolean;
  data: PackageData;
}

export interface PackageData {
  id: string;
  trackingNumber: string;
  packageName: string;
  senderFirstName: string;
  senderLastName: string;
  senderPhoneNumber: string;
  senderAddress: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverPhoneNumber: string;
  receiverAddress: string;
  price: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  priority: string;
  status: string;
  description: string | null;
  specialInstructionId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdById: string;
  agentId: string | null;
  fromCityId: string;
  toCityId: string;
}

export interface Package {
  id: string;
  trackingNumber: string;
  packageName: string;
  senderFirstName: string;
  senderLastName: string;
  senderPhoneNumber: string;
  senderAddress: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverPhoneNumber: string;
  receiverAddress: string;
  price: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  priority: string;
  status: string;
  description: string | null;
  specialInstructionId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdById: string;
  agentId: string | null;
  fromCityId: string;
  toCityId: string;
  createdBy: {
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
  from: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  to: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  agent: any | null; // Define more explicitly if needed
}

export interface PaginationMeta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export interface GetPackagesResponse {
  data: Package[];
  meta: PaginationMeta;
}

export interface FormInputs {
  packageName: string;
  width: number;
  height: number;
  weight: number;
  length: number;
  priority: string;
  from: string;
  to: string;
  senderFirstName: string;
  senderLastName: string;
  senderPhoneNumber: string;
  senderAddress: string;

  receiverFirstName: string;
  receiverLastName: string;
  receiverPhoneNumber: string;
  receiverAddress: string;

  price: number;
  paymentType: string;
}
