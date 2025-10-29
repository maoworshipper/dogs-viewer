import React from "react";
import { IDogBreed } from "../../types/dataTypes";
import DogCard from "../DogCard/DogCard";
import "./DogGrid.css";

interface DogGridProps {
  dogBreedList: IDogBreed[];
  isLoading: boolean;
}

const DogGrid: React.FC<DogGridProps> = ({ dogBreedList, isLoading }) => {
  if (isLoading) {
    return <div className="loading-message">Cargando razas de perros...</div>;
  }

  if (!dogBreedList.length) {
    return (
      <div className="no-results-message">
        No se encontraron razas de perros con ese nombre.
      </div>
    );
  }

  return (
    <div className="dog-grid-container">
      <div className="dog-grid">
        {dogBreedList.map((dogBreed) => (
          <DogCard key={dogBreed.name} dogBreedInfo={dogBreed} />
        ))}
      </div>
    </div>
  );
};

export default DogGrid;
