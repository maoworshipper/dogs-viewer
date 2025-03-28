import React from "react";
import { IPokemon } from "../../types/dataTypes";
import ItemTableRow from "../ItemTableRow/ItemTableRow";
import "./MainTable.css";

interface MainTableProps {
  pokemonList: IPokemon[];
  isLoading: boolean;
}

const MainTable: React.FC<MainTableProps> = ({ pokemonList, isLoading }) => {
  if (isLoading) {
    return <div className="loading-message">Cargando Pokémones...</div>;
  }

  return (
    <div className="table-container">
      <table className="pokemon-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon) => (
            <ItemTableRow key={pokemon.name} pokemonInfo={pokemon} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
