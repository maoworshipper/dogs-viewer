import React from "react";
import { IAbilityDetails } from "../../types/dataTypes";
import "./AbilityDetail.css";

interface IAbilityDetailProps {
  details: IAbilityDetails | null;
  isLoading: boolean;
  error: string | null;
}

const AbilityDetail: React.FC<IAbilityDetailProps> = ({
  details,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <div className="ability-detail-loading">Cargando efecto...</div>;
  }

  if (error) {
    return <div className="ability-detail-error">Error cargando la información del efecto: {error}</div>;
  }

  if (!details) {
    return null;
  }

  const effectEntry =
    details.effect_entries.find((entry) => entry.language.name === "en") ||
    details.effect_entries[0];

  return (
    <div className="ability-detail-container">
      <h4>Efecto de {details.name}:</h4>
      {effectEntry ? (
        <p className="ability-effect">{effectEntry.effect}</p>
      ) : (
        <p>No se encontró descripción del efecto.</p>
      )}
    </div>
  );
};

export default AbilityDetail;
