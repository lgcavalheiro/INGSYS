import { useState } from "react";
import { IRecipe } from "./api/database/recipeQueries";
import { Query } from "./api/recipe";
import Loading from "./components/loading/Loading";
import Navbar from "./components/navbar/Navbar";
import Search from "./components/search/Search";

interface RecipeSearchProps {
  initialData: Array<IRecipe> | string;
}

function RecipeSearch({ initialData }: RecipeSearchProps) {
  const [data, setData] = useState<Array<IRecipe> | string>(initialData);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<Query>({ recipe: "", ingredient: "" });

  const fetchData = async (key?: string, value?: string) => {
    const query = key && value ? `?${key}=${value}` : "";
    const res = await fetch(`/api/recipe${query}`);
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
    setQuery({ recipe: "", ingredient: "" });
  };

  return (
    <>
      <Navbar>
        <div>
          <Search
            onChange={(event) =>
              setQuery({
                recipe: (event.target as HTMLInputElement).value,
                ingredient: "",
              })
            }
            onClick={(event) =>
              onClick(event as unknown as Event, "recipe", query.recipe)
            }
            value={query.recipe}
            placeholder="Search by recipe name"
          />
          <Search
            onChange={(event) =>
              setQuery({
                ingredient: (event.target as HTMLInputElement).value,
                recipe: "",
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
          <h1>Recipe search</h1>
          {typeof data === "string" ? (
            <span>{data}</span>
          ) : (
            data.map((recipe) => {
              return (
                <>
                  <div key={recipe._id}>
                    <h2>{recipe.name}</h2>
                    <ul>
                      {recipe.ingredients.map((ingredient) => {
                        return (
                          <li key={ingredient.ingredientId}>
                            <h3>{ingredient.name}</h3>
                            <p>
                              {ingredient.type} - {ingredient.quantity} grams
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              );
            })
          )}
        </>
      )}
    </>
  );
}

RecipeSearch.getInitialProps = async () => {
  const { API_HOST, API_PORT } = process.env;
  const res = await fetch(`${API_HOST}:${API_PORT}/api/recipe`);
  const body = await res.json();
  if (res.status !== 200) return { initialData: body.error };
  else return { initialData: body.result };
};

export default RecipeSearch;
