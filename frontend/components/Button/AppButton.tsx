import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger'; 
  size?: 'sm' | 'md' | 'lg'; 
  isLoading?: boolean; 
};

const AppButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  ...props
}) => {

  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors';

  const variantClasses = {
    primary: 'bg-black dark:bg-white text-gray-200 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-200 border border-gray-300 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3.5 py-2 text-base',
    lg: 'px-4 py-3 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default AppButton;