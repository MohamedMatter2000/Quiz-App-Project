import { Modal, ModalBody } from "flowbite-react";
import { Check, Copy } from "lucide-react";
export default function SucessMessage({
  openModal,
  createdQuizCode,
  handleCopyCode,
  copied,
  closeModal,
}: {
  openModal: boolean;
  createdQuizCode: string;
  handleCopyCode: () => void;
  copied: boolean;
  closeModal: () => void;
}) {
  return (
    <Modal show={openModal} size="2xl" popup className="backdrop-blur-sm">
      <ModalBody className="overflow-hidden rounded-xl bg-white p-8 shadow-2xl">
        <div className="custom-scrollbar max-h-[70vh] overflow-y-auto">
          <div className="p-6">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Quiz Created Successfully!
              </h3>
              <p className="text-gray-600">
                Your quiz has been created. Share this code with participants:
              </p>
            </div>
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Quiz Code
                  </label>
                  <div className="font-mono text-2xl font-bold tracking-wider text-gray-900">
                    {createdQuizCode}
                  </div>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="ml-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
