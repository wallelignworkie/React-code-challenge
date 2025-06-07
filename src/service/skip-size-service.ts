import { SkipDataArray } from "@/types/skip";
import { api } from "@/lib/axios";

// src/services/skipService.ts
export const getSkipSizeData = async (): Promise<SkipDataArray> => {
  const response = await api.get(
    "skips/by-location?postcode=NR32&area=Lowestoft"
  );
  return response.data;
};
