import { ReactElement, useState } from "react";
import Popover, { PopoverProps } from "@mui/material/Popover";

export interface PopoverWrapperProps extends Omit<PopoverProps, "open"> {
  content: ReactElement;
  open?: boolean;
  onClose?: () => void;
  closeOnContentClick?: boolean;
}

const PopoverWrapper: React.FC<PopoverWrapperProps> = ({
  content,
  anchorOrigin,
  transformOrigin,
  open,
  onClose,
  closeOnContentClick,
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);

  return (
    <>
      <Popover
        open={open != null ? open : Boolean(anchorEl)}
        {...rest}
        anchorEl={anchorEl}
        onClose={onClose ? onClose : () => setAnchorEl(null)}
        classes={{ paper: "shadow-3-3-12-10 border rounded" }}
        anchorOrigin={
          anchorOrigin || {
            vertical: "top",
            horizontal: "center",
          }
        }
        transformOrigin={
          transformOrigin || {
            vertical: "top",
            horizontal: "center",
          }
        }
      >
        <div
          onClick={closeOnContentClick ? (onClose ? onClose : () => setAnchorEl(null)) : undefined}
        >
          {content}
        </div>
      </Popover>
      <div onClick={(e) => setAnchorEl(e.currentTarget)}>{rest.children}</div>
    </>
  );
};

export default PopoverWrapper;
