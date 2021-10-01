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
        "h-34px px-5 rounded whitespace-nowrap font-medium text-sm outline-none focus:outline-none text-center",
        { "min-w-140px": !noMinWidth },
        className
      )}
    ></button>
  );
};

export default Button;
