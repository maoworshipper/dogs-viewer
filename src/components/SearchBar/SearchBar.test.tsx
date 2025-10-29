import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "./SearchBar";
import { AppContext, AppContextType } from "../../context/AppContext";

describe("SearchBar Component", () => {
  const mockContextValue: AppContextType = {
    searchTerm: "",
    currentPage: 1,
    selectedDogBreed: null,
    setSearchTerm: jest.fn(),
    setCurrentPage: jest.fn(),
    setSelectedDogBreed: jest.fn(),
    resetToFirstPage: jest.fn(),
    openDogModal: jest.fn(),
    closeDogModal: jest.fn(),
  };

  const renderWithContext = (
    ui: React.ReactElement,
    value = mockContextValue
  ) => {
    return render(
      <AppContext.Provider value={value}>{ui}</AppContext.Provider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the search input with default placeholder", () => {
    renderWithContext(<SearchBar />);
    
    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("placeholder", "Buscar raza de perro...");
  });

  test("should render with custom placeholder when provided", () => {
    const customPlaceholder = "Custom placeholder text";
    renderWithContext(<SearchBar placeholder={customPlaceholder} />);
    
    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toHaveAttribute("placeholder", customPlaceholder);
  });

  test("should display the current search term from context", () => {
    const customContext = {
      ...mockContextValue,
      searchTerm: "labrador",
    };
    
    renderWithContext(<SearchBar />, customContext);
    
    const searchInput = screen.getByRole("searchbox") as HTMLInputElement;
    expect(searchInput.value).toBe("labrador");
  });

  test("should call setSearchTerm and resetToFirstPage when input changes", () => {
    renderWithContext(<SearchBar />);
    
    const searchInput = screen.getByRole("searchbox");
    fireEvent.change(searchInput, { target: { value: "retriever" } });
    
    expect(mockContextValue.setSearchTerm).toHaveBeenCalledWith("retriever");
    expect(mockContextValue.resetToFirstPage).toHaveBeenCalledTimes(1);
  });

  test("should have correct accessibility attributes", () => {
    renderWithContext(<SearchBar />);
    
    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toHaveAttribute("aria-label", "Buscar raza de perro por nombre");
  });

  test("should apply correct CSS class", () => {
    renderWithContext(<SearchBar />);
    
    const containerDiv = screen.getByRole("searchbox").parentElement;
    expect(containerDiv).toHaveClass("search-bar-container");
    
    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toHaveClass("search-input");
  });
});