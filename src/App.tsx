import React, { useMemo, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import DogGrid from "./components/DogGrid/DogGrid";
import Pagination from "./components/Pagination/Pagination";
import ItemDetailModal from "./components/ItemDetailModal/ItemDetailModal";
import { useAppContext, useDogBreedList, usePagination } from "./hooks/index";
import { IDogBreed } from "./types/dataTypes";
import "./App.css";

const ITEMS_PER_PAGE = 12;

function App() {
  const {
    searchTerm,
    currentPage,
    selectedDogBreed,
    closeDogModal,
    resetToFirstPage,
  } = useAppContext();

  const {
    data: allDogBreeds = [],
    isLoading: isLoadingList,
    isError: isListError,
    error: listError,
  } = useDogBreedList();

  const filteredDogBreeds = useMemo(() => {
    if (!searchTerm) {
      return allDogBreeds;
    }
    return allDogBreeds.filter((dogBreed: IDogBreed) =>
      dogBreed.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allDogBreeds, searchTerm]);

  const { paginatedData: displayDogBreeds, totalPages } = usePagination({
    data: filteredDogBreeds,
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      resetToFirstPage();
    }
  }, [
    currentPage,
    totalPages,
    resetToFirstPage,
    filteredDogBreeds.length,
    allDogBreeds.length,
  ]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Dog Breed Viewer</h1>
      </header>

      <main>
        <SearchBar />

        {isListError && (
          <p className="error-message">
            Error cargando la lista: {listError?.message || "Error desconocido"}
          </p>
        )}

        <DogGrid
          dogBreedList={displayDogBreeds}
          isLoading={isLoadingList && !allDogBreeds.length}
        />

        {!isLoadingList && filteredDogBreeds.length > 0 && totalPages > 1 && (
          <Pagination totalPages={totalPages} />
        )}
      </main>

      {selectedDogBreed && (
        <ItemDetailModal
          dogBreed={selectedDogBreed}
          onClose={closeDogModal}
        />
      )}
    </div>
  );
}

export default App;
