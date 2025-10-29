import React from "react";
import { IDogBreed } from "../../types/dataTypes";
import ItemTableRow from "../ItemTableRow/ItemTableRow";
import "./MainTable.css";

interface MainTableProps {
  dogBreedList: IDogBreed[];
  isLoading: boolean;
}

const MainTable: React.FC<MainTableProps> = ({ dogBreedList, isLoading }) => {
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
    <div className="table-container">
      <table className="dog-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {dogBreedList.map((dogBreed) => (
            <ItemTableRow key={dogBreed.name} dogBreedInfo={dogBreed} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
