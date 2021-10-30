import { IoAlertCircleOutline } from "react-icons/io5";
import Tooltip from "@material-ui/core/Tooltip";
import React, { SelectHTMLAttributes } from "react";
import classNames from "classnames";

const WarningIcon = React.forwardRef(function MyComponent(props: any, ref: any) {
  return (
    <div {...props} ref={ref}>
      <IoAlertCircleOutline className="text-red-500" size={20}></IoAlertCircleOutline>
    </div>
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: { label: string; value: string | number }[];
  error?: string | boolean;
  white?: boolean;
}

const Select: React.FC<SelectProps> = ({
  className = "",
  options,
  error,
  white = false,
  ...props
}) => {
  return (
    <div className={`${className} relative flex items-center`}>
      <select
        className={classNames("px-3 h-34px border-2 border-solid w-full rounded outline-none", {
          "border-red-400": error,
          "focus:border-blue-300": !error,
          "border-gray-300 bg-gray-300": !white,
          "border-white bg-white": white,
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
