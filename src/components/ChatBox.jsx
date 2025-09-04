import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { generateResponse } from "../actions/gemini.action";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const endRef = useRef(null);

  const onSend = async (input) => {
    setLoading(true);
    setMessages((prev) => [...prev, { input, output: "" }]);
    try {
      const response = await generateResponse(input);
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 ? { ...msg, output: response } : msg
        )
      );
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, output: "Error generating response." }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-black">
      {messages.length === 0 && (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-white text-2xl">Hi</p>
        </div>
      )}

      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-2xl mx-auto w-full">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              msg={msg}
              loading={loading}
              setIsCopied={setIsCopied}
            />
          ))}
          <div ref={endRef} />
        </div>
      )}

      <div className="flex justify-center mb-6">
        <div className="w-full max-w-2xl mx-auto">
          <ChatInput onSend={onSend} />
        </div>
      </div>

      {isCopied && (
        <div className="fixed bottom-6 left-6 text-xs text-black bg-white px-3 py-1 rounded shadow">
          Đã sao chép
        </div>
      )}
    </div>
  );
}
