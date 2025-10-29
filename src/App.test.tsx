import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import * as hooks from "./hooks/index";
import { IDogBreed } from "./types/dataTypes";

// Mock the hooks used in App.tsx
jest.mock("./hooks/index", () => ({
  useAppContext: jest.fn(),
  useDogBreedList: jest.fn(),
  usePagination: jest.fn(),
}));

// Mock the components used in App.tsx to isolate the tests
jest.mock("./components/SearchBar/SearchBar", () => () => (
  <div data-testid="search-bar">Search Bar</div>
));
jest.mock(
  "./components/MainTable/MainTable",
  () =>
    ({
      dogBreedList,
      isLoading,
    }: {
      dogBreedList: IDogBreed[];
      isLoading: boolean;
    }) =>
      (
        <div data-testid="main-table">
          Main Table
          <div data-testid="dog-count">{dogBreedList.length}</div>
          <div data-testid="loading-state">
            {isLoading ? "Loading" : "Not Loading"}
          </div>
        </div>
      )
);
jest.mock(
  "./components/Pagination/Pagination",
  () =>
    ({ totalPages }: { totalPages: number }) =>
      (
        <div data-testid="pagination">
          Pagination Component (Pages: {totalPages})
        </div>
      )
);
jest.mock(
  "./components/ItemDetailModal/ItemDetailModal",
  () =>
    ({ dogBreed, onClose }: { dogBreed: string; onClose: () => void }) =>
      (
        <div data-testid="modal">
          Dog Modal for: {dogBreed}
          <button onClick={onClose}>Close</button>
        </div>
      )
);

describe("App Component", () => {
  const mockResetToFirstPage = jest.fn();
  const mockCloseDogModal = jest.fn();

  const mockDogBreeds: IDogBreed[] = [
    { name: "labrador", subBreeds: [] },
    { name: "bulldog", subBreeds: ["english", "french"] },
    { name: "retriever", subBreeds: ["golden"] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    (hooks.useAppContext as jest.Mock).mockReturnValue({
      searchTerm: "",
      currentPage: 1,
      selectedDogBreed: null,
      closeDogModal: mockCloseDogModal,
      resetToFirstPage: mockResetToFirstPage,
    });

    (hooks.useDogBreedList as jest.Mock).mockReturnValue({
      data: mockDogBreeds,
      isLoading: false,
      isError: false,
      error: null,
    });

    (hooks.usePagination as jest.Mock).mockReturnValue({
      paginatedData: mockDogBreeds,
      totalPages: 1,
    });
  });

  it("should render the header with app title", () => {
    render(<App />);

    const header = screen.getByRole("heading", { name: /Dog Breed Viewer/i });
    expect(header).toBeInTheDocument();
  });

  it("should render SearchBar component", () => {
    render(<App />);

    const searchBar = screen.getByTestId("search-bar");
    expect(searchBar).toBeInTheDocument();
  });

  it("should render MainTable with correct props when data is loaded", () => {
    render(<App />);

    const mainTable = screen.getByTestId("main-table");
    expect(mainTable).toBeInTheDocument();

    const dogCount = screen.getByTestId("dog-count");
    expect(dogCount).toHaveTextContent("3");

    const loadingState = screen.getByTestId("loading-state");
    expect(loadingState).toHaveTextContent("Not Loading");
  });

  it("should render MainTable in loading state when data is loading", () => {
    (hooks.useDogBreedList as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<App />);

    const loadingState = screen.getByTestId("loading-state");
    expect(loadingState).toHaveTextContent("Loading");
  });

  it("should display error message when API returns an error", () => {
    (hooks.useDogBreedList as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: new Error("Test error message"),
    });

    render(<App />);

    const errorMessage = screen.getByText(
      /Error cargando la lista: Test error message/i
    );
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("error-message");
  });

  it("should not render Pagination when there is only one page", () => {
    (hooks.usePagination as jest.Mock).mockReturnValue({
      paginatedData: mockDogBreeds,
      totalPages: 1,
    });

    render(<App />);

    const pagination = screen.queryByTestId("pagination");
    expect(pagination).not.toBeInTheDocument();
  });

  it("should render Pagination when there are multiple pages", () => {
    (hooks.usePagination as jest.Mock).mockReturnValue({
      paginatedData: mockDogBreeds.slice(0, 2),
      totalPages: 2,
    });

    render(<App />);

    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent("Pages: 2");
  });

  it("should not render Pagination when loading", () => {
    (hooks.useDogBreedList as jest.Mock).mockReturnValue({
      data: mockDogBreeds,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<App />);

    const pagination = screen.queryByTestId("pagination");
    expect(pagination).not.toBeInTheDocument();
  });

  it("should not render ItemDetailModal when no dog breed is selected", () => {
    render(<App />);

    const modal = screen.queryByTestId("modal");
    expect(modal).not.toBeInTheDocument();
  });

  it("should render ItemDetailModal when a dog breed is selected", () => {
    (hooks.useAppContext as jest.Mock).mockReturnValue({
      searchTerm: "",
      currentPage: 1,
      selectedDogBreed: "labrador",
      closeDogModal: mockCloseDogModal,
      resetToFirstPage: mockResetToFirstPage,
    });

    render(<App />);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent("labrador");
  });

  it("should filter dog breeds based on searchTerm", () => {
    (hooks.useAppContext as jest.Mock).mockReturnValue({
      searchTerm: "bull",
      currentPage: 1,
      selectedDogBreed: null,
      closeDogModal: mockCloseDogModal,
      resetToFirstPage: mockResetToFirstPage,
    });

    // Mock the filtered data result (only bulldog should match 'bull')
    (hooks.usePagination as jest.Mock).mockReturnValue({
      paginatedData: [mockDogBreeds[1]], // bulldog
      totalPages: 1,
    });

    render(<App />);

    const dogCount = screen.getByTestId("dog-count");
    expect(dogCount).toHaveTextContent("1");
  });

  it("should reset to first page when current page is greater than total pages", () => {
    (hooks.useAppContext as jest.Mock).mockReturnValue({
      searchTerm: "rare-dog",
      currentPage: 3,
      selectedDogBreed: null,
      closeDogModal: mockCloseDogModal,
      resetToFirstPage: mockResetToFirstPage,
    });

    (hooks.usePagination as jest.Mock).mockReturnValue({
      paginatedData: [],
      totalPages: 1,
    });

    render(<App />);

    expect(mockResetToFirstPage).toHaveBeenCalled();
  });
});
