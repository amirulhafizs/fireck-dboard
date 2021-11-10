import React from "react";
import ErrorRounded from "@mui/icons-material/ErrorRounded";
import Tooltip from "@mui/material/Tooltip";
import classNames from "classnames";

export interface LabelProps {
  error?: string | undefined | null;
  className?: string;
  children: any;
  groundColor: "black" | "white";
}

const WarningIcon = React.forwardRef(function MyComponent(props: any, ref: any) {
  return (
    <div {...props} ref={ref}>
      <ErrorRounded className="text-red-500 text-xl" fontSize="inherit"></ErrorRounded>
    </div>
  );
});

const Label: React.FC<LabelProps> = ({ className = "", children, error, groundColor }) => {
  return (
    <div
      className={classNames(`flex justify-between relative ${className}`, {
        "text-white": groundColor === "black",
        "text-black": groundColor === "white",
      })}
    >
      <div>{children}</div>
      {error ? (
        <Tooltip title={error} placement="top">
          <WarningIcon className="absolute right-2 my-auto w-auto"></WarningIcon>
        </Tooltip>
      ) : null}
    </div>
  );
};

export default Label;
