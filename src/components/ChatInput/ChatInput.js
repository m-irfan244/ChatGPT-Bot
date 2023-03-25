import React from "react";

const ChatInput = ({ value, onChange, placeholder }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-grow border-2 border-gray-300 rounded-l-md p-2 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default ChatInput;
