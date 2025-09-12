import React, { useEffect, useRef, useState } from "react";

export default function Question({ msg, loading }) {
  const [questionExpanded, setQuestionExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const questionRef = useRef(null);
  const questionContentRef = useRef(null);

  useEffect(() => {
    if (questionContentRef.current && questionRef.current) {
      if (questionContentRef.current.scrollHeight > 80)
        setShowExpandButton(true);
      else setShowExpandButton(false);
    }
    setQuestionExpanded(false);
  }, [msg.question, loading]);

  return (
    <div className="flex items-end justify-end">
      <div
        ref={questionRef}
        className="bg-zinc-600 text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-[70%] shadow-md text-sm relative whitespace-pre-wrap break-words"
      >
        <div
          ref={questionContentRef}
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            questionExpanded ? "" : "max-h-20"
          }`}
        >
          {msg.question}
        </div>

        {showExpandButton && (
          <button
            onClick={() => setQuestionExpanded(!questionExpanded)}
            className="absolute bottom-1 right-1 bg-zinc-700 hover:bg-zinc-800 text-white rounded-full p-0.5 w-6 h-6 flex items-center justify-center z-10"
            aria-label={questionExpanded ? "Thu gọn" : "Mở rộng"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ${
                questionExpanded ? "rotate-180" : ""
              } transform`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
