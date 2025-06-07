import { getSkipSizeData } from "@/service/skip-size-service";
import { SkipDataArray } from "@/types/skip";
import { useQuery } from "@tanstack/react-query";

// get all skip size data
export const useSkipSize = () => {
  return useQuery<SkipDataArray>({
    queryKey: ["skip-data"],
    queryFn: getSkipSizeData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
};
