import classNames from "classnames";
import Button from "components/Button";
import useUpdateAvailable from "hooks/useUpdateAvailable";
import { useState } from "react";

export interface UpdateAppWidgetProps {}

const UpdateAppWidget: React.FC<UpdateAppWidgetProps> = () => {
  const { updateAvailable, gitName, gitRepo } = useUpdateAvailable();
  const [show, setShow] = useState(true);

  return (
    <div
      className={classNames("flex items-center px-3 h-34px bg-fireck-1 transition-all", {
        "-mt-34px": !updateAvailable || !show,
      })}
    >
      <div className="mr-3 text-white text-sm">New version available</div>
      <Button
        className="bg-fireck-4 hover:bg-fireck-4-hover h-6 rounded px-4 mr-3 text-black min-w-unset"
        onClick={() =>
          (window.location.href = `https://fireck.com/update?gitName=${gitName}&gitRepo=${gitRepo}&appUrl=${window.location.origin}`)
        }
      >
        Update
      </Button>
      <Button
        onClick={() => setShow(false)}
        className="h-6 border-white border text-s rounded px-4 mr-3 text-white min-w-unset"
      >
        Ignore
      </Button>
    </div>
  );
};

export default UpdateAppWidget;
