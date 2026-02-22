export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyle =
    "px-5 py-2.5 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary:
      "bg-[#0F4C81] text-white hover:bg-[#082F53] hover:shadow-[0_8px_20px_rgba(15,76,129,0.25)] hover:-translate-y-0.5",
    secondary:
      "bg-white text-gray-800 border border-[#E2E8F0] hover:bg-gray-50 hover:shadow-sm hover:-translate-y-0.5",
    success:
      "bg-[#E6F4EA] text-[#009B77] border border-[#009B77]/20 hover:bg-[#D1EBD8]",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
