import { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ className = "", ...rest }) => {
  return (
    <textarea
      {...rest}
      className={
        "bg-gray-300 focus:border-blue-300 border-gray-300 border-2 rounded px-3 py-2 w-full min-h-182px outline-none " +
        className
      }
    ></textarea>
  );
};

export default Textarea;
