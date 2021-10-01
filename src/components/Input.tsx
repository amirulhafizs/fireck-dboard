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
    <div className={`${className} relative flex items-center`}>
      <input
        className={`px-3 h-34px w-full rounded outline-none ${
          error ? "border-red-500" : "focus:border-blue-300 border-white"
        }  border-2 border-solid focus:border-3`}
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
