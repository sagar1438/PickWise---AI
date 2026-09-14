import ModelCard from "./ModelCard";

function ModelGrid({ models = [] }) {
  return (
    <div className="model-grid">
      {models.map((model) => (
        <ModelCard
          key={model.id}
          id={model.id}
          name={model.name}
          provider={model.provider}
          description={model.description}
          category={model.category}
          contextWindow={model.contextWindow}
        />
      ))}
    </div>
  );
}

export default ModelGrid;