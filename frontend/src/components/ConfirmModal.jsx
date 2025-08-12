import React from "react";

export default function ConfirmModal({ isOpen, onConfirm, onCancel, title, message }) {
  if (!isOpen) return null;

  return (
    <div
    className="fixed inset-0 flex items-center justify-center z-50"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-desc"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <h2 id="modal-title" className="text-xl text-black font-semibold mb-4">{title}</h2>
        <p id="modal-desc" className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded !transition !duration-300 !ease-in-out border border-gray-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded rounded-lg shadow-md !transition !duration-300 !ease-in-out !bg-rose-600 text-white hover:!bg-red-700 hover:scale-105 hover:shadow-lg hover:!border-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
