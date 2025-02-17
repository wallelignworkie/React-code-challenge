import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { FormInputs } from "@/types/package";

// Define the Redux state interface
interface PackageState {
  formData: Partial<FormInputs>;
  currentStep: number;
}

// Initial state
const initialState: PackageState = {
  formData: {},
  currentStep: 1,
};

// Create the Redux slice
const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<FormInputs>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetForm: (state) => {
      state.formData = {};
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
  },
});

// ✅ Export actions
export const { setFormData, resetForm, setStep, nextStep, prevStep } =
  packageSlice.actions;

// ✅ Export selectors
export const selectFormData = (state: RootState) => state.package.formData;
export const selectCurrentStep = (state: RootState) =>
  state.package.currentStep;

// ✅ Export reducer
export default packageSlice.reducer;
