import "./Button.css"

function Button({
  children,
  variant = "primary",
  onClick,
  type,
  disabled,
  className = "",
}) {
  return (
    <button
      className={`boton boton--${variant} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
