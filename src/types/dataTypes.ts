export interface AppContextState {
  searchTerm: string;
  currentPage: number;
  selectedDogBreed: string | null;
}

export interface IDogBreed {
  name: string;
  subBreeds: string[];
}

export interface IDataResponse {
  message: Record<string, string[]>;
  status: string;
}

export interface IDogDetail {
  breed: string;
  subBreed?: string;
  images: string[];
  characteristics: {
    size: string;
    temperament: string;
    origin: string;
    lifespan: string;
  };
}

export interface IDogImages {
  message: string[];
  status: string;
}

export interface IBreedInfo {
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  life_span: string;
  temperament: string;
  origin?: string;
  bred_for?: string;
}
