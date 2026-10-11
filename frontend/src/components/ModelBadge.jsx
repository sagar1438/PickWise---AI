function ModelBadge({
  children,
  variant = "default",
  className = "",
}) {
  const badgeClass = [
    "model-badge",
    `model-badge--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={badgeClass}>{children}</span>;
}

export default ModelBadge;