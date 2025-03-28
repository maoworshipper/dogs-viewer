import React from "react";
import { useAppContext } from "../../hooks/useAppContext";
import "./Pagination.css";

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const { currentPage, setCurrentPage } = useAppContext();

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo(0, 0);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination-container" aria-label="Paginación de Pokémon">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="pagination-button"
        aria-label="Página anterior"
      >
        {"< Anterior"}
      </button>
      <span className="pagination-info" aria-live="polite">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-button"
        aria-label="Página siguiente"
      >
        {"Siguiente >"}
      </button>
    </nav>
  );
};

export default Pagination;
