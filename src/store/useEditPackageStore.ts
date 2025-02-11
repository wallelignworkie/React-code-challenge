import { FormInputs } from "@/types/package";
import { create } from "zustand";

interface PackageStore {
  packageData: FormInputs | undefined;
  setPackageData: (data: FormInputs) => void;
}

export const usePackageStore = create<PackageStore>((set) => ({
  packageData: undefined, // Initialize with empty object or default values
  setPackageData: (data) => set({ packageData: data }), // Action to update packageData
}));
