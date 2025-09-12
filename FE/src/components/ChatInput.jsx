import React, { useRef, useState } from "react";
import { SendOutlined } from "@ant-design/icons";

const ChatInput = ({ onSend, model, setModel }) => {
  const [text, setText] = useState("");
  const endRef = useRef(null);

  const models = [
    {
      label: "Gemini 2.5 Flash",
      model: "gemini-2.5-flash",
      aiAgent: "gemini",
    },
    {
      label: "Gemini 2.5 Pro",
      model: "gemini-2.5-pro",
      aiAgent: "gemini",
    },
    {
      label: "Gemini 2.5 Flash Lite",
      model: "gemini-2.5-flash-lite",
      aiAgent: "gemini",
    },
    {
      label: "GPT-5",
      model: "gpt-5-2025-08-07",
      aiAgent: "openai",
    },
    {
      label: "GPT-4.1",
      model: "gpt-4.1-2025-04-14",
      aiAgent: "openai",
    },
  ];

  const handleSend = async () => {
    if (text.trim() !== "") {
      onSend(text);
      setText("");
      if (endRef.current) endRef.current.style.height = "auto";
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl bg-zinc-800 rounded-2xl px-6 py-5 mt-8">
        <textarea
          ref={endRef}
          className="w-full bg-transparent text-white text-sm outline-none resize-none min-h-[40px] max-h-[150px] placeholder:text-zinc-400"
          placeholder="Hỏi chatbot"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onInput={(e) => {
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

        <div className="mt-1 flex items-center">
          <select
            className="bg-zinc-700 text-white text-xs rounded px-1 py-1 outline-none h-8 min-w-[60px]"
            value={model.model}
            onChange={(e) => {
              setModel(models.find((item) => item.model === e.target.value));
            }}
          >
            {models.map((item) => {
              return (
                <option key={item.model} value={item.model}>
                  {item.label}
                </option>
              );
            })}
          </select>

          <button
            className="ml-auto text-blue-300 hover:text-white transition-colors"
            onClick={handleSend}
            title="Gửi"
            type="button"
          >
            <SendOutlined />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
