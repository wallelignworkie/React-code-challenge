import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store"; // Import RootState for selector

const initialState = {
  currentStep: 1,
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < 5) state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
  },
});

// ✅ Export actions
export const { nextStep, prevStep } = packageSlice.actions;

// ✅ Export selector
export const selectCurrentStep = (state: RootState) =>
  state.package.currentStep;

// ✅ Export reducer
export default packageSlice.reducer;
