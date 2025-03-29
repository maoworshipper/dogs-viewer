import { useContext } from "react";
import { AppContext, AppContextType } from "../context/AppContext";

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("El contexto debe ser usado dentro de un Provider");
  }
  return context;
};
