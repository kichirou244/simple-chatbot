import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import Message from "./Message/Message";
import { askAI } from "../actions/ai.action";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [model, setModel] = useState({
    model: "gemini-2.5-flash",
    aiAgent: "gemini",
  });
  const endRef = useRef(null);

  const onSend = async (question) => {
    setLoading(true);
    setMessages((prev) => [...prev, { question, answer: "" }]);
    const formData = {
      model: model.model,
      aiAgent: model.aiAgent,
      question: question,
    };

    try {
      const response = await askAI(formData);
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 ? { ...msg, answer: response.answer } : msg
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, answer: error.message || "Error generating response." }
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
      {messages && messages.length > 0 ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-2xl mx-auto w-full">
          {messages.map((msg, index) => (
            <Message
              key={index}
              msg={msg}
              loading={loading}
              setIsCopied={setIsCopied}
            />
          ))}
          <div ref={endRef} />
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-white text-2xl">Hi</p>
        </div>
      )}

      <div className="flex justify-center mb-6">
        <div className="w-full max-w-2xl mx-auto">
          <ChatInput onSend={onSend} model={model} setModel={setModel} />
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
