import { Package } from "@/types/package";
import { create } from "zustand";

interface PackageStore {
  packageData: Package;
  setPackageData: (data: Package) => void;
}

const defaultPackageData: Package = {
  id: "",
  trackingNumber: "",
  packageName: "",
  senderFirstName: "",
  senderLastName: "",
  senderPhoneNumber: "",
  senderAddress: "",
  receiverFirstName: "",
  receiverLastName: "",
  receiverPhoneNumber: "",
  receiverAddress: "",
  price: 0,
  length: 0,
  width: 0,
  height: 0,
  weight: 0,
  priority: "",
  status: "",
  description: null,
  specialInstructionId: null,
  createdAt: "",
  updatedAt: "",
  deletedAt: null,
  createdById: "",
  agentId: null,
  fromCityId: "",
  toCityId: "",
  createdBy: {
    id: "",
    phone: "",
    email: "",
    password: "",
    role: "",
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
  },
  from: {
    id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
  },
  to: {
    id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
  },
  agent: null,
};

export const useEditPackageStore = create<PackageStore>((set) => ({
  packageData: defaultPackageData, // ✅ Set default values
  setPackageData: (data) => set({ packageData: data }),
}));
