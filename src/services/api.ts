import {
  IDataResponse,
  IDogImages,
  IBreedInfo,
  IDogBreed,
} from "../types/dataTypes";

const DOG_API_BASE_URL = "https://dog.ceo/api";
const DOG_BREEDS_API_BASE_URL = "https://api.thedogapi.com/v1";

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

export const fetchAllItems = async (): Promise<IDogBreed[]> => {
  const response = await fetchData<IDataResponse>(
    `${DOG_API_BASE_URL}/breeds/list/all`
  );
  
  const breeds: IDogBreed[] = [];
  for (const [breed, subBreeds] of Object.entries(response.message)) {
    breeds.push({
      name: breed,
      subBreeds: subBreeds || [],
    });
  }
  
  return breeds;
};

export const fetchDogImages = async (
  breed: string,
  subBreed?: string
): Promise<IDogImages> => {
  const url = subBreed 
    ? `${DOG_API_BASE_URL}/breed/${breed}/${subBreed}/images`
    : `${DOG_API_BASE_URL}/breed/${breed}/images`;
  
  return fetchData<IDogImages>(url);
};

export const fetchBreedInfo = async (
  breedName: string
): Promise<IBreedInfo[]> => {
  try {
    return await fetchData<IBreedInfo[]>(
      `${DOG_BREEDS_API_BASE_URL}/breeds/search?q=${breedName}`
    );
  } catch {
    // Fallback with mock data if the API fails
    console.warn(`Failed to fetch breed info for ${breedName}, using fallback data`);
    return [{
      weight: { imperial: "20-40 lbs", metric: "9-18 kg" },
      height: { imperial: "12-16 inches", metric: "30-41 cm" },
      life_span: "10-14 years",
      temperament: "Friendly, Loyal, Energetic",
      origin: "Unknown",
      bred_for: "Companionship"
    }];
  }
};
