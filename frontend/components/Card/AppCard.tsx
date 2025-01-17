type CardProps = {
  variant?: 'default' | 'outlined' | 'elevated';
  shadow?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  variant = 'default',
  shadow = true,
  className = '',
  children,
}) => {
  const baseClasses = 'bg-white dark:bg-gray-900 p-6 rounded-lg shadow bg-white dark:bg-background max-w-sm mx-auto w-full mt-14';
  const variantClasses = {
    default: 'border border-gray-200 dark:border-gray-800',
    outlined: 'bg-transparent border border-gray-300',
    elevated: shadow ? 'bg-white shadow-lg border border-gray-100' : 'bg-white',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return <div className={combinedClasses}>{children}</div>;
};

export default Card;