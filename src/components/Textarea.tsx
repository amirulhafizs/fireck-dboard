import classNames from "classnames";
import { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  groundColor: "white" | "black";
}

const Textarea: React.FC<TextareaProps> = ({ className = "", groundColor, ...rest }) => {
  return (
    <textarea
      {...rest}
      className={classNames(
        "border-2 rounded px-3 py-2 w-full min-h-182px outline-none focus:border-fireck-4",
        className,
        {
          "bg-gray-300  border-gray-300": groundColor === "white",
          "bg-white border-white": groundColor === "black",
        }
      )}
    ></textarea>
  );
};

export default Textarea;
