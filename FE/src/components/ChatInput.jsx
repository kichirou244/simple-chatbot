import React, { useState, useRef } from "react";
import { SendOutlined } from "@ant-design/icons";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    autoResize();
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const handleSend = async () => {
    if (text.trim() !== "") {
      onSend(text);
      setText("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="flex w-full max-w-2xl items-center bg-zinc-800 rounded-2xl px-8 py-6 mt-8">
        <textarea
          ref={textareaRef}
          className="flex-1 bg-transparent text-white text-sm outline-none resize-none min-h-[30px] max-h-[150px] placeholder:text-zinc-400"
          placeholder="Hỏi Chatbot"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className="ml-4 text-blue-300 hover:text-white transition-colors"
          onClick={handleSend}
          title="Gửi"
          type="button"
        >
          <SendOutlined />
        </button>
      </div>
    </>
  );
};

export default ChatInput;
