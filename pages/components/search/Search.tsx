import { ChangeEventHandler, MouseEventHandler } from "react";

interface SearchProps {
  onChange: ChangeEventHandler;
  onClick: MouseEventHandler;
  value: string;
  placeholder: string;
}

function Search({ onChange, onClick, value, placeholder }: SearchProps) {
  return (
    <form method="GET">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      <button type="submit" onClick={onClick}>
        Search
      </button>
    </form>
  );
}

export default Search;
