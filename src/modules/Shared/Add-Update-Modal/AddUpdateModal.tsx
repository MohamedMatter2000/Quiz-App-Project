import { Modal, ModalBody } from "flowbite-react";
import { Check, X } from "lucide-react";
export default function AddUpdateModal({
  children,
  closeModal,
  openModal,
  header,
  size = "5xl",
}: {
  children: React.ReactNode;
  closeModal: () => void;
  openModal: boolean;
  header: string;
  size?: string;
}) {
  return (
    <>
      <Modal show={openModal} size={size} popup className="backdrop-blur-sm">
        <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-800">
              {header}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                type="submit"
                form="modal-form"
                className="group  flex h-12 w-12 transform items-center justify-center rounded-lg bg-green-500 text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:bg-green-600 hover:shadow-xl"
                title="Save Changes"
              >
                <Check className="text-lg transition-transform duration-200 group-hover:scale-110" />
              </button>
              <button
                onClick={closeModal}
                className="group flex h-12 w-12 transform items-center justify-center rounded-lg bg-red-500 text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:bg-red-600 hover:shadow-xl"
                title="Close Modal"
              >
                <X className="text-lg transition-transform duration-200 group-hover:scale-110" />
              </button>
            </div>
          </div>
          <ModalBody className="bg-white p-8">
            <div className="custom-scrollbar max-h-[70vh] overflow-y-auto">
              {children}
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
}
