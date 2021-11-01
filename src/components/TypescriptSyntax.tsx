import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";

interface TypescriptSyntaxProps {
  code: string;
}

const TypescriptSyntax: React.FC<TypescriptSyntaxProps> = ({ code }) => {
  return (
    <CodeMirror
      value={code}
      options={{
        height: "100%",
        theme: "material",
        lineNumbers: true,
        readOnly: true,
        mode: "text/typescript",
      }}
    />
  );
};

export default TypescriptSyntax;
