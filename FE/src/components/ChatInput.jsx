import React, { useState } from "react";
import { SendOutlined } from "@ant-design/icons";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (text.trim() !== "") {
      onSend(text);
      setText("");
    }
  };

  return (
    <>
      <div className="flex w-full max-w-2xl items-center bg-zinc-800 rounded-2xl px-8 py-6 mt-8">
        <textarea
          className="flex-1 bg-transparent text-white text-sm outline-none resize-none min-h-[30px] max-h-[150px] placeholder:text-zinc-400"
          placeholder="Hỏi chatbot"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
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
