import ModelCard from "./ModelCard";

function ModelGrid({ models = [] }) {
  const safeModels = Array.isArray(models)
    ? models.filter(Boolean)
    : [];

  return (
    <div className="model-grid">
      {safeModels.map((model, index) => (
        <ModelCard
          key={model.id ?? `${model.name ?? "model"}-${index}`}
          id={model.id}
          name={model.name ?? "Unnamed model"}
          provider={model.provider ?? "Unknown provider"}
          description={model.description ?? "No description available."}
          category={model.category}
          contextWindow={model.contextWindow}
        />
      ))}
    </div>
  );
}

export default ModelGrid;