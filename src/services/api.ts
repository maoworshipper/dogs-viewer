import { IDataFetch } from "../types/dataTypes";

export const getData = async ({ page = 1, limit = 10 }: IDataFetch) => {
  const apiURL = "https://pokeapi.co/api/v2/pokemon";
  const response = await fetch(
    `${apiURL}?offset=${(page - 1) * limit}&limit=${limit}`
  );
  return response.json();
};
