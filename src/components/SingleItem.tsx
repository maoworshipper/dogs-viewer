import { IPokemon } from "../types/dataTypes";

const SingleItem = ({ item }: { item: IPokemon }) => (
  <tr key={item.name}>
    <td>{item.name}</td>
    <td>
      <img
        src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${item.name}.gif`}
        alt={item.name}
      />
    </td>
  </tr>
);

export default SingleItem;
