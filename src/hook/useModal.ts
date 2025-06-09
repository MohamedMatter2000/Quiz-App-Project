import { useState } from "react";

// Define types for modal IDs and return value
type ModalId = string | null;
type ModalActions = {
  isOpen: (modalId?: string) => boolean;
  openModal: (modalId?: string) => void;
  closeModal: () => void;
  toggleModal: (modalId?: string) => void;
  currentModal: ModalId;
};

const useModal = (initialModalId: ModalId = null): ModalActions => {
  const [openModalId, setOpenModalId] = useState<ModalId>(initialModalId);

  // For a single modal, you can use a simple boolean check
  const isOpen = (modalId: string = "default"): boolean =>
    modalId === openModalId;

  // Open a specific modal (or the default one if no ID is provided)
  const openModal = (modalId: string = "default"): void => {
    setOpenModalId(modalId);
  };

  // Close all modals
  const closeModal = (): void => {
    setOpenModalId(null);
  };

  // Toggle a specific modal
  const toggleModal = (modalId: string = "default"): void => {
    setOpenModalId((current) => (current === modalId ? null : modalId));
  };

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    currentModal: openModalId,
  };
};

export default useModal;
