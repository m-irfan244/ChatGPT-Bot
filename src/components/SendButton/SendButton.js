import React from "react";

const SendButton = ({ onClick, disabled }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${
        !disabled ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-300"
      } text-white px-6 py-2 rounded-r-md focus:outline-none`}
      disabled={disabled}
    >
      Send
    </button>
  );
};

export default SendButton;
