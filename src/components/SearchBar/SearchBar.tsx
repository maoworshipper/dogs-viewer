import React, { ChangeEvent } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import "./SearchBar.css";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar raza de perro...",
}) => {
  const { searchTerm, setSearchTerm, resetToFirstPage } = useAppContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;
    setSearchTerm(newTerm);
    resetToFirstPage();
  };

  return (
    <div className="search-bar-container">
      <input
        type="search"
        className="search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        aria-label="Buscar raza de perro por nombre"
      />
    </div>
  );
};

export default SearchBar;
