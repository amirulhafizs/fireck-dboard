import { IoAlertCircleOutline } from "react-icons/io5";
import Tooltip from "@material-ui/core/Tooltip";
import React, { SelectHTMLAttributes } from "react";
import classNames from "classnames";

const WarningIcon = React.forwardRef(function MyComponent(props: any, ref: any) {
  return (
    <div {...props} ref={ref}>
      <IoAlertCircleOutline className="text-red-FF0000" size={20}></IoAlertCircleOutline>
    </div>
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: { label: string; value: string | number }[];
  error?: string | boolean;
  groundColor: "white" | "black";
}

const Select: React.FC<SelectProps> = ({
  className = "",
  options,
  error,
  groundColor,
  ...props
}) => {
  return (
    <div className={`${className} relative flex items-center`}>
      <select
        className={classNames("px-3 h-full border-2 border-solid w-full rounded outline-none", {
          "border-red-FF0000": error,
          "focus:border-fireck-4": !error,
          "border-gray-300 bg-gray-300": groundColor === "white",
          "border-white bg-white": groundColor === "black",
        })}
        {...props}
        spellCheck={false}
      >
        {options.map((x, i) => (
          <option data-testid={`select-option-${x.value}`} key={"opt-" + i} value={x.value}>
            {x.label}
          </option>
        ))}
      </select>
      {error ? (
        <Tooltip title={error} placement="top">
          <WarningIcon className="absolute right-2 my-auto w-auto"></WarningIcon>
        </Tooltip>
      ) : null}
    </div>
  );
};

export default Select;
