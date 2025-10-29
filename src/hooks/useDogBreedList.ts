import { useQuery } from "@tanstack/react-query";
import { fetchAllItems } from "../services/api";
import { IDogBreed } from "../types/dataTypes";

export const useDogBreedList = () => {
  return useQuery<IDogBreed[], Error>({
    queryKey: ["dogBreedList"],
    queryFn: async () => {
      return await fetchAllItems();
    },
    staleTime: Infinity, 
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
