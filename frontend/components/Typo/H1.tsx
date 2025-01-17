interface H1Props {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  align?: "left" | "center" | "right";
  italic?: boolean;
  bold?: boolean;
  className?: string;
}

const H1: React.FC<H1Props> = ({
  children,
  size = "xl",
  color = "text-gray-800 dark:text-white",
  align = "left",
  italic = false,
  bold = true,
  className = "",
}) => {
  const sizeClasses: Record<string, string> = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
    xl: "text-5xl",
  };

  return (
    <h1
      className={`${sizeClasses[size]} ${color} text-${align} ${
        italic ? "italic" : ""
      } ${bold ? "font-bold" : ""} ${className}`}
    >
      {children}
    </h1>
  );
};

export default H1;
