import { getFormattedData } from "../utils/common";
import {
  IDataResponse,
  IPokemonDetail,
  IAbilityDetails,
} from "../types/dataTypes";

const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch from ${url}: ${error.message}`);
    }
    throw new Error(`Error fetching from ${url}`);
  }
}

export const fetchAllItems = async (
  limit: number = 1400
): Promise<IDataResponse> => {
  const data = await fetchData<IDataResponse>(
    `${BASE_URL}/pokemon?limit=${limit}&offset=0`
  );

  return getFormattedData(data);
};

export const fetchItemDetails = async (
  url: string
): Promise<IPokemonDetail> => {
  return fetchData<IPokemonDetail>(url);
};

export const fetchAbilityDetails = async (
  url: string
): Promise<IAbilityDetails> => {
  return fetchData<IAbilityDetails>(url);
};
