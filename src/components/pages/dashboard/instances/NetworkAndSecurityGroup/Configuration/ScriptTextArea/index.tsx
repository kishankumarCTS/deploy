"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const ScriptTextArea = () => {
  const [script, setScript] = useState("");
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center h-[64px] px-3 mb-3">
        <div className="headline-small font-500">Paste Script Below</div>
        <div className="text-[18px]">Data: 0.00KB of 16.00KB</div>
      </div>
      <div className="w-full">
        <Editor
          height="510px"
          width={"768px"}
          defaultLanguage="javascript" // or 'python', 'json', etc.
          defaultValue="// Start writing your script here..."
          value={script}
          onChange={() => {}}
          theme="vs-dark" // or "light"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            lineNumbers: "on",
            padding: {
              top: 24,
              bottom: 24,
            },
          }}
          onMount={(editor) => {
            editor.layout(); // Ensures sizing is correct
          }}
        />
        <div className="title-small mt-2">* This may take a few minutes.</div>
      </div>
    </div>
  );
};

export default ScriptTextArea;
