import { Link } from "react-router-dom";

function Button({
  children,
  to,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}) {
  const buttonClass = `button button--${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;