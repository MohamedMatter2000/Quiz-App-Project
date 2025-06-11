import { useEffect, useRef } from "react";
import { X, Loader2, CheckCircle, Check, AlertTriangle } from "lucide-react";
import deletconfirm from "../../../assets/DeleteConfim.jpg";
export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  status,
  size = "lg",
  HeadingMessage,
  Message,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  status: LoadingStatus;
  size?: ModalSize;
  HeadingMessage: string;
  Message: string;
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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

  useEffect(() => {
    setTimeout(() => {
      if (status === "fulfilled" || status === "rejected") {
        onClose();
      }
    }, 1500);
  }, [status, onClose]);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "5xl": "max-w-5xl",
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
          className={`${sizeClasses[size]} animate-slideIn w-full transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 ease-out`}
        >
          <div className="flex items-center justify-between border-b border-red-200 bg-gradient-to-r from-red-50 to-red-100 px-6 py-4">
            <h2
              id="modal-title"
              className="flex items-center gap-2 text-2xl font-bold tracking-tight text-red-800"
            >
              <AlertTriangle size={24} className="text-red-600" />
              {HeadingMessage}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={onConfirm}
                className="group flex h-12 w-12 transform items-center justify-center rounded-lg bg-red-500 text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:bg-red-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                disabled={status === "pending"}
                title="Confirm Delete"
              >
                <Check className="text-lg transition-transform duration-200 group-hover:scale-110" />
              </button>
              <button
                onClick={onClose}
                className="group flex h-12 w-12 transform items-center justify-center rounded-lg bg-gray-500 text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                disabled={status === "pending"}
                title="Cancel"
              >
                <X className="text-lg transition-transform duration-200 group-hover:scale-110" />
              </button>
            </div>
          </div>
          <div className="bg-white p-8">
            {status === "uninitialized" && (
              <div className="text-center">
                <h3 className="mb-6 text-2xl font-semibold text-gray-800">
                  Are you sure you want to {Message}?
                </h3>
                <div className="mx-auto mb-6 w-72 overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={deletconfirm}
                    alt="Delete confirmation"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            )}
            {status === "pending" && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-6 animate-spin">
                  <Loader2 size={80} className="text-red-500" />
                </div>
                <p className="mb-2 text-2xl font-semibold text-gray-700">
                  {HeadingMessage}...
                </p>
                <p className="text-gray-500">
                  Please wait while we process your request
                </p>
              </div>
            )}
            {status === "fulfilled" && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-6 animate-bounce">
                  <CheckCircle size={80} className="text-green-500" />
                </div>
                <p className="mb-2 text-2xl font-semibold text-green-700">
                  {HeadingMessage} Deleted Successfully!
                </p>
                <p className="text-gray-600">
                  The item has been permanently removed
                </p>
              </div>
            )}
            {status === "rejected" && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-6 animate-pulse">
                  <AlertTriangle size={80} className="text-red-500" />
                </div>
                <p className="mb-2 text-2xl font-semibold text-red-700">
                  Deletion Failed!
                </p>
                <p className="text-gray-600">
                  Something went wrong. Please try again later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
    </>
  );
}
