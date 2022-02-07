import { useState } from "react";
import { IIngredient } from "./api/database/ingredientQueries";
import { IngredientQuery } from "./api/ingredient";
import Loading from "./components/loading/Loading";
import Navbar from "./components/navbar/Navbar";
import Search from "./components/search/Search";

interface IngredientSearchProps {
  initialData: Array<IIngredient> | string;
}

function IngredientSearch({ initialData = [] }: IngredientSearchProps) {
  const [data, setData] = useState<Array<IIngredient> | string>(initialData);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<IngredientQuery>({
    type: "",
    ingredient: "",
  });

  const fetchData = async (key?: string, value?: string) => {
    const query = key && value ? `?${key}=${value}` : "";
    const res = await fetch(`/api/ingredient${query}`);
    const body = await res.json();
    if (res.status !== 200) setData(body.error);
    else setData(body.result);
  };

  const loadData = (key?: string, value?: string) => {
    setLoading(true);
    fetchData(key, value).finally(() =>
      setTimeout(() => setLoading(false), 1500)
    );
  };

  const onClick = (event: Event, key: string, value: string) => {
    event.preventDefault();
    loadData(key, value);
    setQuery({ type: "", ingredient: "" });
  };

  return (
    <>
      <Navbar>
        <div>
          <Search
            onChange={(event) =>
              setQuery({
                type: (event.target as HTMLInputElement).value,
                ingredient: "",
              })
            }
            onClick={(event) =>
              onClick(event as unknown as Event, "type", query.type)
            }
            value={query.type}
            placeholder="Search by type name"
          />
          <Search
            onChange={(event) =>
              setQuery({
                ingredient: (event.target as HTMLInputElement).value,
                type: "",
              })
            }
            onClick={(event) =>
              onClick(event as unknown as Event, "ingredient", query.ingredient)
            }
            value={query.ingredient}
            placeholder="Search by ingredient name"
          />
        </div>
      </Navbar>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1>Ingredient search</h1>
          {typeof data === "string" ? (
            <span>{data}</span>
          ) : (
            <ul>
              {data.map((ingredient) => {
                return (
                  <li key={ingredient._id}>
                    <span>
                      <strong>{ingredient.name}</strong> --- {ingredient.type}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </>
  );
}

IngredientSearch.getInitialProps = async () => {
  const { API_HOST, API_PORT } = process.env;
  const res = await fetch(`${API_HOST}:${API_PORT}/api/ingredient`);
  const body = await res.json();
  if (res.status !== 200) return { initialData: body.error };
  else return { initialData: body.result };
};

export default IngredientSearch;
