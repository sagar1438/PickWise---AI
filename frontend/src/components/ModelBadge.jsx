function ModelBadge({ children, variant = "default" }) {
  return (
    <span className={`model-badge model-badge--${variant}`}>
      {children}
    </span>
  );
}

export default ModelBadge;