function LoadingState({ message = "Loading..." }) {
  return (
    <div
      className="loading-state"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="loading-state__spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export default LoadingState;