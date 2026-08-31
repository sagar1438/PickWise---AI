import { Search, X } from "lucide-react";

function SearchBar({
  value,
  onChange,
  placeholder = "Search AI models...",
  onClear,
}) {
  return (
    <div className="search-bar">
      <Search size={18} className="search-bar__icon" />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="search-bar__input"
      />

      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="search-bar__clear"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;