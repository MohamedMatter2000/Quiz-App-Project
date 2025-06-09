import { X } from "lucide-react";
import { useEffect, useRef } from "react";
interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}
const ViewModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "lg",
}: ViewModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  const handleOutsideClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };
  if (!isOpen) return null;
  return (
    <>
      <div
        className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={handleOutsideClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          ref={modalRef}
          className={`${sizeClasses[size]} animate-slideIn max-h-[90vh] w-full transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 ease-out`}
        >
          <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
            <h2
              id="modal-title"
              className="text-2xl font-bold tracking-tight text-gray-800"
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="group flex h-10 w-10 transform items-center justify-center rounded-lg bg-gray-200 text-gray-600 shadow-md transition-all duration-200 ease-in-out hover:scale-105 hover:bg-red-500 hover:text-white hover:shadow-lg"
              aria-label="Close modal"
              title="Close Modal"
            >
              <X
                size={20}
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </button>
          </div>
          <div className="bg-white">
            <div className="custom-scrollbar max-h-[calc(90vh-80px)] overflow-y-auto p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewModal;
