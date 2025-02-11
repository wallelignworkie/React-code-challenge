import { create } from "zustand";
import { FormInputs } from "@/types/package";

interface PackageState {
  formData: Partial<FormInputs>;
  setFormData: (data: Partial<FormInputs>) => void;
  resetForm: () => void;
}
interface PackageState {
  currentStep: number;
  setStep: (step: number) => void;
}

export const usePackageStore = create<PackageState>((set) => ({
  formData: {},
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () => set({ formData: {} }),
  currentStep: 1,
  setStep: (step) => set({ currentStep: step }),
}));
