interface ParagraphProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  italic?: boolean;
  bold?: boolean;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  size = "md",
  color = "text-gray-700 dark:text-gray-200",
  italic = false,
  bold = false,
  className = "",
}) => {
  const sizeClasses: Record<string, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <p
      className={`${sizeClasses[size]} ${color} ${italic ? "italic" : ""} ${
        bold ? "font-bold" : ""
      } ${className}`}
    >
      {children}
    </p>
  );
};

export default Paragraph;
