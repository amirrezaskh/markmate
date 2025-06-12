import { FiLoader } from "react-icons/fi";

const variantStyles = {
  primary: {
    base: "bg-sky-600 hover:bg-sky-700",
    disabled: "bg-sky-400",
  },
  success: {
    base: "bg-green-600 hover:bg-green-700",
    disabled: "bg-green-400",
  },
  danger: {
    base: "bg-red-600 hover:bg-red-700",
    disabled: "bg-red-400",
  },
  gray: {
    base: "bg-gray-600 hover:bg-gray-700",
    disabled: "bg-gray-400",
  },
};

export default function LoadingButton({
  children,
  loading,
  disabled,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const styles = variantStyles[variant] || variantStyles.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`relative flex items-center justify-center gap-2 w-full py-2 px-4 rounded-md font-semibold transition-all duration-150 ease-in-out
        ${loading || disabled ? styles.disabled + " cursor-not-allowed" : styles.base}
        text-white ${className}`}
    >
      {loading && (
        <FiLoader className="animate-spin h-5 w-5 text-white" />
      )}
      <span>{loading ? "Please wait..." : children}</span>
    </button>
  );
}
