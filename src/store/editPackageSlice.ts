import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { Package } from "@/types/package";

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

interface EditPackageState {
  packageData: Package;
}

const initialState: EditPackageState = {
  packageData: defaultPackageData,
};

const editPackageSlice = createSlice({
  name: "editPackage",
  initialState,
  reducers: {
    setPackageData: (state, action: PayloadAction<Package>) => {
      state.packageData = action.payload;
    },
    resetPackageData: (state) => {
      state.packageData = defaultPackageData;
    },
  },
});

// ✅ Export actions
export const { setPackageData, resetPackageData } = editPackageSlice.actions;

// ✅ Export selectors
export const selectPackageData = (state: RootState) =>
  state.editPackage.packageData;

// ✅ Export reducer
export default editPackageSlice.reducer;
