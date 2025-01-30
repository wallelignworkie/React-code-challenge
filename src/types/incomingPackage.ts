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
  deletedAt: string | null;
  createdById: string;
  currentHandlerId: string;
  fromCityId: string;
  toCityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Shipment {
  id: string;
  packageId: string;
  fromCityId: string;
  toCityId: string;
  fromUserId: string;
  toUserId: string;
  shipmentInfromation: string;
  arrivalTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  package: Package;
}

export type ShipmentsResponse = Shipment[];
