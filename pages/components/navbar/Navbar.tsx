import { useState } from "react";
import style from "./Navbar.module.css";
import classNames from "classnames";

function Navbar({ children }) {
  const [expanded, setExpanded] = useState(false);

  const onClick = () => setExpanded(!expanded);

  return (
    <div className={classNames(style.Navbar, { [style.expanded]: expanded })}>
      <div className={style.ButtonContainer}>
        <span>Recipe</span>
        <button
          className={style.Button}
          onClick={() => window.location.assign("/recipe-search")}
        >
          Search
        </button>
        <button
          className={style.Button}
          onClick={() => window.location.assign("/recipe-manager")}
        >
          Manage
        </button>
      </div>
      <div className={style.ButtonContainer}>
        <span>Ingredient</span>
        <button
          className={style.Button}
          onClick={() => window.location.assign("/ingredient-search")}
        >
          Search
        </button>
        <button
          className={style.Button}
          onClick={() => window.location.assign("/ingredient-manager")}
        >
          Manage
        </button>
        <button
          className={style.Button}
          onClick={() => window.location.assign("/ingredient-synergy")}
        >
          Synergy calculator
        </button>
      </div>
      <div>{children}</div>
      <button
        className={classNames(style.NavbarButton, {
          [style.expandedButton]: expanded,
        })}
        onClick={onClick}
        aria-label="Expand Navbar"
      />
    </div>
  );
}

export default Navbar;
