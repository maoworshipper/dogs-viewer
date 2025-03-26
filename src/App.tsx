import { useEffect, useState } from "react";
import { getData } from "./services/api";
import SingleItem from "./components/SingleItem";
import { IPokemon } from "./types/dataTypes";
import "./App.css";

function App() {
  const [data, setData] = useState<IPokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData({ page: 1, limit: 10 });
      setData(response.results);
    };

    fetchData();
  }, []);

  return (
    <main>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: IPokemon) => (
            <SingleItem item={item} key={item.name} />
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
