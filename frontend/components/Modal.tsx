import React from "react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children: React.ReactNode;
  customClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  children,
  customClass = "",
}) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white p-6 rounded-md w-1/3 relative ${customClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
        {title && (
          <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
