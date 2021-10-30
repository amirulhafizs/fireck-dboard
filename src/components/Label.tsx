import React from "react";
import ErrorRounded from "@material-ui/icons/ErrorRounded";
import Tooltip from "@material-ui/core/Tooltip";

export interface LabelProps {
  error?: string | undefined | null;
  className?: string;
  children: any;
}

const WarningIcon = React.forwardRef(function MyComponent(props: any, ref: any) {
  return (
    <div {...props} ref={ref}>
      <ErrorRounded className="text-red-500 text-xl" fontSize="inherit"></ErrorRounded>
    </div>
  );
});

const Label: React.FC<LabelProps> = ({ className = "", children, error }) => {
  return (
    <div className={`flex justify-between text-white relative ${className}`}>
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
