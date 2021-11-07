import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ className = "", ...rest }) => {
  return (
    <button
      {...rest}
      style={{ fontSize: 14, padding: "0 16px", minWidth: 120 }}
      className={classNames(
        "whitespace-nowrap font-medium rounded outline-none select-none focus:outline-none text-center",
        className
      )}
    ></button>
  );
};

export default Button;
