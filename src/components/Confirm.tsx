import { confirmable, createConfirmation } from "react-confirm";
import Button from "components/Button";
import { useState } from "react";
import CloseRounded from "@material-ui/icons/CloseRounded";

export interface ConfirmProps {
  proceed: ((value?: string | undefined) => void) & ((value?: boolean | undefined) => void);
  confirmation: string;
}

const Confirm: React.FC<ConfirmProps> = ({ confirmation, proceed }) => {
  const [show, setShow] = useState(true); // for some reason after cancelling, popup closes with delay.

  return show ? (
    <div
      onMouseDown={() => {
        proceed(false);
        setShow(false);
      }}
      className="flex fixed left-0 top-0 w-full h-full bg-black bg-opacity-40 overflow-auto p-7"
      style={{ zIndex: 5000 }}
    >
      <div
        style={{ maxWidth: 348 }}
        className="bg-white rounded-md p-7 m-auto relative w-full animate-littlemoveup"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <CloseRounded
          onClick={() => {
            proceed(false);
            setShow(false);
          }}
          className="absolute right-0 top-0 cursor-pointer"
        ></CloseRounded>
        <div className="mb-4 text-22px font-medium">{confirmation}</div>
        <div className="mb-12 text-sm font-medium">Action is irreversible</div>
        <div className="flex justify-between">
          <Button
            data-testid="dialog-cancel-btn"
            noMinWidth
            className="border border-black rounded mr-7 px-6 h-28px"
            onClick={() => {
              proceed(false);
              setShow(false);
            }}
          >
            Cancel
          </Button>
          <Button
            data-testid="dialog-confirm-btn"
            noMinWidth
            className="bg-fireck-4 hover:bg-fireck-4-hover px-6 h-28px"
            onClick={() => {
              proceed(true);
              setShow(false);
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export const confirm = createConfirmation(confirmable(Confirm));

export default Confirm;
