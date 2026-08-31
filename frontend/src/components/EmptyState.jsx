import { SearchX } from "lucide-react";

function EmptyState({
  title = "No models found",
  description = "Try adjusting your search or filters.",
}) {
  return (
    <div className="empty-state">
      <SearchX size={28} />

      <h3 className="empty-state__title">{title}</h3>

      <p className="empty-state__description">{description}</p>
    </div>
  );
}

export default EmptyState;