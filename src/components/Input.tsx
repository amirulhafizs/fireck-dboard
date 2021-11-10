import ErrorRounded from "@mui/icons-material/ErrorRounded";
import Tooltip from "@mui/material/Tooltip";
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
  groundColor?: string;
}

const Input: React.FC<InputProps> = ({ className = "", error, groundColor = "dark", ...props }) => {
  const variants: { [key: string]: { error: string; base: string } } = {
    dark: {
      base: "focus:border-fireck-4 bg-white border-white",
      error: "border-red-FF0000",
    },

    white: {
      base: "focus:border-fireck-4 bg-gray-300 border-gray-300",
      error: "border-red-FF0000",
    },
  };

  const variantObj = variants[groundColor] || variants["dark"];

  return (
    <div className={"relative flex items-center " + className}>
      <input
        className={`px-3 border-2 h-full border-solid w-full placeholder-gray-500 rounded outline-none ${
          error ? variantObj.error : variantObj.base
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
