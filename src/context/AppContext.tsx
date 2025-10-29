import { createContext, Dispatch, SetStateAction } from "react";
import { AppContextState } from "../types/dataTypes";

export interface AppContextType extends AppContextState {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSelectedDogBreed: Dispatch<SetStateAction<string | null>>;
  resetToFirstPage: () => void;
  openDogModal: (breed: string) => void;
  closeDogModal: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
