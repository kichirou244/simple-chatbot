import React from "react";
import Question from "./Question";
import Answer from "./Answer";

export default function Message({ msg, loading, setIsCopied }) {
  return (
    <div className="my-4 flex flex-col gap-2">
      {msg.question && <Question msg={msg} loading={loading} />}

      {(loading || msg.answer) && (
        <Answer msg={msg} loading={loading} setIsCopied={setIsCopied} />
      )}
    </div>
  );
}
