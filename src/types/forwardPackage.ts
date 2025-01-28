export interface forwardPackageRequest {
  trackingNumber: string;
  destinationAgentId: string;
  shipmentInformation: string;
  arrivalTime: string;
}

export interface ForwardPackageData {
  status: boolean;
  data: {
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
  };
}
