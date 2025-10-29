import React, { useState, ReactNode, useCallback } from "react";
import { AppContext } from "./AppContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDogBreed, setSelectedDogBreed] = useState<string | null>(
    null
  );

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const openDogModal = useCallback((breed: string) => {
    setSelectedDogBreed(breed);
  }, []);

  const closeDogModal = useCallback(() => {
    setSelectedDogBreed(null);
  }, []);

  const value = {
    searchTerm,
    currentPage,
    selectedDogBreed,
    setSearchTerm,
    setCurrentPage,
    setSelectedDogBreed,
    resetToFirstPage,
    openDogModal,
    closeDogModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
