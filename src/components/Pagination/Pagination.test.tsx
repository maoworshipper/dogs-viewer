import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "./Pagination";
import { AppContext, AppContextType } from "../../context/AppContext";

global.scrollTo = jest.fn();

describe("Pagination Component", () => {
  const mockContextValue: AppContextType = {
    searchTerm: "",
    currentPage: 2,
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

  test("should not render when totalPages is 1", () => {
    const { container } = renderWithContext(<Pagination totalPages={1} />);
    expect(container.firstChild).toBeNull();
  });

  test("should not render when totalPages is 0", () => {
    const { container } = renderWithContext(<Pagination totalPages={0} />);
    expect(container.firstChild).toBeNull();
  });

  test("should render pagination controls when totalPages > 1", () => {
    renderWithContext(<Pagination totalPages={5} />);

    expect(
      screen.getByRole("button", { name: /anterior/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /siguiente/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/página 2 de 5/i)).toBeInTheDocument();
  });

  test("should disable previous button when on first page", () => {
    const customContext = {
      ...mockContextValue,
      currentPage: 1,
    };

    renderWithContext(<Pagination totalPages={5} />, customContext);

    const prevButton = screen.getByRole("button", { name: /anterior/i });
    expect(prevButton).toBeDisabled();
  });

  test("should disable next button when on last page", () => {
    const customContext = {
      ...mockContextValue,
      currentPage: 5,
    };

    renderWithContext(<Pagination totalPages={5} />, customContext);

    const nextButton = screen.getByRole("button", { name: /siguiente/i });
    expect(nextButton).toBeDisabled();
  });

  test("should call setCurrentPage and scrollTo when previous button is clicked", () => {
    renderWithContext(<Pagination totalPages={5} />);

    const prevButton = screen.getByRole("button", { name: /anterior/i });
    fireEvent.click(prevButton);

    expect(mockContextValue.setCurrentPage).toHaveBeenCalled();
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test("should call setCurrentPage and scrollTo when next button is clicked", () => {
    renderWithContext(<Pagination totalPages={5} />);

    const nextButton = screen.getByRole("button", { name: /siguiente/i });
    fireEvent.click(nextButton);

    expect(mockContextValue.setCurrentPage).toHaveBeenCalled();
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test("should display correct page information", () => {
    const customContext = {
      ...mockContextValue,
      currentPage: 3,
    };

    renderWithContext(<Pagination totalPages={10} />, customContext);

    expect(screen.getByText(/página 3 de 10/i)).toBeInTheDocument();
  });

  test("should have correct accessibility attributes", () => {
    renderWithContext(<Pagination totalPages={5} />);

    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Paginación de perros"
    );
    expect(screen.getByText(/página 2 de 5/i)).toHaveAttribute(
      "aria-live",
      "polite"
    );
  });
});
