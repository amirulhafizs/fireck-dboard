import { confirmable, createConfirmation } from "react-confirm";
import Button from "components/Button";
import { useState } from "react";

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
        className="bg-white rounded-md p-7 m-auto max-w-md"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-12">{confirmation}</div>
        <div className="flex justify-between">
          <Button
            noMinWidth
            className="text-white bg-blue-300 hover:bg-blue-400 mr-7 w-140px"
            onClick={() => {
              proceed(false);
              setShow(false);
            }}
          >
            Cancel
          </Button>
          <Button
            noMinWidth
            className="bg-orange-300 hover:bg-orange-301 w-140px"
            onClick={() => {
              proceed(true);
              setShow(false);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export const confirm = createConfirmation(confirmable(Confirm));

export default Confirm;
