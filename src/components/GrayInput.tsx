import ErrorRounded from "@material-ui/icons/ErrorRounded";
import Tooltip from "@material-ui/core/Tooltip";
import React, { InputHTMLAttributes } from "react";

const WarningIcon = React.forwardRef(function MyComponent(props: any, ref: any) {
  return (
    <div {...props} ref={ref}>
      <ErrorRounded className="text-red-500 text-xl" fontSize="inherit"></ErrorRounded>
    </div>
  );
});

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string | boolean;
}

const Input: React.FC<InputProps> = ({ className = "", error, ...props }) => {
  return (
    <div className={"relative flex items-center " + className}>
      <input
        className={`px-3 h-34px border-2 border-solid w-full placeholder-gray-500 rounded outline-none ${
          error ? "border-red-400" : "focus:border-fireck-4 focus:bg-gray-300 bg-white border-white"
        }`}
        {...props}
        spellCheck={false}
      ></input>
      {error ? (
        <Tooltip title={error} placement="top">
          <WarningIcon className="absolute right-2 my-auto w-auto"></WarningIcon>
        </Tooltip>
      ) : null}
    </div>
  );
};

export default Input;
