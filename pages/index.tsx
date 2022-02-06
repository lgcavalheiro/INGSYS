import style from "../styles/index.module.css";

function Home() {
  return (
    <div className={style.HomeContainer}>
      <h1>Welcome to Ingsys!</h1>
      <h2>Choose an area you would like to visit first:</h2>
      <button
        className={style.Button}
        onClick={() => window.location.assign("/recipe-search")}
      >
        Recipe area
      </button>
      <button
        className={style.Button}
        onClick={() => window.location.assign("/ingredient-search")}
      >
        Ingredient area
      </button>
      <button
        className={style.Button}
        onClick={() => window.location.assign("/ingredient-synergy")}
      >
        Synergy area
      </button>
    </div>
  );
}

export default Home;
