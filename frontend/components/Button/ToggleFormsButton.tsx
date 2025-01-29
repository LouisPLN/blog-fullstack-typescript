import { useState } from "react";

interface ToggleButtonProps {
  optionLeft: string;
  optionRight: string;
  onChange?: (selected: string) => void;
}

const ToggleFormsButton: React.FC<ToggleButtonProps> = ({
  optionLeft,
  optionRight,
  onChange,
}) => {
  const [selected, setSelected] = useState(optionLeft);

  const handleToggle = () => {
    const newSelection = selected === optionLeft ? optionRight : optionLeft;
    setSelected(newSelection);
    onChange?.(newSelection);
  };

  return (
    <div
      className="ring-1 ring-gray-300 dark:ring-gray-700 flex items-center relative px-2 h-8 flex-shrink-0 cursor-pointer rounded-full w-full focus:outline-none max-w-xs"
      onClick={handleToggle}
    >
      <div
        className={`absolute h-6 pointer-events-none inline-block bg-black dark:bg-white text-gray-200 dark:text-gray-900 rounded-full transition duration-200 ease-in-out ${
          selected === optionRight
            ? "translate-x-full w-[49%] left-0"
            : "w-1/2 left-1"
        }`}
      />
      <div className="relative flex items-center justify-center z-10 w-full text-sm font-medium text-center">
        <span
          className={`w-1/2 text-center ${
            selected === optionLeft
              ? "text-gray-200 dark:text-gray-900"
              : "text-gray-900 dark:text-gray-200"
          }`}
        >
          {optionLeft}
        </span>
        <span
          className={`w-1/2 text-center ${
            selected === optionRight
              ? "text-gray-200 dark:text-gray-900"
              : "text-gray-900 dark:text-gray-200"
          }`}
        >
          {optionRight}
        </span>
      </div>
    </div>
  );
};

export default ToggleFormsButton;
