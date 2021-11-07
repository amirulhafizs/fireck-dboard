import { UnControlled as CodeMirror } from "react-codemirror2";
import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";
require("codemirror/addon/lint/json-lint");
declare const window: any;
const jsonlint = require("jsonlint-mod");
window.jsonlint = jsonlint;

export interface JsonEditorProps {
  value: string;
  onChange: (val: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange }) => {
  const [initialValue, setInitialValue] = React.useState("");
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (count < 3) {
      setCount((prev) => prev + 1);
      setInitialValue(JSON.stringify(value, undefined, 2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <>
      <style>{`.CodeMirror{
          height: 100% !important;
      }`}</style>
      <CodeMirror
        className="rounded overflow-auto h-208px"
        value={initialValue}
        options={{
          mode: "application/json",
          theme: "material",
          lineNumbers: true,
          autoCloseBrackets: true,
          lint: true,
          gutters: ["CodeMirror-lint-markers"],
        }}
        onChange={(editor, data, value) => {
          try {
            onChange(JSON.parse(value));
          } catch (er) {
            onChange(value);
          }
        }}
      />
    </>
  );
};

export default JsonEditor;
