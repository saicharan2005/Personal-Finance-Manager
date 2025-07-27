// src/components/DeleteAlert.jsx

import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className="text-sm">{content}</p>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="add-btn add-btn-fill" // Assuming these are your custom classes
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
