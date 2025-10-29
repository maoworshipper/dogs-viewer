import { useQuery } from "@tanstack/react-query";
import { fetchDogImages } from "../services/api";
import { IDogImages } from "../types/dataTypes";

export const useDogImage = (breed: string | null) => {
  return useQuery<
    IDogImages,
    Error,
    string | null,
    readonly ["dogImages", string | null]
  >({
    queryKey: ["dogImages", breed],
    queryFn: () => fetchDogImages(breed!),
    enabled: !!breed,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (data: IDogImages) => data.message[0] || null,
  });
};
