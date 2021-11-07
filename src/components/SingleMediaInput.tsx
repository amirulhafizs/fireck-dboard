import React from "react";
import DeleteRounded from "@material-ui/icons/DeleteRounded";
import ButtonBase from "@material-ui/core/ButtonBase";
import { callComponent } from "api/callComponent";
import SelectMedia, { SelectMediaProps } from "pages/Media/SelectMedia";
import { ReactComponent as MediaIcon } from "assets/media.svg";

export interface SingleMediaInputProps {
  selectedFile: string;
  setSelectedFile: Function;
}

const SingleMediaInput: React.FC<SingleMediaInputProps> = ({ selectedFile, setSelectedFile }) => {
  return (
    <div className="h-208px border-2 border-white rounded-md relative">
      {!selectedFile ? (
        <div
          className="flex w-full h-full cursor-pointer relative z-10"
          onClick={async () => {
            const res = await callComponent<SelectMediaProps, string | boolean>({
              Component: SelectMedia,
              props: { multiple: false },
            });

            if (typeof res !== "boolean") {
              setSelectedFile(res);
            }
          }}
        >
          <div className="m-auto flex items-center text-white">
            <MediaIcon className="text-39px mr-3" fontSize="inherit"></MediaIcon>
            <div>Upload a file</div>
          </div>
        </div>
      ) : null}

      <div
        className="absolute left-0 top-0 w-full h-full bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${selectedFile})` }}
      ></div>
      {selectedFile ? (
        <div className="absolute top-0 right-0 flex p-3">
          <ButtonBase
            onClick={() => setSelectedFile(null)}
            className="outline-none h-26px w-26px rounded bg-fireck-4 hover:bg-fireck-4-hover"
          >
            <DeleteRounded fontSize="small"></DeleteRounded>
          </ButtonBase>
        </div>
      ) : null}
    </div>
  );
};

export default SingleMediaInput;
