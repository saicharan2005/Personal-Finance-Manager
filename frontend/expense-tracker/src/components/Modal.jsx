import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black/50">
      <div className="relative w-full max-w-2xl p-4">
        <div className="bg-white  rounded-lg shadow-md ">
          {" "}
          {/* dark:bg-gray-800 */}
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 rounded-t">
            {/* dark:border-gray-600 */}
            <h3 className="text-lg font-semibold text-gray-900">
              {/* dark:text-white */}
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg w-8 h-8 flex items-center justify-center"
              //  dark:hover:bg-gray-600 dark:hover:text-white
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6-6m-6 6l6 6m-6-6l-6 6"
                />
              </svg>
            </button>
          </div>
          {/* Content */}
          <div className="px-4 py-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
