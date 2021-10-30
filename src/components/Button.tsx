import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  noMinWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ className = "", noMinWidth = false, ...rest }) => {
  return (
    <button
      {...rest}
      className={classNames(
        "whitespace-nowrap  font-medium text-sm rounded px-4 outline-none focus:outline-none text-center",
        { "min-w-120px": !noMinWidth },
        className
      )}
    ></button>
  );
};

export default Button;
