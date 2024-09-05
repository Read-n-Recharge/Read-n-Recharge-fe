import React from "react";
import { ModalProps } from "../../type";
const Modal: React.FC<ModalProps> = ({
  title,
  content,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6">{content}</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
