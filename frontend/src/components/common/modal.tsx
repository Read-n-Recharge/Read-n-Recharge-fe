import React from "react";
import { useNavigate } from "react-router-dom";

export function Modal({ message, onClose, onNextSession, round }) {
  const navigate = useNavigate();

  const handleDone = () => {
    onClose();
    navigate("/todo-list");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[5000]">
      <div className="h-96 w-96 bg-white flex flex-col gap-5 rounded-3xl justify-center items-center p-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-24 h-24 text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
          />
        </svg>
        <p className="text-lg text-gray-800">{message}</p>
        <div className="flex gap-4">
          <button
            onClick={handleDone}
            className="bg-blue-500 text-white rounded-lg px-6 py-2 font-bold hover:bg-blue-600"
          >
            Done
          </button>
          {onNextSession && round < 4 && (
            <button
              onClick={onNextSession}
              className="bg-green-500 text-white rounded-lg px-6 py-2 font-bold hover:bg-green-600"
            >
              Next Session
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
