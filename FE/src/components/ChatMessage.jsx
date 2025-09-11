import React from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyOutlined } from "@ant-design/icons";

export default function ChatMessage({ msg, loading, setIsCopied }) {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  };

  return (
    <div className="my-4 flex flex-col gap-2">
      {msg.question && (
        <div className="flex items-end justify-end">
          <div className="bg-zinc-600 text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-[70%] shadow-md text-sm break-words break-all">
            {msg.question}
          </div>
        </div>
      )}

      {(loading || msg.answer) && (
        <div className="flex items-end justify-start">
          <div className="bg-zinc-900 text-white px-4 py-2 rounded-2xl rounded-bl-sm max-w-[90%] shadow text-sm break-words">
            {loading && !msg.answer ? (
              <span className="flex space-x-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              </span>
            ) : (
              <ReactMarkdown
                children={msg.answer}
                remarkPlugins={[remarkBreaks, remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeContent = String(children).replace(/\n$/, "");

                    if (!inline && match) {
                      return (
                        <div className="relative">
                          <SyntaxHighlighter
                            style={dracula}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {codeContent}
                          </SyntaxHighlighter>
                          <button
                            onClick={() => handleCopy(codeContent)}
                            className="absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-md transition-colors hover:bg-gray-700"
                          >
                            <CopyOutlined />
                          </button>
                        </div>
                      );
                    }
                    return (
                      <code
                        className="bg-zinc-700 text-gray-200 rounded px-1 py-0.5 text-xs"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },

                  h1: ({ node, ...props }) => (
                    <h1 className="text-lg font-bold mt-2 mb-1" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-base font-bold mt-2 mb-1" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-sm font-bold mt-2 mb-1" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="ml-4 list-disc" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                }}
              >
                {msg.answer}
              </ReactMarkdown>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
