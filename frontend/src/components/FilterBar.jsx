import { SlidersHorizontal } from "lucide-react";

function FilterBar({
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__title">
        <SlidersHorizontal size={17} />
        <span>Filter models</span>
      </div>

      <div className="filter-bar__controls">
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="form-select"
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          <option value="chat">Chat</option>
          <option value="coding">Coding</option>
          <option value="reasoning">Reasoning</option>
          <option value="vision">Vision</option>
          <option value="audio">Audio</option>
          <option value="open-source">Open Source</option>
          <option value="general-purpose">General Purpose</option>
        </select>

        
      </div>
    </div>
  );
}

export default FilterBar;